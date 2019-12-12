---
title: "Rspec expectations with a block"
date: 2013-03-15
language: en
author: Simplificator
---

```ruby
obj.should_receive(:message) do |arg1, arg2|
  # set expectations about the args in this block
  # and optionally set a return value
end
```

Did not know that rspec allows to match arguments with a block? Comes in handy for the specs I currently write.
