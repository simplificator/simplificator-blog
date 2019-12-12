---
title: "éncoding hèll (part 2)"
date: 2015-01-10
language: en
---

How does Ruby deal with encoding? Here are some important parts.

There are multiple encoding settings and multiple ways they are initialized. And of course this differs depending on the Ruby version used. Most of this has been found out by trial and error as I could not find a concise documentation of all those values. Corrections are welcome.

[**\_\_ENCODING\_\_**](http://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-__ENCODING__)

This is the encoding used for created strings. The locale is determined by the encoding of the source file (defaulted to US-ASCII in 1.9, now defaults to UTF-8) which can be changed with an encoding comment on the first line (e.g. `#encoding: CP1252`)

[**Encoding.default\_internal**](http://ruby-doc.org/core-2.2.0/Encoding.html#method-c-default_internal)

The default internal encoding. Strings read from files, CSV, ARGV and some more are transcoded to this encoding if it is not nil. According to the docs the value can be changed using the `-E` option. This did not work for me though, neither with 1.9.3 nor with 2.2.0.

[**Encoding.default\_external**](http://ruby-doc.org/core-2.2.0/Encoding.html#method-c-default_external)

Data written to disk will be transcoded to this encoding by default. It is initialized by

1. `-E` Option
2. `LANG` environment setting

And it seems to default to ASCII-8BIT

[**String#encoding**](http://www.ruby-doc.org/core-2.2.0/String.html#method-i-encoding)

Returns the current encoding of the String. This is usually the `__ENCODING__` for created strings.

[**String#force\_encoding**](http://ruby-doc.org/core-2.2.0/String.html#method-i-force_encoding)

Changes the encoding. Does not re-encode the string but changes what `#encoding` will return.

[**String#encode**](http://ruby-doc.org/core-2.2.0/String.html#method-i-encode)

Re-encode the string in the new encoding. Does not change the string if it is already in the target encoding. You can pass transcode options.

[**I18n.transliterate**](http://apidock.com/rails/ActiveSupport/Inflector/transliterate)

Replaces non US-ASCII characters with an US-ASCII approximation.

In the next part I'll show some example code. It should be online soon.
