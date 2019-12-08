---
title: "Dare to question"
date: 2015-02-12
---

#### We had a problem.

Let me call it Project X. We were six months behind. Requirements Creep resulted in enormous methods, bloated controllers, a test coverage below the belt and still no clear plan of finishing. We worked a year on the thing, it has been close to finished for months now, but it wasn't coming together. We had a problem.

![Screen Shot 2015-02-05 at 6.03.28 pm](https://simplificators.files.wordpress.com/2015/02/screen-shot-2015-02-05-at-6-03-28-pm.png?w=300)

Wasn’t it cool in the old days, **when we were the wizards**, the magicians - where just the fact that we were able to create a simple calculating form or create a script saving someone two days of busywork per week? They trusted us when we said, _it is going to take three weeks to implement it_. If you understood how to “fix a computer” by finding the loose cable connector on the keyboard. When running a defragmentation tool made your uncle feel like he bought a brand new machine.

It’s no longer like that. **Writing software is not so magical anymore**, it’s a craft. We know what we do, and we’re appreciated for it. But things have to get done. The customer is king again. We’re constantly struggling in the space between what the customer wants and what we _know_ is the right thing. We learned a while ago that wearing a hoodie and carrying a sticker-infested laptop to a board meeting doesn’t automatically raise their respect for us. We learned to listen. We learned to learn each customer’s language, to better understand, to better craft what’s needed.

**On the other hand, we still _feel_ like wizards.** We know what works, and don't want to waste our precious time with dull decoration. We want our effort limited to a minimum, working on the ambitious adventure, the principal puzzle, the real riddle. The cool stuff. Let’s write the simplest thing that can possibly work. You want more? You Ain’t Gonna Need It (YAGNI™). Because an apparently simple request might lead to days of unforeseen work, which might even go unpaid because its complexity never got onto any offer.

So we grew an **instinct to say no**, to approach a request with a certain defensive attitude. A feature has to pass a threshold first: Is it really needed?

But then, the customer actually pays for what we do, so saying no doesn’t fly well with them. We apparently need a different attitude.

We had a routine importing data which needed almost a day to run, and one wrongly formatted element in the source data would knock the process out. We added and tweaked, only to find the next edge case… we dearly wanted to exclude those edge cases, but many were still essential.

#### What was going wrong? What was the problem behind the problem?

Complexity is not value. But neither is simplicity as such. We are trained to write what’s needed, in budget, and on time. Those constraints are natural. We coders have experienced many situations where broken business models resulted in hopeless strategies, which turned into convoluted requirements. Sometimes we call it “design by committee”, where the results of a brainstorming session is translated into demands full of contradictions, wishful thinking and pies in the sky. After the session, several people “flesh out” the requirements, and the input of all participants is gathered, but never questioned.

**Now try to write good code with that.** We try to manage upwards, trying to filter what should never have made it into requirements.

Hence, the first draft of our company values had the line “dare to say no”.

“Dare to say no” at least tames the devil of blindly implementing what’s requested, only to find the contradictions at the very end where ideas meet reality, when bugs show up stemming from the bad design decisions above. Code is honest, code is pure. There is no handwaving, no "maybes" in code, no “mostly” or “generally” - come with unfinished ideas and you will be mercilessly punished. The wall of logic can’t be broken with sheer will, you’ll be crushed between requirements and feasibility.

But saying no doesn’t give you good code.

And Project X wasn’t finished. We saw it ourselves. We had something which worked, and somehow fulfilled requirements. But it didn’t feel right. It felt buggy and convoluted. It looked the part… We needed a reboot.

#### Reboot

“Dare to say no” apparently needed a reboot too. We worked on that line. And we found out what we meant by it. We wanted to be able to work on all levels of software to find the right solutions. We needed to be able to address the first decisions. Those which lead to the requirements causing trouble.

Mind you, this happens anyway - at the latest, when broken code goes in production. At this point, even the people who brainstormed the ideas will see the contradictions, because they’re now glaringly obvious. Only now the important questions get asked. Can’t we get to that knowledge earlier?

We can. It requires courage to show the contradictions, the unfinished thoughts. It requires tact and skill to identify the core requirements which clash, and talk about them. It requires a lot of guts to ask fundamental questions.

Invigorated, we addressed Project X with new energy. We started with tidying up the code. Where weird requirements held us up, we went back to the customer and asked why they wanted a certain feature, why it had to be like that. The pruning and culling resulted in a much more streamlined user experience, clean code, and somewhat to our surprise, a greatly improved relationship with the customer.

Our value became “_dare to question._” Ask why, understand the answer - or ask why again. Get to the bottom of it. Find the need behind the need. Throw away what’s not necessary, make it clean - with the full understanding of the requirement.

The project is live now. We have more work coming.

Maybe we can still be wizards. We just have to learn the new magic.

**Dare to question.**
