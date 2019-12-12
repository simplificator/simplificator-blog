---
title: "Rake: execute vs. invoke"
date: 2014-12-30
language: en
author: Simplificator
---

I recently had to write custom rake tasks for a Rails project which deals with multiple databases (one Rails database and 1+ additional databases). The way we deal with multiple databases should be covered in another post. Now i only want to show the difference between `invoke` and `execute`.

**invoke**

```ruby
Rake::Task[:a_task].invoke
```

Only runs the task if needed. Which in our case translates to _once_.

**execute**

```ruby
Rake::Task[:a_task].execute
```

Runs the task as many times as called.
