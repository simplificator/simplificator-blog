---
title: "Rake: execute vs. invoke"
date: "2014-12-30"
---

I recently had to write custom rake tasks for a Rails project which deals with multiple databases (one Rails database and 1+ additional databases). The way we deal with multiple databases should be covered in another post. Now i only want to show the difference between _invoke_ and _execute_.

**invoke**

\[code language="ruby"\]Rake::Task\[:a\_task\].invoke\[/code\]

Only runs the task if needed. Which in our case translates to _once_.

**execute**

\[code language="ruby"\]Rake::Task\[:a\_task\].execute\[/code\]

Runs the task as many times as called.
