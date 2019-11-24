---
title: "éncöding hèll (part 3)"
date: "2015-01-12"
---

The (currently) last part of my encoding hell series. To finish up I'll show some samples.

_**force\_encoding and encode**_

Ruby is smart enough to not encode a string if it is already in the target encoding. This might not be what you want if you have data which has been encoded wrongly in the first place. You can use `force_encoding` in such cases:

\[code language="ruby"\] data = "\\xF6\\xE4\\xFC" p data.encoding # => "UTF-8"

p data.encode('utf-8') # => "\\xF6\\xE4\\xFC"

p data.force\_encoding('iso-8859-1').encode('utf-8') # => "öüä"

\[/code\]

_**transcoding**_

Data read from a file is expected to be in UTF-8 by default. You can change that using the encoding option. This will lead to Strings that are encoded in something non-UTF-8 though. Ruby offers an easy way to transcode, so you only will have to deal with UTF-8 Strings

\[code language="ruby"\]

data = File.read('file.txt') puts data.encoding # => "UTF-8"

data = File.read('file.txt', encoding: 'iso-8859-1') puts data.encoding # => "ISO-8859-1"

data = File.read('file.txt', encoding: 'iso-8859-1:utf-8') puts data.encoding # => "UTF-8"

\[/code\]

_**String concatenation**_

This works as long as both Strings are in the _same_ or in a _compatible_ encoding. This can happen in places where you don't expect it. For example when writing a CSV file or just print out some log information.

\[code language="ruby"\]

utf = "öäü" iso\_1 = utf.encode('iso-8859-1') iso\_2 = "oau".encode('iso-8859-1') ascii = "oau".encode('ascii')

puts utf + utf # => öäüöäü

puts utf + iso\_1 # => CompatibilityError: incompatible character encodings: UTF-8 and ISO-8859-1

puts utf + iso\_2 # => öäüoau

puts utf + ascii # => öäüoau

\[/code\]

_**puts and p**_

Ruby calls `#inspect` when passing an object to `p`. This leads to some interesting behaviour when printing out Strings of different encodings.

\[code language="ruby"\] p "öäü".encode('iso-8859-1') # => "\\xF6\\xE4\\xFC"

puts "öäü".encode('iso-8859-1') # => ��� # Note: if you run this from Sublime, then you might see the following message: # \[Decode error - output not utf-8\]

puts "öäü".encode('iso-8859-1').inspect # => "\\xF6\\xE4\\xFC" \[/code\]
