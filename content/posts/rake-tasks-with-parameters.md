---
title: "Rake Tasks With Parameters"
date: 2015-04-09
---

Rake tasks are a convenient method to automate repeating tasks and also make them available via the command line. Oftentimes these tasks can be executed without any user input. Think of a built-in task like "db:migrate" -- it does not take any arguments. There's other tasks that in fact take arguments. Usually, they work like this: `rake the_namespace:the_task[arg1,arg2]`.

If you look for a solution to rake tasks with arguments, you often find this code snippet:

\[code language="ruby"\]

namespace :utils do

task :my\_task, \[:arg1, :arg2\] do |t, args| puts "Args were: #{args}" end

end

\[/code\]

This code snippet, however, does not load your Rails environment. So you cannot load any models for example.

A solution to this problem looks like this:

\[code language="ruby"\]

namespace :utils do

desc 'Unlocks this user. Usage: utils:unlock\_user USER=42' task :unlock\_user => :environment do |t, args| user\_id = ENV\['USER'\].to\_i puts "Loading user with id = #{user\_id}"

user = User.find(user\_id) user.unlock! end

end

\[/code\]

You call this rake task with `rake utils:unlock_user USER=42`. By specifying `USER=42` you load this argument into the environment variables.

There is, however, a more standard way of implementing this.

\[code language="ruby"\]

namespace :utils do

desc 'Unlocks this user. Usage: utils:unlock\_user\[42\] for the user ID 42' task :unlock\_user, \[:user\_id\] => :environment do |task, args| user\_id = args.user\_id puts "Loading user with id = #{user\_id}"

user = User.find(user\_id) user.unlock! end

end

\[/code\]

There we go, we now have a rake task with arguments in brackets. If you want to have more arguments, you simply add them to the arguments list after the task name and retrieve it in the `args` object by its name.

Which variant of rake task you prefer is up to you. The first one with the explicit environment variable is probably easier to read, the second variant is more in line with standard rake.
