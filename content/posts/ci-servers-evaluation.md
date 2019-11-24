---
title: "CI servers evaluation"
date: 2012-09-19
---

Currently we are using [Jenkins](http://www.jenkins-ci.org/) as our CI server. But we are not completely satisfied with it. The main problem with [Jenkins](http://www.jenkins-ci.org/) is that it is overloaded with features which makes the UI quite messy. We also hit a problem with upgrading it to a never version, which was probably a conflict between war installer and a debian package. After the upgrade it stopped working and we spent the afternoon bringing it back to life. We are also missing support for projects grouping. And last but not least to make it work you need to install bunch of plugins, which then you need to keep up to date and maintain.

Taking this into account we started to search for other solutions. Of course there’s no such thing as _the perfect_ CI server, but maybe there’s one that suits our needs better than [Jenkins](http://www.jenkins-ci.org/).

## Our needs

Most of our projects are Ruby applications, but we also have couple of projects written in other languages (including some iOS applications), so we would appreciate support for those languages.

Since most of our projects are web application possibility of mirroring deployment development as close as possible is important. It will allow us to check if it’s safe to move to never version of the os or check dependencies easily.

Thing you do on CI server at least once for each project is setting up a build. This step needs to be easy! Spending hours on setting up a project on CI server is not what you want. It’s also important that you can easily change existing configurations. And last - but not least - that builds are run only when needed (that means only when the source code actually had been changed).

Setting up job is one thing. Setting up server itself is another (I checked some software as a service solutions as well as installable CI servers). You don’t want to spend a lot of time on setting it up, there’s a lot of more interesting things to do out there. The easier the set up procedure is - the better. The solutions I tested support a distributed architecture (there’s a master server and the build is run by worker). This is a good feature (especially on installable software) as it makes resource management a lot easier. Not to mention that it can help in mirroring deployment environment.

Another important thing is project grouping. Let’s say you have group of applications forming one project. It’s needles to say that if there’s problem with one of them - there’s problem with the whole project. Grouping all of them together under one project makes monitoring much easier. It would also be good to have possibility to group builds that are using the same repository but are building different branches.

If something goes wrong it’s nice to receive a notification. In the office we have a special display which shows the status of our projects on [Jenkins](http://www.jenkins-ci.org/) and turns red if the build is red. This is nice and we want to keep it but if it’s possible to send some notifications to the projects’ developers team and/or to the one who broke the build it would be great.

You will also spend some time on looking at the tests output. In most cases these are just console logs but the way of displaying them is important when you want to find which test failed. It would also be helpful to have more informations here. Some statistics (for example build and build steps duration, duration of individual tests etc.) are very welcome. If it is possible to include some additional informations (like test coverage, code metrics, code formatting issues) then why not use it?

Sometimes a customer wants to see the test results. To allow him access to the server a user management system is essential so that the access to specific projects can be granted.

To sum up key features that are important to us are:

- easy setup and low maintenance cost
- distributed architecture
- possibility of mirroring deployment environment
- easy build configuration and configuration change
- project grouping
- support for ruby applications
- support for iOS applications
- notification system and the API
- nice test result output
- user management system

## CI server and software as a service

Trend of moving to the cloud computing had also affected CI servers. There are more and more solutions that are being developed as a services. Is choosing a service instead of setting up a server is a good idea?

Well, there’s no right answer for this. As with everything there are some pros and cons.

On one hand you neither need infrastructure nor have to set up the application itself. No doubt that it saves time spent both on maintenance and set up (and this can be a lot in case of some solutions).

On the other hand you don’t have direct control of the environment (unless it was taken into consideration by the developers) so if for any reason you require a newer version of library than the one provided on test machine or if you want to test against another os or you want to affect environment any other way it requires contact with the support.

Another thing is that most of those solutions are tied to Github account. This means two things. First you need to keep your code on Github, and this is not a big deal. But the other one might hurt. It does not support user management. So granting access to customer becomes a lot harder.

And last but not least - if you have a private projects using software as a service solution means that you have to trust another party.

## Software as a service solutions

### Semaphore

[![Semaphoreapp logo](images/semaphore-logo.png)](https://semaphoreapp.com/) [Semaphore](https://semaphoreapp.com/) is hosted CI application for ruby. It supports Github based collaboration and is integrated with Github. Configuration is easy and builds are really fast. Various kinds of notifications and aggregation of build history are supported.

Unfortunately it’s only for ruby, but most our projects are in ruby so it’s worth trying.

Registration is really fast and easy. After entering email and choosing a password the account is linked to Github. User can choose if he likes to build only public or both public and private projects. The system is distributed - every build is executed on separate virtual machine. This seems promising but unfortunately one cannot do much in terms of tweaking virtual machine options during the build setup. There’s possibility of choosing ruby version, database server (if needed). User also has access to couple of environment variables, but that’s it.

Build configuration is really easy. To add new project you just need to click a button, choose project from your imported Github repositories list (admin access for proper hook configuration) and select a branch. Semaphore then scans the source code and predicts the build configuration. This works surprisingly well. After customization of generated config you’re good to go. Only selected branches are built and post post receive hooks are configured by the service so no additional tweaking is required for building only on source code change is required. The configuration panel is very clear and tweaking build configuration is super easy.

Unfortunately build setting are shared by all branches so if you need to build one branch against different ruby version or database or with just a different build script you have to add same Github project with new settings again. Adding new project is not a big deal but it interferes with project grouping.

The only grouping that is available is via repositories. Unfortunately if you add a repository for a second time (should it be a mistake or because of configuration differences) both will be displayed as separate projects. So this feature is not well supported.

Wide range of notification methods is supported. Unfortunately email notifications are configured by user. On the other hand other tools (like hipchat, campfire or webhooks) are supported. There’s also an API which is well documented.

Test output are just raw console logs. But they are grouped by build command and highlighted depending on the step status. Finding failing tests is relatively easy. Unfortunately this output is not customizable - you cannot include any metrics and there are no statistics.

Collaborators are synced with Github so granting access for team members is simple. The customers would need a Github account. Other option hire is access via the API.

It’s a really nice service. I very much like the simplicity of adding new project and source code scanner which discovers build configuration quite well. Unfortunately it works only for ruby so using CI for other type of projects wold require another service.

### Travis

[![Travis CI logo](images/travis-logo.png)](http://travis-ci.org/) [Travis](http://travis-ci.org/) is distributed build system for open source community. At the beginning it only allowed public projects, version that supports private projects is currently in beta. It’s highly customizable and build configuration is stored in the repository). It started as a service for ruby projects but it supports other languages too.

You can login with Github account and it will automatically scan for suitable repositories. The drawback is that pro version supports only private projects. So if one needs to build both kind of project registration in two services is required. Also only repositories with admin access are displayed. Similar as in [Semaphore](#semaphore) each build is executed on separate virtual machine but here there are more possibilities of configuring it. Although it’s not possible to change the os version the machine comes with passwordless sudo and apt installed. This allows installing all necessary dependencies and experimenting. There also are some environment variables available.

Creating new job is very easy. Repositories imported from Github are visible (only those to which user has admin access), and only thing that needs to be done in the application is flipping a switch to on. Build configuration is kept in a special yaml file in the source code. It supports wide range of configuration options (for example ruby version and separate gemfiles for ruby projects). Validator of configuration file is also available. By default all branches are being build once the project is added. But the configuration file allows both white and blacklisting branches. Furthermore it’s possible to mark that some branches are allowed to fail. This is quite useful for some experimental stuff.

Unfortunately there’s no project grouping on [Travis](http://travis-ci.org/). Although builds are tied to branch and repository the project status is always the status of the most recent build, which is quite confusing.

[Travis](http://travis-ci.org/) started as a service for ruby application and support for them is good. As virtual machines provided by the service are running on server edition of Ubuntu testing iOS applications is not possible here.

Notifications can be configured and a developer who broke the build will receive an email message. More options are available. Apart from email IRC, campfire and webhooks are supported. There’s also a very useful link to build status image which can be for example included in the project readme which is displayed on Github. There is also well documented API for keeping our CI display up and running.

Test output are ungrouped console logs, but with colours. It’s quite easy to detect failure. Unfortunately adding additional data is not possible.

User account is tied to Github which means no access to customers. On the other hand collaborators are added automatically and have access to the project, and a link to status image should be enough for showing build status to customers.

I very much like the idea of build configuration being included with the source code. This makes setup easy and adds possibility of templating. It’s also nice that user has a possibility of managing the environment at least to some extent. Status image in Github readme is also pretty cool.

What I don’t like is lack of project grouping. Not separating branches within the project makes the project status and problem detection quite unclear.

Also it’s a pity that it does not support iOS applications but you cannot have everything.

### Circle

[![Circle CI logo](images/circle-logo.png)](https://circleci.com/) [Circle](https://circleci.com/) is a service that is designed to work with web apps. It’s main features include easy and fast setup, fast test running and deep customization. It also claims to have very good support. It’s currently on public beta.

User account is tied to Github and repositories are imported automatically. As with [Semaphore](#semaphore) and [Travis](#travis) it runs builds on virtual machines. What is interesting is a possibility to ssh to the virtual machine after build. It can help to investigate reasons of a build failure. In terms of mirroring deployment it’s very similar to [Travis](#travis). It’s possible to install dependencies, tweak commands etc.

There are two options for creating a build configuration. One is using a web UI with a clear build configurator, similar to the one used by [Semaphore](#semaphore). The other option is via YAML file - the same way it’s handled in [Travis](#travis). The second one is recommended. The builds are run only when needed (on the source code change) but this is quite too clever in this service. It turns out that developer who pushes the code needs to have active Circle CI account or be added as collaborator for the build to be run. It’s quite ridiculous. Also there’s no configuration to block a branch from building or allow failures for a branch. This is not what I would expect.

Unfortunately similar to [Travis](#travis) there is no grouping and the project status is the status of the build triggered by the last commit. That makes the result view quite unclear.

There’s pretty good support for ruby application, but it does not work for iOS. It’s not surprising - it’s targeted for web applications after all.

Email notification can be configured both per user and per project basis. IRC, campfire and webhooks are supported apart from email. I haven’t found description of the API but there seems to be some. It’s being changed at the moment though.

Test output are just console logs, but grouped and with colours enabled. Adding additional data is not possible.

There is no user management. You can invite collaborators only when they make a push to the repository.

Circle has really nice support. I had a failing build and after a while I received a message from one of the founders asking if I have problems with setup and offering help. Pretty nice.

Circle is very similar to [Travis](#travis). I like the possibility to SSH to VM after build execution but it’s not a killer feature. Support also looks pretty good. On the other hand it lacks branch blacklisting and/or failure allowing. Also user management is simply wrong. Although interface looks much nicer I’d rather go for [Travis](#travis)

## Installable software

### Bamboo

[![Bamboo CI logo](images/bamboo-logo.png)](https://circleci.com/) Although [Bamboo](http://www.atlassian.com/software/bamboo/) is available both on demand (as a service) and as installable version in my evaluation I focused on the latter. It is Continuous Integration and Release management system developed by [Atlassian](http://www.atlassian.com/) and is integrating well with their other products. It’s distributed and supports local agent as well as [Amazon Elastic Compute Cloud (EC2)](http://aws.amazon.com/ec2/). It has nice statistics panel and allows deployment management.

Server installation is fairly easy. All you need to do is to create configuration directory and add its path to the settings. Then just run the server and web setup will guide you through the process.

There are two things worth noting here. First is that installing server it’s not everything. User also has to configure executables which means adding commands and their paths as capabilities of the system. Furthermore as each agent can have its own capabilities this has to be done each time user adds new agent. Luckily there are plugins which will help with both with ruby and iOS configuration. Or user can stick to shell scripts. The other thing is that some additional configuration of the bundled served is required for machines with multiple IP addresses as it needs to be bound to one of them. It’s well documented though.

Bamboo is designed as distributed CI server. Adding remote agents is quite easy - the setup jar is downloaded on the agent machine and then run with the master server url as a parameter. Then the setup will guide user. Each agent has different capabilities, which means that defining available commands is needed. The advantage of it is that it allows to be as close to deployment environment as possible.

Github integration for adding project is supported. It’s possible either with ssh keys or via user account. Pull access is enough for adding the project. Project can be built in two ways. Either with tasks added by a plugin or with plain shell scripts. In the first case user select commands from server capabilities, adds additional parameters (for example which task is to be executed for rake) and that’s it. In the second one user just defines which shell script should be run and the shell script itself contains the build configuration. Configuration panel is complex but clear, editing build configuration is easy.

Project grouping in [Bamboo](http://www.atlassian.com/software/bamboo/) looks good. They are grouped inside plans. It’s possible to have multiple repositories under a plan. So it looks like the exact kind of grouping we require.

Wide range of notification is supported (incl. email, hipChat and IMs). It’s also possible to notify developer who broke the build and configuring notifications is fairly easy. There’s also a REST API.

Test output is more detailed than in on service solutions. It’s possible to see which tests are failing and who broke the build. Some additional statistics are also available. It’s possible to display additional data using build artifacts.

Bamboo is really good service. What I really like is that’s possible to run it as on demand or on local server. Also support for remote agents on Amazon EC2 cloud is a nice feature. It’s a pity that there’s no out of the box support for ruby or iOS application but they are available as plugins. It is also very good choice for teams already using other software developed by [Attlassian](http://www.atlassian.com/).

### TeamCity

[![TeamCity logo](images/teamcity-logo.gif)](http://www.jetbrains.com/teamcity/) [TeamCity](http://www.jetbrains.com/teamcity/) is developed by [JetBrains](http://www.jetbrains.com/), the same company that brought RubyMine. It’s very user friendly, supports nice project grouping. It’s a distributed platform supporting many languages and having nice IDE integration feature which prevents you from committing broken code.

Installation of TeamCity if fairly easy and similar to [Bamboo](#bamboo). It requires running bundled server and then the setup will guide user through the process. After setting up the server there’s need to setup build runners. TeamCity is designed as distributed service and support the multinode architecture. Because of which it’s possible to mirror deployment environment completely.

It’s easy to add a new job. Same as with [Bamboo](#bamboo) user first configures the repository (unfortunately no Github import) and then build steps and actions using runners that were set up previously. TeamCity supports intelligent tests running - test that were added or changed or were failing previously can be run first so you can know faster if new feature works fine or that the broken test was fixed. There’s also IDE integration option that can prevent a developer from pushing a broken code. This might be useful. Projects are nicely grouped and can share parts of configuration.

Ruby application can be tested either via shell scripts or via Rake runner. It supports RVM settings and .rvmrc files. There’s also Xcode project runner which makes testing iOS applications a lot simpler than custom shell scripts. The good part is that they’re built in and no installation of additional plugins is required.

As with [Bamboo](#bamboo) there are lot of options for configuring notifications and many options are available.

I think that [TeamCity](http://www.jetbrains.com/teamcity/) has the best test output of all the presented tools. There are logs, detailed statistics. Failed tests are easily visible, it’s possible to add additional output as build artifacts. What I like very much is showing duration of test suites as well as individual test.

I really like this one. Support for ruby and iOS applications almost out of the box + intelligent tests running + nice test results and statistics + free license and a long trial period makes it definitely worth trying.

### Jenkins

[![Jenkins logo](images/jenkins-logo.png)](http://www.jenkins-ci.org/) [Jenkins](http://www.jenkins-ci.org/) is a actively developed fork of [Hudson](http://hudson-ci.org/). It supports plenty of languages. There is possibility to have distributed architecture (via slave nodes). It has a lot of plugins and active community. And last but not least - it’s open source project.

As with [Bamboo](#bamboo) and [TeamCity](#team-city) server setup is as easy as running a downloaded war file and following instructions. But after setting up a server there’s a need for download and setup bunch of plugins. Then there is a need to manage those plugins and keeping them up to date. It’s also worth noticing that jenkins is also available as linux package but this version tend to cause troubles with updating straight from jenkins.

Jenkins supports slave nodes, everything is done from configuration panel which is quite messy. But it works. Same as in [Bamboo](#bamboo) and [TeamCity](#team-city) this allows direct control on the deployment environment.

Build configuration panel is quite messy. One will eventually get used to it but it can be done better. Project grouping is not directly supported. It’s possible to achieve grouping with views and creating additional jobs (one for running all jobs, and another one for gathering test results from subjobs) but this requires some additional work and post build scripts.

Email notifications are supported directly, lost of other are available as plugins. It’s possible to notify developer who broke the build but this require additional configuration and involves some user management.

Test output is pretty disappointing. By default jenkins displays only plain console logs. It’s possible to add additional data but it requires plugins.

Default user management and permission system does not work very well and the panel is quite counter intuitive. Fortunately there’s a plugin which does it the right way.

Jenkins is good piece of software. But the problem is that there’s too much modularity. There’s a plugin for everything so first you need to find and install the right one and then you need to manage them all and keep them up to date. This considerably increases the time that needs to be spent on maintenance. Also managing and configuring jenkins is not as easy as it could be because of the UI which is quite messy. The lack of project grouping is really painful and the workaround is not completely satisfactory (not to mention that it is quite time consuming when done for the first time). To sum up I’d say that jenkins is good for start, but when you start to require something more you might find out that it actually is a good idea to switch to another solution.

## Conclusion

In the table below you will find a comparison of tested solutions (scales are 1 - 5):

Semaphoreapp

Travis

Circle

Bamboo

TeamCity

Jenkins

Easy setup

5 

5 

5 

3.5 

4 

2.5 

Mirroring deployment

2 

4 

3.5 

5 

5 

5 

Build configuration

4.5 

4 

4 

3.5 

4 

3 

Project grouping

2.5 

1.5 

1.5 

5 

5 

3 

Ruby applications support

5 

5 

5 

4.5 

5 

4 

iOS applications support

\-

\-

\-

4.5 

5 

4 

Smart notifications

2 

5 

3 

5 

5 

3 

Test results output

3 

3 

4 

4 

5 

3.5 

User management

\-

\-

\-

4.5 

4.5 

3.5 

There’s no easy answer for the question which CI server solution to choose. In the software as a service group my favourite is [Travis](#travis). I really like the idea of keeping build configuration with the source code. In the installable group [TeamCity](#team-city) looks very good. Mainly because of smart test running and very detailed test output. Also good support for the kind of project we develop is significant. And there’s a hybrid [Bamboo](#bamboo) if you cannot decide whether to use installable software or not.
