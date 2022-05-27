---
title: "How-To: Rails upgrade strategy"
date: 2022-05-25
language: en
author: Tatiana Panferova
---
Rails has very good [documentation](https://guides.rubyonrails.org/index.html) in general and an [upgrade guide](https://guides.rubyonrails.org/upgrading_ruby_on_rails.html) in particular, but an upgrading task can still be quite tricky and intimidating. None of the documentation covers all the details and sometimes details are the key to overcome challenges that can arise when migrating to a newer Rails version.

I would like to share some tips that I learned from my colleagues and that helped me a lot with developing an upgrade strategy.

General idea is: before doing Rails update itself, **try to update as many dependencies as possible in advance**. (Bonus: this strategy can be used for any framework upgrade - for example, I applied this approach when upgrading the application made with [Gatsby](https://www.gatsbyjs.com/)). The reason is: when you try to upgrade Rails directly, all packages are updated at once as well and you don’t understand where the errors come from. Did a new Rails version cause them? Or some of the gems?

When I once tried to do a Rails upgrade without updating dependencies in advance, all tests were broken. The error message was very weird and not helpful at all. Google and Stackoverflow also did not know about such a problem. I changed my approach and started to update gems one by one. It turned out that the `database-cleaner` gem, that our application uses, introduced some breaking changes since our last update (it actually became a set of gems depending on the used database adapters). In our case I had to install a new gem `database-cleaner_mongoid` and do some configuration changes. The problem was solved!

So let's have a look how an upgrade to a minor Rails version could be performed (for example, from 6.0 to 6.1).

First of all you could try to update to the next Rails patch version (for example, from 6.0.3.6 -> 6.0.4.1) - this will update only Rails and no other dependencies. In that case you just run `bundle update rails` and you are done. You don’t have to run `app:update` task.

Next step would be to run the command `bundle outdated`. It lists all outdated gems, pointing to what group each gem belongs to - `default`, `development` or `test`. Then you can update them one by one (you update dependencies only from a `Gemfile`, not from a `Gemfile.lock`). One update - one commit. Do not forget to run tests after each gem update! Some updates are as simple as just running the command `bundle update <gem name>`. Others can be more complicated - then it is better to tackle them separately, in a smaller pull requests. For example, upgrade from `sprockets` 3 to 4 requires also some changes in `manifest.js`. Or, for example, `mongoid` upgrade to version 7 had some breaking changes, and I had to modify code in several controllers. It is better to not mess up such stuff with other gems updates.

It might seem like a lot of work because the list of dependencies can be pretty long (I ended up with one pull request updating 20 gems plus 4 pull requests for individual gem updates). But at the end of the day it saves you much time since you can discover faster which dependency caused the errors after its update.

Another option to perform Rails upgrades smoothly is to keep your dependencies up to date. You can do it easily by installing [dependabot](https://docs.github.com/en/code-security/dependabot). It will run your pipeline against any new gem updates and you will be able to catch breaking changes early.

Often before the Rails upgrade you would also like to upgrade to a newer Ruby version. Here the same principle is applied: if the upgrade does not work out of the box and you get errors, try to update first those dependencies that block the Ruby upgrade.

Here once again all steps recapped:

1. Upgrade Ruby version to the latest compatible with the desired Rails version
2. If this does not work, individually upgrade gems blocking Ruby update, and try again
3. Update Rails to the next patch version
4. Run `bundle outdated` and update one by one all outdated gems
5. Perform Rails upgrade to a minor or a major version
6. Success! 🎉

Keeping your Rails app up to date is essential. It allows you to use the latest features that will generally make your life easier, and ensures you don't miss important security updates. It'll also keep your developers team happy if they can work with cutting edge libraries!
