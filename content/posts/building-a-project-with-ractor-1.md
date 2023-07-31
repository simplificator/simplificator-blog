---
title: Building a project with Ractor (part 1)
date: 2023-08-02
language: en
author: Andy Pfister
tags:
  - ruby
  - ractor
---

Hi!

Long time no see. It's also the first time I contribute something to the blog besides reviews and dependency updates. But we got a customer project where we had the chance to work with Ruby Ractors, and this is an excellent opportunity to discuss it. At the time of writing, it's the end of June 2023, and we only implemented the proof-of-concept so far. This will be a multi-part series, but we can only tell how many parts there will be once we finish the project.

In this part, I want to dive into Ruby's history with concurrency, re-explain Ractors, and ask: Why is nobody really talking about it?

## Concurrency in Ruby

First, we need to clear up concurrency versus parallelism. Since the earliest versions of Ruby, you can run your code concurrently using the [Thread API](https://rubyapi.org/3.2/o/thread). However, the program will not run in parallel. Parallel means "doing multiple things at the same time".

*An example for Ruby*: You write a program that runs two threads.Once you start it, only one of the threads will run simultaneously, but Ruby will swap between running the two until both are eventually finished. If you add something like `puts` to monitor which Thread is running, they appear to run simultaneously, but they don't. The swapping between executing one of the threads makes it look like it.

The reason behind this mechanism is the Global VM Lock or short GVL. Ruby has a virtual machine that interprets a set of instructions a parser generates. If two things ran simultaneously on this virtual machine, bad things would happen, like a corrupted state or wrong calculations. Therefore, the currently running program gets the GVL when it is allowed to run instructions on the virtual machine, and it must be handed over once finished or forced to. This mechanism ensures that your Ruby program remains thread-safe so no unforeseen issues appear. Notably, the GVL is per process and not "global", so for each Ruby process you start, one GVL is available.

If you are interested in this topic, I recommend [a blog post by Jean Boussier](https://shopify.engineering/ruby-execution-model), an engineer at Shopify. He also released [a gem](https://github.com/Shopify/gvltools) to instrument various metrics around the GVL.

*Side note*: Python also has a lock, but only a Global Interpreter Lock (GIL), as it does not have a virtual machine. Threads can release the GIL once they no longer execute Python bytecode but only native C functions. Once the result is ready to jump back into Python bytecode, the Thread can re-request the GIL. If it was not for this little trick, [no machine learning or extensive math would be possible in efficient time on Python](https://softwareengineering.stackexchange.com/questions/186889/why-was-python-written-with-the-gil/186909#186909). Ruby also once had a C API to do this according to [StackOverflow](https://stackoverflow.com/questions/36245878/releasing-the-global-vm-lock-in-a-c-extension-without-using-another-function), but it was eventually removed from the public API.

*Side note 2*: There is also [a proposal](https://peps.python.org/pep-0703/) for Python to remove their GIL for Python 3.13. Although this idea sparks quite a lot of discussion both in the [linked Discourse thread](https://discuss.python.org/t/pep-703-making-the-global-interpreter-lock-optional-3-12-updates/26503) as well as [other places](https://lwn.net/Articles/939568/) on the internet.

## Ractor

Ractor is short for Ruby Actor and was introduced with Ruby 3.0, although it is still marked as an experimental API, even in Ruby 3.2. According to the [Ruby documentation](https://docs.ruby-lang.org/en/3.2/ractor_md.html), Ractor is designed to provide a parallel execution feature of Ruby without thread-safety concerns.

Actor is a general concurrency model. It is used in other languages, like the [Akka library](https://akka.io/) for the JVM or the [Elixir](https://elixir-lang.org/getting-started/processes.html)/Erlang language base. Actors are small capsules that can receive and send messages to other actors in the system. When receiving a message, an actor can take action upon it. Each actor manages its own state and, importantly, can not access the state of other actors. To a certain extent, the design of the Actor concurrency model already imposes thread safety.

In Ruby, creating a Ractor requires a block of code that it should execute. The return value of the Ractor is a reference to it. An example from the Ruby docs shows this well: A new Ractor is created that produces "ok". This result is saved in an outgoing "mailbox". Each other actor in the system can retrieve the value from this mailbox if they know it. With `take`, we can do that using our Ractor reference `r`.

```ruby
r = Ractor.new do
  'ok'
end
r.take #=> `ok`
```

The [Ruby documentation](https://docs.ruby-lang.org/en/3.2/ractor_md.html) has quite a few examples of how to work with Ractor, so I will not reiterate them here.

One important detail about Ractor, and the single reason it enables parallel programming on Ruby, is that each Ractor has its own GVL. Instead of appearing to run in parallel, Ruby can now run code in parallel.

## Why is nobody really talking about Ractor?

In the next part of this series, I will explain why we use Ractor for the client project (hint, unique requirements). But today, I want to focus on one question to close out this post: why is nobody talking about Ractor?

At Simplificator, we maintain many client projects, most in Rails. Given that you need to update your gems occasionally, we read release notes, and I don't recall that Ractor was ever mentioned anywhere. There was some initial buzz on Social Media when Ruby 3.0 was released with Ractor and Fiber, but nowadays not really a peep.

Coincidentally, when I researched options for our client project, I stumbled upon the talk by Koichi Sasada at RubyKaigi 2023 titled "Ractor reconsidered".

He dives into a few issues about the low adoption rate for Ractor and shares planned improvements for Ruby 3.3. I will repeat a few points from his talk and add my opinion, but I highly recommend [watching his presentation](https://rubykaigi.org/2023/presentations/ko1.html).

The core issue for Ractor is its programming model. And I don't negatively mean this; choosing the Actor model was a good idea. However, as mentioned before, Actors are independent of each other and cannot share states other than by messages. However, for Ruby, which happens to be a single-threaded language for most of its life, that's an issue. People rely on global variables, which Ractor does not allow. You need to re-think how your code should work with Ractor, and it is potentially quite a large code refactor.

I also assume that most Ruby programmers use it with Rails, which is incompatible with Ractor, at least when you try to use most of Rails' API. Running the following simple example gives an exception:

```shell
irb(main):001:1* r = Ractor.new do
irb(main):002:1*  Rails.logger.info "this is a message"
irb(main):003:0> end
(irb):1: warning: Ractor is experimental, and the behavior may change in future versions of Ruby! Also there are many implementation issues.
#<Thread:0x00000001157759f0 run> terminated with exception (report_on_exception is true): can not get unshareable values from instance variables of classes/modules from non-main Ractors (Ractor::IsolationError)
=> #<Ractor:#2 (irb):1 terminated>
```

Until earlier this year, Ruby 2.7 was still supported (and 2.6 the year before). This also made it unattractive to restructure your code, as your Ractor code looks different from your traditional code, especially when a minority actually used a Ruby version that supported the new API.

## Conclusion

Ractor is an exciting idea and allows programmers to write code that runs parallel with standard Ruby code's elegancy. However, given that you must re-think your code for Ractor and a few other issues, its adoption rate is low. I will explain in the next part why we decided to leverage Ractor for our customer project and weigh it against other options.
