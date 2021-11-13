---
title: Returning Enumerator unless block_given?
date: 2015-03-27
language: en
author: Pascal Betz
tags:
  - ruby
---

The [Enumerable](http://ruby-doc.org/core-2.2.1/Enumerable.html) module gives you methods to search, iterate, traverse and sort elements of a collection. All you need to to is to implement `each` and include the mixin.


```ruby
class NameList
  include Enumerable

  def initialize(*names)
    @names = names 
  end

  def each
    @names.each { |name| yield(name) }
  end 
end

list = NameList.new('Kaiser Chiefs', 'Muse', 'Beck')

list.each_with_index do |name, index|
  puts "#{index + 1}: #{name}"
end

# => 1: Kaiser Chiefs
# => 2: Muse
# => 3: Beck
```

So by defining _each_ and including [Enumerable](http://ruby-doc.org/core-2.2.1/Enumerable.html) we got an impressive list of methods that we can call on our NameList instance. But having all those methods added does not feel right. Usually you will use one or two of them. Why clutter the interface by adding 50+ methods that you'll never use? There is an easy solution for this:

```ruby
class NameList
  def initialize(*names)
    @names = names
  end

  def each
    return @names.to_enum(:each) unless block_given?
    @names.each { |name| yield(name) }
  end
end

list = NameList.new('Kaiser Chiefs', 'Muse', 'Beck')

list.each do |name|
  puts name
end
# => Kaiser Chiefs
# => Muse
# => Beck

list.each.each_with_index do |name, index|
  puts "#{index + 1}: #{name}"
end
# => 1: Kaiser Chiefs
# => 2: Muse
# => 3: Beck
```

Note that `each` now returns the [Enumerator](http://docs.ruby-lang.org/en/2.2.0/Enumerator.html) on which you can call `each_with_index` (or any of the other methods) unless a block is given. So you can even call it like this:

```ruby
puts list.each.to_a.size # => 3
```

By returning an [Enumerator](http://docs.ruby-lang.org/en/2.2.0/Enumerator.html) when no block is given one can chain enumerator methods. Ever wanted to do a `each_with_index` on a hash? There you go:

```ruby
points = {mushroom: 10, coin: 12, flower: 4}

points.each.each_with_index do |key_value_pair, index|
  puts "#{index + 1}: #{key_value_pair}"
end

# => 1: [:mushroom, 10]
# => 2: [:coin, 12]
# => 3: [:flower, 4]
```
