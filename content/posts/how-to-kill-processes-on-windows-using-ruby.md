---
title: How to kill processes on Windows using Ruby
date: 2016-01-18
language: en
author: Lucian Cancescu
---

In order to terminate a process in Ruby you can use the kill method in the of the Process class in the following way:

```ruby
pid = 1234
Process.kill("TERM", pid)
```

If you are using Ruby on Windows you have probably already noticed that `Process.kill` does not work correctly.

There are two problems with it:

1. It does not recognize any signal except `KILL`;
2. When it kills a process with `Process.kill("KILL", pid)` the process incorrectly returns status 0 (success).

Here is an example:

```ruby
# On Windows:
irb(main):002:0> Process.kill("TERM", 1234)
Errno::EINVAL: Invalid argument

# On Linux:
irb(main):003:0> Process.kill("TERM", 686868)
Errno::ESRCH: No such process
```

Windows complains that `TERM` is an invalid argument, although `Signal.list` includes `TERM`:

```ruby
irb(main):003:0> Signal.list
=> {"EXIT"=>0, "INT"=>2, "ILL"=>4, "ABRT"=>22, "FPE"=>8, "KILL"=>9, "SEGV"=>11, "TERM"=>15}
```

You might think `Process.kill(15, PID)` works but it fails with the same error. 

The `KILL` signal however works:

```ruby
irb(main):004:0> Process.kill("KILL", 768)
=> 1
```

The questions is: does it work correctly? 

Let's run some tests. I ran the following script for testing:

Open an irb instance and run:

```ruby
command = "tracert www.google.com"
exitstatus = nil
Open3::popen3(command) do |stdin, stdout, stderr, wait_thread|
  puts "PID: #{wait_thread.pid}" # ===> this will give you the PID. 
  status = wait_thread.value
  puts "============"
  puts "termsig=#{status.termsig.inspect}"
  puts "success?=#{status.success?.inspect}"
  puts "stopsig=#{status.stopsig.inspect}"
  puts "stopped?=#{status.stopped?.inspect}"
  puts "signaled?=#{status.signaled?.inspect}"
  puts "exitstatus=#{status.exitstatus.inspect}"
  puts "exited?=#{status.exited?.inspect}"
  puts "status.inspect=#{status.inspect}"
  exitstatus = status.exitstatus
  puts "============"
end
puts exitstatus.inspect
```

From a different irb session run the following:

```ruby
pid = 'XXX' # printed in the code above
Process.kill("KILL", pid)
```

Here are the results I got:

```ruby
# KILL Force Windows with Process.kill("KILL", pid)
# PID: 2816
# ============
# termsig=nil
# success?=true <======= wrong on Windows, it was a force kill
# stopsig=nil
# stopped?=false
# signaled?=false
# exitstatus=0 <======== wrong on Windows, it was a force kill
# exited?=true
# status.inspect=#<Process::Status: pid 2816 exit 0>
# ============
```

What is even worse is that if you run the command again and wait until it finishes (thus **no** `Process.kill`), the output is exactly the same.

```ruby
# Success Windows
# PID: 4860
# ============
# termsig=nil
# success?=true <======== correct
# stopsig=nil
# stopped?=false
# signaled?=false
# exitstatus=0 <======== correct
# exited?=true
# status.inspect=#<Process::Status: pid 4860 exit 0>
# ============
```

This means we cannot rely on `Process.kill("KILL", PID)` on Windows to stop a process. Please correct me if I am wrong but to me the two outputs above look the same.

I performed the same test (only changed the command tracert to traceroute) on OSX and here are the results:

Without `Process.kill`, the command finishes successfully:

```ruby
# Success OSX
# ============
# termsig=nil
# success?=true <========= correct
# stopsig=nil
# stopped?=false
# signaled?=false
# exitstatus=0 <========= correct
# exited?=true
# status.inspect=#<Process::Status: pid 54466 exit 0>
# ============
```

With `Process.kill`, the command exits with a status code different than `0`:

```ruby
# KILL force on OSX
# ============
# termsig=9       <========= correct
# success?=nil    <========= better
# stopsig=nil
# stopped?=false
# signaled?=true  <========= looks good
# exitstatus=nil
# exited?=false
# status.inspect=#<Process::Status: pid 54523 SIGKILL (signal 9)>
# ============
```

Now the question remains: how do I kill a process on Windows?

I found an easy way using the [taskkill](https://technet.microsoft.com/en-us/library/cc725602.aspx) command. Please check if your version of Windows is included in the link above.

```ruby
system("taskkill /pid #{pid}")      # graceful stop, will return true / false
system("taskkill /f /pid #{pid}")   # force stop, will return true / false
```

In case you are wondering how the output of the test script looks on Windows with `taskkill /f` here it is:

```ruby
# KILL Force Windows with taskkill /f /pid PID
# PID: 4740
# ============
# termsig=nil
# success?=false <======= correct!
# stopsig=nil
# stopped?=false
# signaled?=false
# exitstatus=1 <======== correct!
# exited?=true
# status.inspect=#<Process::Status: pid 4740 exit 1>
# ============
```

Happy hacking!
