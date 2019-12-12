---
title: "Ruby API doc and Module"
date: 2015-04-24
language: en
author: Pascal Betz
---

The Ruby [API doc](http://ruby-doc.org/core-2.2.2) is a great source for information about my programming language of choice. Even after years of writing Ruby code i learn new tricks and features. Lately I've been looking into the [Module](http://ruby-doc.org/core-2.2.2/Module.html) class in more detail.

I did not know that there is a callback for [methods being added](http://ruby-doc.org/core-2.2.2/Module.html#method-i-method_added) to a class. Not that i missed them much or that I even know what I could use them for. Similar exists for [removal of methods](http://ruby-doc.org/core-2.2.2/Module.html#method-i-undef_method).

```ruby
class Foo
  def self.method_added(method)
    puts method
  end

  def hello_world
  end
end

# => "hello_world"
```

Because there is also a callback for methods that are [`undef`'d](http://ruby-doc.org/core-2.2.2/Module.html#method-i-undef_method) (no documentation for this method though) I started to wonder what the difference between _removing_ and _undefining_ a method is. Consider the following classes:

```ruby
class Base
  def hello_world
    puts "Hello World from #{self.class.name}"
  end

  def self.method_removed(name)
    puts "removed #{name} from #{self.class.name}"
  end

  def self.method_undefined(name)
    puts "undefined #{name} from #{self.class.name}"
  end
end

class Undefined < Base
  def hello_world
    puts "Hello World from #{self.class.name}"
  end

  undef_method(:hello_world)
end

class Removed < Base
  def hello_world
    puts "Hello World from #{self.class.name}" 
  end

  remove_method(:hello_world)
end
```

If you run the code there will be some output from the callbacks:

```bash
undefined hello_world from Class
removed hello_world from Class
```

But the interesting part starts when you call those methods:

```ruby
Removed.new.hello_world
# => Hello World from Removed

Undefined.new.hello_world
# => undefined method 'hello_world' for #<Undefined:0x007f8dd488a8d8> (NoMethodError)
```

`undef_method` prevents the class from responding to a method, even if it is present in a superclass or mixed in module. `remove_method` only removes it from the **current** class hence it will still respond to the call if the method is defined in superclass or mixed in.

Something that I've seen in other people's source code already but don't use myself: the ability to pass a list of Strings/Symbols to the visibility modifiers such as [private](http://ruby-doc.org/core-2.2.2/Module.html#method-i-private), [public](http://ruby-doc.org/core-2.2.2/Module.html#method-i-public) and [protected](http://ruby-doc.org/core-2.2.2/Module.html#method-i-protected):

```ruby
class Foo
  def a_method
  end
  private(:a_method)
end

Foo.new.a_method

# => private method 'a_method' called for #<Foo:0x007fb169861c90> (NoMethodError)
```

Note that those visibility modifiers are methods and not part of the language syntax. This is different from other languages like Java where public/private/protected are language keywords (and no modifier is also supported and leads to default visibility).

Actually i prefer the Java syntax over the ruby one: having the visibility part of the method signature makes it easy to spot what visibility a method has. Especially for long classes this might be difficult in Ruby. It is actually possible to have a similar style in ruby. Ruby allows to write multiple statements on one line as long as they are separated by a semicolon:

```ruby
class Foo
  private; def hello_world
    puts "hello world"
  end
end
```

Looks awkward and modifies the visibility for **all** **following** methods as well.

For newer Rubies (2.1+) you can omit the semicolon as `def` is not void anymore but [returns a Symbol](https://bugs.ruby-lang.org/issues/7998) (the method name):

```ruby
class Foo
  private def hello_world
    puts "hello world"
  end
end
```
(Thanks to Thomas Ritter for the hint.)

Now lets look at how you would make a private class method:

```ruby
class Foo
  private def self.hello_world
    puts "hello World"
  end
end
```

You would expect `hello_world` to be private, right? Not exactly: you can still call it:

```ruby
Foo.hello_world
# => hello_world
```

So why is that? Because to [change the visibility of class methods](http://stackoverflow.com/questions/4952980/creating-private-class-method) you need to use `private_class_method` like so:

```ruby
class Foo
  def self.hello_world
    puts "hello World"
  end
  private_class_method :hello_world
end
```

Note that confusingly `private_class_method` does not set the visibility for class methods following that call like private does. You need to pass the method name as an argument!

So I stick to grouping methods by visibility and write small classes to make sure I don't lose track of what visibility the methods are in.

Learned something new today? Then go pick a class of ruby core and read up on it on the API doc. Chances are you are learning something new.
