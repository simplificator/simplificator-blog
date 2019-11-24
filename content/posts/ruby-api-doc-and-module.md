---
title: "Ruby API doc and Module"
date: 2015-04-24
---

The Ruby [API doc](http://ruby-doc.org/core-2.2.2) is a great source for information about my programming language of choice. Even after years of writing ruby code i learn new tricks and features. Lately i've been looking into the [Module](http://ruby-doc.org/core-2.2.2/Module.html) class in more detail.

I did not know that there is a callback for [methods being added](http://ruby-doc.org/core-2.2.2/Module.html#method-i-method_added) to a class. Not that i missed them much or that i even know what i could use them for. Similar exists for [removal of methods](http://ruby-doc.org/core-2.2.2/Module.html#method-i-undef_method).

\[code language="ruby"\] class Foo def self.method\_added(method) puts method end

def hello\_world end end

\# => "hello\_world" \[/code\]

Because there is also a callback for methods that are [undef'd](http://ruby-doc.org/core-2.2.2/Module.html#method-i-undef_method) (no documentation for this method though) i started to wonder what the difference between _removing_ and _undefining_ a method is. Consider the following classes:

\[code language="ruby"\] class Base def hello\_world puts "Hello World from #{self.class.name}" end

def self.method\_removed(name) puts "removed #{name} from #{self.class.name}" end

def self.method\_undefined(name) puts "undefined #{name} from #{self.class.name}" end end

class Undefined < Base def hello\_world puts "Hello World from #{self.class.name}" end

undef\_method(:hello\_world) end

class Removed < Base def hello\_world puts "Hello World from #{self.class.name}" end

remove\_method(:hello\_world) end \[/code\]

If you run the code there will be some output from the callbacks:

\[code language="ruby"\] undefined hello\_world from Class removed hello\_world from Class \[/code\]

But the interesting part starts when you call those methods:

\[code language="ruby"\] Removed.new.hello\_world # => Hello World from Removed

Undefined.new.hello\_world # => undefined method \`hello\_world' for #<Undefined:0x007f8dd488a8d8> (NoMethodError) \[/code\]

_undef\_method_ prevents the class from responding to a method, even if it is present in a superclass or mixed in module. _remove\_method_ only removes it from the **current** class hence it will still respond to the call if the method is defined in superclass or mixed in.

Something that i've seen in other people's source code already but don't use myself: the ability to pass a list of Strings/Symbols to the visibility modifiers such as [private](http://ruby-doc.org/core-2.2.2/Module.html#method-i-private), [public](http://ruby-doc.org/core-2.2.2/Module.html#method-i-public) and [protected](http://ruby-doc.org/core-2.2.2/Module.html#method-i-protected):

\[code language="ruby"\] class Foo def a\_method end private(:a\_method) end

Foo.new.a\_method

\# => private method \`a\_method' called for #<Foo:0x007fb169861c90> (NoMethodError) \[/code\]

Note that those visibility modifiers are methods and not part of the language syntax. This is different from other languages like Java where public/private/protected are language keywords (and no modifier is also supported and leads to default visibility).

Actually i prefer the Java syntax over the ruby one: having the visibility part of the method signature makes it easy to spot what visibility a method has. Especially for long classes this might be difficult in Ruby. It is actually possible to have a similar style in ruby. Ruby allows to write multiple statements on one line as long as they are separated by a semicolon:

\[code language="ruby"\] class Foo private; def hello\_world puts "hello world" end end \[/code\]

Looks awkward and modifies the visibility for **all** **following** methods as well.

For newer Rubies (2.1+) you can omit the semicolon as _def_ is not void anymore but [returns a Symbol](https://bugs.ruby-lang.org/issues/7998) (the method name): \[code language="ruby"\] class Foo private def hello\_world puts "hello world" end end \[/code\] (Thanks to Thomas Ritter for the hint).

Now lets look at how you would make a private class method:

\[code language="ruby"\] class Foo private def self.hello\_world puts "hello World" end end \[/code\] You would expect hello\_world to be private, right? Not exactly: you can still call it: \[code language="ruby"\] Foo.hello\_world # => hello\_world \[/code\] So why is that? Because to [change the visibility of class methods](http://stackoverflow.com/questions/4952980/creating-private-class-method) you need to use _private\_class\_method_ like so: \[code language="ruby"\] class Foo def self.hello\_world puts "hello World" end private\_class\_method :hello\_world end \[/code\] Note that confusingly _private\_class\_method_ does not set the visibility for class methods following that call like private does. You need to pass the method name as an argument!

So i stick to grouping methods by visibility and write small classes to make sure i don't lose track of what visibility the methods are in.

Learned something new today? Then go pick a class of ruby core and read up on it on the API doc. Chances are you are learning something new.
