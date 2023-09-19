---
title: "Story Time with ChatGPT: SOLID principles"
date: 2023-09-19
language: en
author: Lukas Eppler
tags:
  - chatgpt
  - story-time
  - solid
  - kiss
  - dry
  - yagni
---

## A chat with ChatGPT

**Apart from what Lukas says, all content is auto-generated, using a introductory prompt describing Simplificator and their employees.**



**Lukas:** Tiziano, Florian - what are some good design principles to use in software development?

*Tiziano leans back in his ergonomic chair, stroking his beard thoughtfully. He's wearing a navy blue polo shirt and grey chinos, a pair of stylish, noise-cancelling headphones hanging around his neck.*

**Tiziano:** Well, you can never go wrong with SOLID principles. They're the foundation of good object-oriented design and are crucial for making a system that's easy to maintain and scale.

*Florian, seated nearby, looks up from his triple-monitor setup where he's deep into coding. He's in a relaxed grey hoodie and jeans, a mechanical keyboard beneath his fingers.*

**Florian:** True, SOLID is key. But let's not forget about DRY---Don't Repeat Yourself. Reusable code makes everyone's life easier.

*Tiziano nods in agreement.*

**Tiziano:** Absolutely. And while we're on the topic, KISS---Keep It Simple, Stupid---is another principle I swear by. Overcomplicating things just makes it harder for everyone in the long run.

*Florian smiles and taps a few keys, pushing his code changes.*

**Florian:** Yup, and let's not forget YAGNI---You Aren't Gonna Need It. Focus on what's needed now rather than overengineering for the future.

*Tiziano and Florian exchange a look, both appreciating the harmony of their perspectives.*

**Tiziano:** So, SOLID, DRY, KISS, and YAGNI. Stick to these, and you're on the right path to building robust, maintainable software.

**Florian:** Couldn't have said it better myself.

**Lukas** grins, "ok ok but what does it mean? Can I have it as do's and dont's?

*Tiziano and Florian share a glance, picking up on the enthusiasm. Tiziano rolls his chair closer to his desk, positioning himself in front of a whiteboard filled with diagrams and code snippets.*

**Tiziano:** Alright, let's break it down:

**Do's:**

1.  **SOLID**: *Do* design classes to be Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion compliant.
2.  **DRY**: *Do* create reusable functions or modules for repetitive code.
3.  **KISS**: *Do* aim for simplicity and straightforwardness in code.
4.  **YAGNI**: *Do* focus on requirements at hand, not on what might be needed in the future.

*Florian interjects, clicking away from his screen to add his two cents.*

Florian: And for the **Don'ts:**

1.  **SOLID**: *Don't* mix multiple responsibilities within a single class or module.
2.  **DRY**: *Don't* copy-paste code; it's a maintenance nightmare.
3.  **KISS**: *Don't* overcomplicate by adding features you don't need.
4.  **YAGNI**: *Don't* add functionality until it's actually required.

*Tiziano caps the whiteboard marker and places it back on the tray.*

Tiziano: Following these principles helps us write clean, maintainable code, which in turn makes it easier to build upon and adapt in the future.

*Florian gives a nod of agreement, his eyes glancing back to his monitors as notifications ping.*

**Florian:** Exactly. When everyone on the team understands these principles, we can work more efficiently and create software that stands the test of time.

*Both Tiziano and Florian look towards you, pleased with their distilled wisdom, ready to take the next steps in crafting excellent software.*

**Lukas:** Ok, that's great but still a bit abstract. Especially the SOLID stuff. What are some concrete examples for those principles?

*Tiziano grins and turns back to the whiteboard, uncapping a green marker this time. Florian pauses his coding, swiveling his chair towards Tiziano to chime in when needed.*

**Tiziano:** Fair enough, let's make this concrete. We'll take a simple example of a `Car` class and try to illustrate SOLID principles with it.

**1\. Single Responsibility Principle (SRP):**

-   **Do**: Have a class do only one job. For example, a `Car` class should only manage car-related logic.
-   **Don't**: Mix responsibilities like having the `Car` class handle both car operations and, say, fuel calculations.

**2\. Open/Closed Principle (OCP):**

-   **Do**: Design your class to be open for extension but closed for modification. For instance, if you want to add electric cars, create a subclass rather than altering the existing `Car` class.
-   **Don't**: Modify the `Car` class each time you need new functionality.

*Florian takes over, eager to dive into the details.*

**Florian:** Now for the next ones.

**3\. Liskov Substitution Principle (LSP):**

-   **Do**: Make sure a subclass can be used wherever the parent class is used. If there's an `ElectricCar` subclass, it should fit in wherever `Car` is used.
-   **Don't**: Override methods in a way that breaks functionality or assumptions of the parent class.

**4\. Interface Segregation Principle (ISP):**

-   **Do**: Create small, specific interfaces. If a `Car` can be charged, there should be a separate `Chargeable` interface.
-   **Don't**: Have a monolithic interface with methods that not all classes implementing it can use.

*As Florian finishes, Tiziano adds the final touch.*

**Tiziano:** Last but not least,

**5\. Dependency Inversion Principle (DIP):**

-   **Do**: Depend on abstractions, not on concrete implementations. For example, a `Driver` class should depend on a `Vehicle` interface, not a specific `Car` class.
-   **Don't**: Hardwire dependencies into your classes.

*Tiziano steps back, admiring the organized chaos now decorating the whiteboard.*

**Tiziano:** These are guidelines for creating robust software, but remember, principles aren't laws. The key is to know when and how to apply them effectively.

*Florian nods, seemingly satisfied with the deep dive into SOLID principles.*

**Florian:** Yeah, context matters. Understanding these principles lets us make more informed decisions when coding, but we have to be flexible too.

*Both Tiziano and Florian look towards you, hopeful that the concrete examples will help bring the abstract principles into focus.*

**Lukas:** Miriam, clear?

*Miriam, who has been eavesdropping from her open-concept desk while juggling between HR paperwork and marketing analytics, glances up. She's wearing a chic black blazer over a vibrant red top, her laptop displaying multiple spreadsheets.*

**Miriam:** Absolutely, the SOLID principles make a lot more sense with those examples. This kind of foundational understanding will help not just in coding, but in explaining our approach to potential clients and stakeholders. It makes our commitment to quality and adaptability really tangible.

*She smiles, making a mental note to incorporate this newfound understanding into future marketing materials and client conversations.*

**Miriam:** Anything else you guys think should be added to our internal or client-facing docs on software development best practices?

*Tiziano and Florian share a quick look, appreciating how Miriam instantly bridges the gap between technical and business perspectives.*

**Lukas:** Very nice. I'm tempted to publish this on LinkedIn.

*Miriam's eyes light up, sensing a valuable opportunity for brand visibility and thought leadership. She closes her laptop and stands up, smoothing down her blazer.*

**Miriam:** That's a fantastic idea! Sharing our expertise and insights on LinkedIn can position us as industry leaders. It not only attracts potential clients but also top-notch talent who align with our values and approach.

*Tiziano nods, already thinking about how to make the content engaging.*

**Tiziano:** If we're going that route, we should consider making it a series. You know, "Understanding SOLID: A Guide to Excellence in Software Development," or something catchy like that.

*Florian chimes in, his eyes still on the code but his attention fully in the conversation.*

**Florian:** And we could supplement it with real-world examples or case studies to show these principles in action. Could make it a collaborative effort across departments.

*Miriam quickly jots down the ideas on her notepad, already envisioning the layout and reach of the LinkedIn posts.*

**Miriam:** Excellent suggestions. I'll start drafting the first post and coordinating with you guys for technical accuracy. Once we're happy with it, we can schedule it for publication.

*All three share a moment of collective enthusiasm, fully aware that this initiative has the potential to propel the company's reputation to new heights.*
