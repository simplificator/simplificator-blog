---
title: "Returning Enumerator unless block_given?"
date: "2015-03-27"
---

The [Enumerable](http://ruby-doc.org/core-2.2.1/Enumerable.html) module gives you methods to search, iterate, traverse and sort elements of a collection. All you need to to is to implement _each_ and include the mixin.

\[code language="ruby"\] class NameList include Enumerable

def initialize(\*names) @names = names end

def each @names.each { |name| yield(name) } end end

list = NameList.new('Kaiser Chiefs', 'Muse', 'Beck')

list.each\_with\_index do |name, index| puts "#{index + 1}: #{name}" end

\# => 1: Kaiser Chiefs # => 2: Muse # => 3: Beck \[/code\]

So by defining _each_ and including [Enumerable](http://ruby-doc.org/core-2.2.1/Enumerable.html) we got an impressive list of methods that we can call on our NameList instance. But having all those methods added does not feel right. Usually you will use one or two of them. Why clutter the interface by adding 50+ methods that you'll never use? There is an easy solution for this:

\[code language="ruby"\] class NameList def initialize(\*names) @names = names end

def each return @names.to\_enum(:each) unless block\_given? @names.each { |name| yield(name) } end end

list = NameList.new('Kaiser Chiefs', 'Muse', 'Beck')

list.each do |name| puts name end # => Kaiser Chiefs # => Muse # => Beck

list.each.each\_with\_index do |name, index| puts "#{index + 1}: #{name}" end # => 1: Kaiser Chiefs # => 2: Muse # => 3: Beck

\[/code\]

Note that _each_ now returns the [Enumerator](http://docs.ruby-lang.org/en/2.2.0/Enumerator.html) on which you can call _each\_with\_index_ (or any of the other methods) unless a block is given. So you can even call it like this:

\[code language="ruby"\] puts list.each.to\_a.size # => 3 \[/code\]

By returning an [Enumerator](http://docs.ruby-lang.org/en/2.2.0/Enumerator.html) when no block is given one can chain enumerator methods. Ever wanted to do a _each\_with\_index_ on a hash? There you go:

\[code language="ruby"\] points = {mushroom: 10, coin: 12, flower: 4} points.each.each\_with\_index do |key\_value\_pair, index| puts "#{index + 1}: #{key\_value\_pair}" end

\# => 1: \[:mushroom, 10\] # => 2: \[:coin, 12\] # => 3: \[:flower, 4\] \[/code\]
