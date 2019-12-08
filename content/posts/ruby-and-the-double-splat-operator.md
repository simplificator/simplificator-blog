---
title: "Ruby and the double splat operator"
date: 2015-03-20
---

If you have been programming ruby for a while then you have seen the splat operator. It can be used to define methods that accept a variable length argument list like so:

```ruby
def single_splat(an_argument, *rest)
  puts "#{rest.size} additional argument(s)" 
end

single_splat('howdy')
#=> 0 additional argument(s)

single_splat('howdy', :foo)
#=> 1 additional argument(s)

single_splat('howdy', :foo, :bar, :baz)
#=> 3 additional argument(s)
```

But also to "unwrap" values from an array and pass them as single arguments:

```ruby
def unwrapped(a, b, c)
  puts "#{a} / #{b} / #{c}"
end

data = [1, 2, 3]

unwrapped(*data)
# => 1 / 2 / 3

unwrapped(data)
#=> wrong number of arguments (1 for 3) (ArgumentError)
```

But behold can use the splat operator also to coerce values into arrays:

```ruby
coerced = *"Hello World"
p coerced
# => ["Hello World"]

coerced = *nil
p coerced
# => []

coerced = *[1, 2, 3]
p coerced
# => [1, 2, 3]
```

And of course to deconstruct arrays:

```ruby
data = [1, 2, 3, 4]

first, *rest = data
puts "#{first}, #{rest}"
# => 1, [2, 3, 4]

*list, last = data
puts "#{list}, #{last}"
# => [1, 2, 3], 4

first, *center, last = data
puts "#{first}, #{center}, #{last}"
# => 1, [2, 3], 4

first, second, *center, third, fourth = data
puts "#{first}, #{second}, #{center}, #{third}, #{fourth}"
# => 1, 2, [], 3, 4
```

But now back to the double splat operator. It has been added to Ruby in version 2.0 and behaves similarly to the single splat operator but for hashes in argument lists:

```ruby
def double_splat(**hash)
  p hash
end

double_splat()
# => {}

double_splat(a: 1)
# => {:a => 1}

double_splat(a: 1, b: 2)
# => {:a => 1, :b => 2}

double_splat('a non hash argument')
# => `double_splat': wrong number of arguments (1 for 0) (ArgumentError)
# (The message for the case where I pass in a non-hash argument is not very helpful I'd say)
```

"What!" I can hear you shout. Where is the difference to a standard argument. In the use case as shown above it is pretty much the same. But you would be able to pass in nil values or non hash values, so more checks would be required:

```ruby
def standard_argument(hash = {})
  puts hash
end

standard_argument()
# => {}

standard_argument(nil)
# =>
```

Now if we move this to a more realistic use case, consider a method taking a variable list of arguments AND some options:

```ruby
def extracted_options(*names, **options)
   puts "#{names} / #{options}"
end

extracted_options()
# => [] / {}

extracted_options('pascal', 'lukas', color: '#123456', offset: 3, other_option: :foo)
# => ["pascal", "lukas"] / {:color=>"#123456", :offset=>3, :other_option=>:foo}
```

Ruby on Rails developers might know this pattern already. It is used in various parts of the framework. It is so common that the functionality has been defined in [`extract_options!`](http://apidock.com/rails/Array/extract_options%21)
