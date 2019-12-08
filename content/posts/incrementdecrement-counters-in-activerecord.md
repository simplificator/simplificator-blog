---
title: increment/decrement counters in ActiveRecord
date: 2015-01-23
---

In lots of web apps you need to count something. Availability of products, number of login attempts, visitors on a page and so on.

I'll show multiple ways to implement this, all of them are based on the following (somewhat fictional) requirements.

You have to implement a web-shop which lists products. Every product has an availability which must not go below 0 (we only sell goods if we have them on stock). There must be a method `#take` which handles the decrement and returns itself. If anything goes wrong (i.e. out of stock) then an exception must be raised.

The samples only deal with decrementing a counter. But of course incrementing is the same as decrementing with a negative amount. All the code is available in a [git repository](https://github.com/pascalbetz/counter) and each way is implemented in its own XYZProduct class. I ran the samples on Postgres and one implementation is Postgres specific but should be easy to adapt for other RDBMS.

### Change value of attribute and save

The first thing that might come to your mind could look like this:

```ruby
class SimpleProduct > ActiveRecord::Base
 validates :available, numericality: {greater_than_or_equal_to: 0}
 def take!
   self.available -= 1
   save!
   self
 end
end
```

The `#take!` method just decrements the counter and calls `save!`. This might throw an `ActiveRecord::RecordInvalid` exception if the validation is violated (negative availability). Simple enough and it works as expected. But only as long as there are not multiple clients ordering the same product at the same time!

Consider the following example which explains what can go wrong:

```ruby
p = SimpleProduct.create!(available: 1)

p1 = SimpleProduct.find(p.id)
p2 = SimpleProduct.find(p.id)

p1.take!
p2.take!

puts p.reload.available
# => 0
```

`p1` and `p2available` does not go below 0 is executed against the current state of the instance and therefore `p2` uses stale data for the validation.

The same holds true for [`increment!`](http://apidock.com/rails/v4.1.8/ActiveRecord/Persistence/increment%21) and [`decrement!`](http://apidock.com/rails/v4.1.8/ActiveRecord/Persistence/decrement%21)

So how do deal with this problem? We somehow need to lock the record in order to prevent concurrent updates. One simple way to to achieve this is by using [optimistic locking](http://api.rubyonrails.org/classes/ActiveRecord/Locking/Optimistic.html).

### Optimistic Locking

By adding a `lock_version` column, which gets incremented whenever the record is saved, we know if somebody else has changed the counter. In such cases `ActiveRecord::StaleObjectError` is thrown. Then we need to reload the record and try again. Rails allows to specify the lock column name. See [`Locking::Optimistic`](http://api.rubyonrails.org/classes/ActiveRecord/Locking/Optimistic.html) for details.

The following snippet should explain how optimistic locking works:

```ruby
p = OptimisticProduct.create(available: 10)
 
p1 = OptimisticProduct.find(p.id)
p2 = OptimisticProduct.find(p.id)
 
p1.take!
p2.take!
# => ActiveRecord::StaleObjectError: Attempted to update a stale object: OptimisticProduct
```

by reloading `p2` before we call `#take!` the code will work as expected.

```ruby
p2.reload.take!
```

Of course we can not sprinkle reload calls throughout our code and hope that the instance is not stale anymore. One way to solve this is to use a `begin/rescue` block with `retry`.

```ruby
begin
  product.take!
rescue ActiveRecord::StaleObjectError
  product.reload
  retry
end
```

When `StaleObjectError` is rescued then the whole block is retried. This only makes sense if the product is reloaded from the DB so we get the latest `lock_version`. I do not really like this way of retrying because it boils down to a loop without a defined exit condition. Also this might lead to many retries when a lot of people are buying the same product.

### Pessimistic Locking

ActiveRecord also supports [pessimistic locking](http://api.rubyonrails.org/classes/ActiveRecord/Locking/Pessimistic.html), which is implemented as row-level locking using a `SELECT FOR UPDATE` clause. Other, DB specific, lock clauses can be specified if required. Implementation could look as follows:

```ruby
class PessimisticProduct > ActiveRecord::Base
  validates :available, numericality: {greater_than_or_equal_to: 0}
  def take!
    with_lock do
      self.available -= 1
      save!
    end
    self
  end
end
```

The `#with_lock` method accepts a block which is executed within a transaction and the instance is reloaded with `lock: true`. Since the instance is reloaded the validation also works as expected. Nice and clean.

You can check the behaviour of `#with_lock` by running following code in two different Rails consoles (replace `Thing` with one of your AR classes):

```ruby
thing = Thing.find(1)
thing.with_lock do
  puts "inside lock"
  sleep 10
end
```

You will notice that in the first console the "inside lock" output will appear right away whereas in the second console it only appears after the first call wakes up from sleep and exits the `with_lock` block.

### DB specific, custom SQL

If you are ready to explore some more advanced features of your RDBMS you could write it with a check constraint for the validation and make sure that the decrement is executed on the DB itself. The constraint can be added in a migration like this:

```ruby
class AddCheckToDbCheckProducts > ActiveRecord::Migration
  def up
    execute "alter table db_check_products add constraint check_available \
    check (available IS NULL OR available >= 0)"
  end
 
  def down
    execute 'alter table db_check_products drop constraint check_available'
  end
end
```

This makes sure that the counter can not go below zero. Nice. But we also need to decrement the counter on the DB:

```ruby
class DbCheckProduct > ActiveRecord::Base
  def take!
    sql = "UPDATE #{self.class.table_name} SET available = available - 1 WHERE id = #{self.id} AND available IS NOT NULL RETURNING available"
    result_set = self.class.connection.execute(sql)
    if result_set.ntuples == 1
      self.available = result_set.getvalue(0, 0).to_i
    end
    self
  end
end
```

Should the check constraint be violated, then `ActiveRecord::StatementInvalid` is raised. I would have expected a somewhat more descriptive exception but it does the trick.

This again works as expected but compared to the `with_lock` version includes more code, DB specific SQL statements and could be vulnerable to SQL injection (through a modified value of `id`). It also bypasses validations, callbacks and does not modify the `updated_at` timestamp.

### Performance

Yes I know. Microbenchmark. Still I measured the time for each implementation in various configurations.

_1 thread, 1'000 products available, take 1'000 products_

Implementation | Duration \[s\] | Correct?
--- | --- | ---
`SimpleProduct` | 1.71 | YES
`OptimisticProduct` | 1.87 | YES
`PessimisticProduct` | 2.16 | YES
`DbCheckProduct` | 0.91 | YES

_1 thread, 1'000 products available, take 1'500 products_

Implementation | Duration \[s\] | Correct?
--- | --- | ---
`SimpleProduct` | 2.52 | YES
`OptimisticProduct` | 2.81 | YES
`PessimisticProduct` | 3.25 | YES
`DbCheckProduct` | 1.42 | YES

_10 threads, 1'000 products available, take 1'000 products_

Implementation | Duration \[s\] | Correct?
--- | --- | ---
`SimpleProduct` | 1.51 | NO
`OptimisticProduct` | 15.86 | YES
`PessimisticProduct` | 1.87 | YES
`DbCheckProduct` | 0.61 | YES

_10 threads, 1'000 products available, take 1'500 products_

Implementation | Duration \[s\] | Correct?
--- | --- | ---
`SimpleProduct` | 2.19 | NO
`OptimisticProduct` | 18.94 | YES
`PessimisticProduct` | 2.74 | YES
`DbCheckProduct` | 1.23 | YES

Some interesting things to learn from these results:

- `SimpleProduct` gives wrong results for concurrent situations, as explained above.
- `OptimisticProduct` has some problems to scale with multiple threads. This makes sense as there is retry involved when concurrent updates occur.
- `DbCheckProduct` is the fastest implementation which seems reasonable as there is no locking involved
- `DbCheckProduct` and `PessimisticProduct` can both profit in a concurrent setup

### Summary

Depending on your requirements the simplest way could already work and be good enough. If you have more specific requirements (i.e. validations, concurrency) then I'd suggest to go with the pessimistic locking as it is quite easy to implement and well tested (compared to my check constraint implementation of `#take!`). It is important to release a pessimistic lock ASAP as it blocks other clients from accessing the data.
