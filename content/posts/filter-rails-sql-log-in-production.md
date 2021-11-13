---
title: Filter Rails SQL log in production
date: 2015-02-02
language: en
author: Thomas Ritter
tags:
  - logging
  - rails
  - ruby
---

In order to debug a problem, which only occurred in production, we recently wanted to tweak our Rails SQL logs to only show the access to a specific table.

Here's what we did to accomplish this. We created a file `initializers/filter_sql_log.rb` with this content:

```ruby
if Rails.env.production?
  module ActiveRecord
    class LogSubscriber
      alias :old_sql :sql

      def sql(event)
        if event.payload[:sql].include? 'users'
          old_sql(event)
        end
      end
    end
  end
end
```

This monkey-patches the `ActiveRecord::LogSubscriber` class and only delegates to the old logging method, if the SQL statement includes the string `"users"`.

By default, SQL logging is deactivated in the Rails production environment. Therefore we needed to change `config/environments/production.rb` like this:

```ruby
config.log_level = :debug
```
