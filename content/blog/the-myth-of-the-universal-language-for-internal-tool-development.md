---
title: The Myth of the “Universal Language” for Internal Tool Development
slug: the-myth-of-the-universal-language-for-internal-tool-development
date: Tue Jul 16 2024
categories:
  - prototyping
  - golang
  - programming
  - product-management
  - javascript
---

We've all heard this story before. You finally get buy-in to build a tool that solves your pet peeve. You have a plan figured out, but then your manager says the dreaded phrase, “Use a different language so that others can contribute”… which seldom happens.

![](https://cdn-images-1.medium.com/max/1024/0*FxuhG2fh0HQo6PBX)

Photo by [Kenny Eliason](https://unsplash.com/@neonbrand?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

One common misconception in software development is the idea that choosing a widely known programming language for an internal tool will encourage contributions from the developer community or the open source community. While this may sound logical on the surface, the reality is far more complex and nuanced.

#### The Reality of Contribution Dynamics

**Immediate Team vs. Hypothetical Contributors**

When designing a new tool, the most significant technical stakeholders are usually yourself and your immediate team. The initial development phase requires a champion with deep understanding of the problem space, requirements, and long term vision for the tool. Depending on the org, you may discover it's unrealistic to expect an influx of external contributors to significantly enhance the development process. Oftentimes, the production feature is sticky to an individual engineer, which is doubly true for an internal tool.

It is my belief and experience that internal tools are treated with less scrutiny than production features. You may not need deep knowledge if the pull requests from a co-worker are greeted with a short and sweet “LGTM” within 10 seconds of code review. Functionality is often the only thing that matters with internal tools and their quality can vary greatly. Did the code in that PR really look good? You'll never know until the core maintainer moves on.

**Feature Requests Over Code Contributions**

In open source projects, many developers are enthusiastic about suggesting new features or identifying bugs. However, far fewer are willing to contribute code fixes or new functionalities. This discrepancy arises because suggesting features or reporting bugs requires less time and effort compared to understanding the codebase, setting up the development environment, and implementing changes. It's a lot easier to contribute suggestions than going through the steps of your git repo's CONTRIBUTIONS.MD document.

To manage the influx of feature requests and bug reports, it's crucial to have one or two links out to a robust issue tracking system like Jira or GitHub Issues. This allows you to prioritize tasks, track progress, and communicate effectively with users and potential contributors. However, even with such systems in place, the burden of development and maintenance still largely falls on the core team.

#### The Flexibility of Good Engineers

From observations over the years, a motivated and skilled engineer can usually learn a new language or framework within a few months. As a result, selecting a language purely based on perceived popularity or ease of contribution can be misguided. As the saying goes, focus on choosing the right tool for the job. If the lead engineer of the tool has familiarity with a language and the ecosystem contains packages that support the initiative, it makes that technology an obvious choice.

For example, while you can make a webserver in multiple languages, consider a scenario where your tool requires extensive string processing. If you choose JavaScript and express.js for its popularity, you might face performance bottlenecks when handling large datasets. A more efficient language like Golang or C++ could be better suited for your task. On the other hand if your internal tool is a standalone Chrome extension, writing the entire tool in Golang or C++ would present more headaches than coding with JavaScript.

#### The Pitfalls of Misguided Tool Choices

Starting a new tool with inherent bottlenecks can lead to several issues:

-   **Performance Issues:** If the chosen language or framework is not well-suited for the task, you may encounter significant performance limitations, leading to user dissatisfaction and increased maintenance workload.
-   **Complexity in Refactoring:** If performance becomes a critical issue, refactoring the tool into a more appropriate language or framework can be time consuming and complex.
-   **Development Delays:** Spending time accommodating a language that isn't optimal for your needs can slow down the initial development process.

#### Documentation and Architecture: The True Enablers

I believe the best engineers focus their efforts on creating comprehensive documentation with clear architectural design. Detailed documentation helps scale new contributors by helping them understand how to use the tool, the codebase, rapidly set up their development environment, and follow best practices. This also ensures you can quickly onboard new teammates.

A well defined architecture ensures the tool remains scalable and maintainable as it evolves over time. Clear documentation and architecture diagrams help communicate the vision and structure of the tool, making collaboration more efficient. Who doesn't like a good diagram?

Next time you develop a new internal tool, don't be afraid to defend your tech choices. A programming language doesn't guarantee contributions or thorough reviews. Focus on performance, scalability, and creating concise documentation. Prioritize practical decisions over popularity to build robust, efficient tools ready for real world challenges.

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=314f66d0306c)

- - -

[The Myth of the “Universal Language” for Internal Tool Development](https://javascript.plainenglish.io/the-myth-of-the-universal-language-for-internal-tool-development-314f66d0306c) was originally published in [JavaScript in Plain English](https://javascript.plainenglish.io) on Medium, where people are continuing the conversation by highlighting and responding to this story.
