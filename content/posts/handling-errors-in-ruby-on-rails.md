---
title: "Handling errors in Ruby on Rails"
date: 2015-03-13
---

Rails offers multiple ways to deal with exceptions and depending on what you want to achieve you can pick either of those solutions. Let me walk you through the possibilities.

## begin/rescue block

[begin/rescue](http://rubylearning.com/satishtalim/ruby_exceptions.html) blocks are the standard ruby mechanism to deal with exceptions. It might look like this:

```ruby
begin
  do_something
rescue
  handle_exception
end
```

This works nice for exceptions that might happen in your code. But what if you want to rescue every occurrence of a specific exception, say a `NoPermissionError` which might be raised from your security layer? Clearly you do not want to add a begin/rescue block in all your actions just to render an error message, right?

## Around filter

An [around filter](http://guides.rubyonrails.org/action_controller_overview.html#after-filters-and-around-filters) could be used to catch all those exceptions of a given class. Honestly I haven't used a before filter for this, this idea came to my mind when writing this blog post.

```ruby
class ApplicationController < ActionController::Base
  around_action :handle_exceptions

  private
  def handle_exceptions
    begin
      yield
    rescue NoPermissionError
      redirect_to 'permission_error'
    end
  end
end
```

## rescue_from

[`rescue_from`](http://guides.rubyonrails.org/action_controller_overview.html#rescue-from) gives you the same possibilities as the around filter. It's just shorter and easier to read and if the framework offers a convenient way, then why not use it. There are multiple ways to define a handler for an exception, for a short and sweet handler I prefer the block syntax:

```ruby
class ApplicationController < ActionController::Base
 rescue_from 'NoPermissionError' do |exception|
   redirect_to 'permission_error'
 end
end
```

## exceptions_app

There is an additional feature (added in Rails 3.2) that allows to handle exceptions. You can specify an `exceptions_app` which is used to handle errors. You can use your own Rails app for this:

```ruby
config.exceptions_app = self.routes
```

If you do so, then your routing must be configured to match error codes like so:

```ruby
match '/404', to: 'exceptions#handle_404'
```

Alternatively you can specify a lambda which receives the whole Rack env:

```ruby
config.exceptions_app = lambda do |env|
  # do something
end
```

Do you wonder how you can call an arbitrary action when you have the env? It's pretty easy:

```ruby
action = ExceptionsController.action(:render_error)
action.call(env)
```

In any case you want to set following configuration for `exceptions_app` to be used:

```ruby
Rails.application.config.consider_all_requests_local = false
Rails.application.config.action_dispatch.show_exceptions = true
```

But where is the exception you ask? It is stored in the Rack env:

```ruby
env['action_dispatch.exception']
```

And as a bonus: here is how you can determine an appropriate status code for an exception:

```ruby
wrapper = ActionDispatch::ExceptionWrapper.new(env, exception)
wrapper.status_code
```

There is more information you can extract using the exception wrapper. Best you [look it up in the API description](http://api.rubyonrails.org/classes/ActionDispatch/ExceptionWrapper.html).

Most of this code can be seen in action in our [infrastructure gem](https://github.com/simplificator/simplificator_infrastructure) which we use to add error pages to apps we build.
