---
title: "Configuration load order in Rails"
date: "2015-01-19"
---

Ever wondered what the load order of the various configuration files of Rails is?

In Rails the (more or less) common places to configure your app are:

- _application.rb_
- _config/environments/\*.rb_
- _config/initializers/\*.rb_
- _after\_initialize_ callbacks (in _application.rb_ or in environment specific files)

Since there is multiple points where you can add the configuration the order in which those configurations are applied is important. E.g. it might happen that you set a value in one place and it gets reverted from another config file. This is the order that get's applied, tested in Rails 4.2

1. _application.rb_
2. environment specific config file in _config/environments/\*.rb_
3. initializers, they are loaded in alphabetical order
4. _after\_initialize_ callbacks, in the order they have been added
