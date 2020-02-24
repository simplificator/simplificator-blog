---
title: "A new, simplified blog"
date: 2019-12-18
language: en
author: Lukas Eppler
---

**There is one obvious way that makes it easier for coders to write blog posts.**

We tried everything before: First we wrote our own thing. Of course. It was a simple database and we wrote our own
markup parser - well, it was 12 years ago and there wasn't much around rails yet. And for the first year or so, it
was just a blog. After some time
[Radiant CMS](http://radiantcms.org) came out and we gave it a spin. It worked, it was quite ok. We struggled greatly
with the multilingual part, but had something running. Unfortunately I don't have screenshots of the blog - and the
[wayback machine](https://web.archive.org/web/20071012023136/http://www.simplificator.com/)
has no recollection of our CSS, so I won't post screenshots here. It wasn't grand either, but already fairly political
(I ranted about the SUISA fees, which is now the reason why it is now apparently legal to use torrent software in Switzerland). I found a screenshot of the front page:

![Simplificator Front Page in 2010](/images/new_blog_web2010.png)

But it was also very technical, **we were proud of working with Ruby on Rails**, almost as much as we're proud now of
working with Elixir and Phoenix.

We then had the idea to link the different aspects of our work together: We write projects, using technologies,
with customers. Page visitors should be able to see what we do, who we are, and the connecting link was technology.
Several developers will develop a project, one project was always for one customer, one customer might have many projects. There will be several technologies used
(Ruby on Rails, Javascript in most cases, but also jQuery, Cucumber, RSpec, Heroku and many more). So we linked them
together. To make sure the links stay consistent we rolled our own thing again.

Simple is not easy. So our page grew, and it became apparent that we're inflexible. It got out of date. It was slow.
It wasn't ideal for all this new fancy SEO strategies. We expanded and tweaked. And our own system survived. But
we found out that we're so far behind that it's hard to catch up. Was it worth it?

![Simplificator Front Page in 2019](/images/new_blog_web2019.png)

We did a redesign, mostly to support mobile, and streamlined everything optically. **But then we stopped:**
**Our leads come from connections and people who experienced working with us, rarely through google.** We needed to not
suck on our page, so we don't deter anyone, but even if we would triple our leads from the web site it would contribute
close to nothing to our bottom line. So we focused on other topics. To ease some pain with the blog, we moved it
to WordPress. **A complete admission of defeat.**

Last summer, things started to move again. We changed the way we organize ourselves and how we take decisions (more about
that later). So some of us took initiative and started rewriting, taking the best technologies available
to create a top-of-the-line solution, with deployment pipelines, static rendering, CDN and the best
of all, our blog content is now on GitHub. We can write however we like with the editor of our choice,
issue pull requests for feedback, and publish with a commit. And suddenly, we (or at least I) write blog posts again.

The issue why we procrastinate about stuff like writing blog posts is not the technology. Our habits and what we love to do define what comes easy. Procrastination is often a sign that we strayed away from what we're good at. **We're not procrastinating about what we love to do.** If that is writing code, committing and writing pull requests, let us hook into that.

So now, to write this blog post, I added a file to our repository (which is public on [GitHub](https://github.com/simplificator/simplificator-blog), by the way), **and issued a pull request**. I have asked others to pitch in, and after I took in all the feedback I got, this post will
be merged and published. 

This is a way to make it easy for coders to publish blog posts.

**To have a process like that is not easy to set up. But when it's done it is as it should be: simple.** 

