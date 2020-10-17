---
title: "EuRuKo Sofia 2016: My first Ruby Conference"
date: 2016-10-24
language: en
author: Marion Schleifer
---

I was really excited to go to EuRuKo 2016, because it was the first time for me to attend an event such as this. The conference was on Friday and on Saturday, and we arrived on Thursday morning to discover Sofia. As it turned out, the city is quite small, so a few hours were enough to do so. We then ran into some other Swiss guys who attended the conference (Pascal among them) and when they were talking about past conferences, I really couldn't wait anymore for the next day.

The EuRuKo started with the key note of Matz. He talked about the Ruby community and about how Ruby is designed to make programmers happy. He wants to keep the core features from Ruby, while at the same time keeping up with the development of the technologies and the needs of the programmers. "I don't want the Ruby community to be dead. I want it to keep moving forward!", he said. He also spent some time talking about Ruby 3 and its incredible new features (like partial type inference, called "duck typing"), and then finished off by saying that we will not get it for some years :-).

{% image "./content/images/matz_euruko_2016.jpg", "matz_euruko_2016" %}

Another talk that I really liked was "Little Snippets" from Xavier Noria. He showed real code examples that are often used in practice, and their much simpler and more readable counterparts. This was especially great for me as a junior developer, because I didn't know about some of these easier way to write code. When seeing it, it makes total sense. For example, he mentioned the order of code snippets really matters. If you write it the same order that your brain logically conceives it, another person can read it in one flow, and will understand it right away. Here is an example:

```ruby
attr_reader :deleted_at
attr_reader :created_at
attr_reader :updated_at
```

This order doesn't really make sense, if you think about the natural flow of a project. Normally, you first create an instance of a class. Later you might update it, and finally, you might delete it. Therefore, this code snippet should really look like this:

```ruby
attr_reader :created_at
attr_reader :updated_at
attr_reader :deleted_at
```

You might say this is a detail. But we should write code the way our brains can conceive it as natural. This also makes it easier if another person has to work on or maintain the code we wrote.

The official party of the conference was on Friday, and it was absolutely great. I met so many new people from different countries and everybody was so nice. I then understood what many people have told me before: the Ruby community is an exceptional one. Later, there was a vote about where the EuRuKo should be hosted in 2017. It was a close call between Rome and Budapest. In the end, Budapest got the most votes. So I will of course be there in 2017.

On Saturday, there was a talk about "The consequences of an Insightful Algorithm" by Carina C. Zona that really touched me. She talked about the consequences an algorithm can have on a person's life. One example was a story about a large online shop that sent promotion mail about pregnancy products to a young woman. Her father was shocked and called the online shop, complaining that they sent mail like this to his daughter. Some days later, he called again, apologising to them, because his daughter was indeed pregnant. Carina discussed about the difficulty of how far data collection should go and to which extent it is morally defensible to use it in order to make profit. Her talk can be viewed at this link: [Carina C. Zona: Consequences of an Insightful Algorithm | JSConf EU 2015](https://www.youtube.com/watch?v=znwWYR1mzzw)

{% image "./content/images/ruby_together.png", "ruby_together" %}

There was another talk on Saturday by André Arko that made me think a lot. He was talking about [Ruby Together](https://rubytogether.org/) and how their last year was. At Ruby Together, they maintain the Ruby infrastructure, such as Bundler and RubyGems. André said that they lack volunteers to help working on the maintenance, as well as funds to pay professional developers to do so. He told the following story: the RubyGems site was down and a lot of developers contacted him, saying that they would be willing to help getting it up again. Once everything was back to normal, he contacted these people, asking them if they would be willing to help with the general maintenance. Zero of these people agreed to do so. This was really surprising to me. We all need the technologies to work, but I guess also in our free time. People tend to take these things for granted. However, the infrastructure doesn't maintain itself. I knew that Simplificator already supports Ruby Together, and I then decided to do so too, as a private person. It costs $40 each month and I think that is not too much, considering that I use these technologies every day. Please consider making a contribution too!

The two conference days were over pretty quickly, and I am very happy to have met so many new and interesting people. I am already looking forward to the [RubyDay](http://www.rubyday.it/) in Florence at the end of November. And of course, I will also be at EuRuKo 2017 in Budapest next year.
