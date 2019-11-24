---
title: "Handling errors in Ruby on Rails"
date: 2015-03-13
---

Rails offers multiple ways to deal with exceptions and depending on what you want to achieve you can pick either of those solutions. Let me walk you through the possibilities.

## begin/rescue block

[begin/rescue](http://rubylearning.com/satishtalim/ruby_exceptions.html) blocks are the standard ruby mechanism to deal with exceptions. It might look like this:

\[code language="ruby"\] begin do\_something rescue handle\_exception end \[/code\]

This works nice for exceptions that might happen in your code. But what if you want to rescue every occurrence of a specific exception, say a _NoPermissionError_ which might be raised from your security layer? Clearly you do not want to add a begin/rescue block in all your actions just to render an error message, right?

## Around filter

An [around filter](http://guides.rubyonrails.org/action_controller_overview.html#after-filters-and-around-filters) could be used to catch all those exceptions of a given class. Honestly I haven't used a before filter for this, this idea came to my mind when writing this blog post.

\[code language="ruby"\] class ApplicationController < ActionController::Base around\_action :handle\_exceptions

private def handle\_exceptions   begin     yield   rescue NoPermissionError     redirect\_to 'permission\_error' end end end \[/code\]

## rescue\_from

[rescue\_from](http://guides.rubyonrails.org/action_controller_overview.html#rescue-from) gives you the same possibilities as the around filter. It's just shorter and easier to read and if the framework offers a convenient way, then why not use it. There are multiple ways to define a handler for an exception, for a short and sweet handler I prefer the block syntax:

\[code language="ruby"\] class ApplicationController < ActionController::Base rescue\_from 'NoPermissionError' do |exception| redirect\_to 'permission\_error' end end \[/code\]

## exceptions\_app

There is an additional feature (added in Rails 3.2) that allows to handle exceptions. You can specify an _exceptions\_app_ which is used to handle errors. You can use your own Rails app for this:

\[code language="ruby"\] config.exceptions\_app = self.routes \[/code\]

If you do so, then your routing must be configured to match error codes like so:

\[code language="ruby"\] match '/404', to: 'exceptions#handle\_404' ... \[/code\]

Alternatively you can specify a lambda which receives the whole _Rack env_:

\[code language="ruby"\] config.exceptions\_app = lambda do |env| # do something end \[/code\]

Do you wonder how you can call an arbitrary action when you have the env? It's pretty easy:

\[code language="ruby"\] action = ExceptionsController.action(:render\_error) action.call(env) \[/code\]

In any case you want to set following configuration for exceptions\_app to be used:

\[code language="ruby"\] Rails.application.config.consider\_all\_requests\_local = false Rails.application.config.action\_dispatch.show\_exceptions = true \[/code\]

But where is the exception you ask? It is stored in the Rack env:

\[code language="ruby"\] env\[<span class="pl-s1"><span class="pl-pds">'</span>action\_dispatch.exception<span class="pl-pds">'</span></span>\] \[/code\]

And as a bonus: here is how you can determine an appropriate status code for an exception:

\[code language="ruby"\] wrapper = <span class="pl-s3">ActionDispatch</span>::<span class="pl-s3">ExceptionWrapper</span>.<span class="pl-k">new</span>(env, exception) wrapper.status\_code \[/code\]

There is more information you can extract using the exception wrapper. Best you [look it up in the API description](http://api.rubyonrails.org/classes/ActionDispatch/ExceptionWrapper.html).

Most of this code can be seen in action in our [infrastructure gem](https://github.com/simplificator/simplificator_infrastructure) which we use to add error pages to apps we build.
