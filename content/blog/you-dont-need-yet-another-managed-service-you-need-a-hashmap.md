---
title: Caching Isn’t a SaaS Product, It’s a Data Structure
featuredImage: https://cdn-images-1.medium.com/fit/c/150/150/1*jOrHcxnaCz9ns2y3qscXhw.jpeg
description: The industry won’t tell you this, but a hashmap does 90% of what you need
slug: you-dont-need-yet-another-managed-service-you-need-a-hashmap
date: Mon Feb 17 2025
categories:
  - typescript
  - fintech
  - javascript
  - algorithms
  - software-development
---

The other day, I witnessed something painful that happens way too often: I watched a developer struggle through a problem that would have been a slam dunk for a hashmap. Instead of using the right tool they went full exponential mode, looping through an ordered array like leetcode never existed. And when I brought up caching the result? They talked about it like it’s something you integrate from a vendor, not just a hashmap in their service’s search method.

Why is it that developers think a cache has to be a vendor product? Why is “we need caching” immediately followed by “let’s pay AWS money” instead of “let’s use a hashmap and move on with our lives”? You don’t need some heavyweight distributed cache just to handle burstiness, deduplicate events, or enforce uniqueness. You just need to understand your data structures.

An LRU is the FIFO of caches and it needs a hashmap (or a Dict for the Python people reading).

### The “Cache as a Service” Fallacy

Caching isn’t a SaaS product, it’s a pattern. If you need a globally distributed, highly available cache, sure — buy something off the shelf. But if you’re just trying to optimize inside a single service, why are you reaching for Redis? Why not just… use a hashmap?

Need to control burstiness? Hashmap. Need quick lookups? Hashmap. Need to deduplicate requests? Hashmap.

Half the time, you don’t need a distributed cache, you need **basic computer science knowledge**.

### LLMs Are Making This Worse

Now, with AI-assisted coding, I’m seeing this mindset even more. Developers are generating code fast, but they’re skipping the part where they actually **understand** it. LLMs don’t care about the best solution, they care about the most generic solution. And guess what’s generic? “Oh, you need a cache? Let’s add Redis.” Meanwhile, the correct answer was just a hashmap the whole time.

If you can’t recognize when to use a hashmap instead of a cache product, you’re not “saving time” — you’re making your system unnecessarily complex. And for what? So you can say you’re “leveraging managed services” while your simple API call now has an external dependency for no reason?

If you’re going to reach for a SaaS in an interview, you’d better be able to explain exactly where it fits in your architecture and why it’s necessary — otherwise, you’re just cargo-culting it.

### Interviewing? Make Sure You Understand Caching

If you’re in a coding interview, at least know what you’re doing when it comes to caching. Even if you give a naive solution, you should be able to follow up with, “Here’s why a hashmap would be a better fit.” Show that you understand the trade-offs.

This isn’t about trick questions — it’s about understanding that sometimes the best solution is the simplest one. If you reach for Redis when a hashmap would do you’re not “scaling your system,” you’re overcomplicating it.

### Wrapping Up — Build Skillful Software

Before you slap a cache product into your stack, ask yourself: **Do I really need this?** Will a hashmap or an in-memory structure solve the problem just as well? More often than not, yes, it will.

Stop treating caching like a SaaS product and start treating it like a problem you actually have to think about. Writing good software isn’t about adding more tools — it’s about knowing when you don’t need them.
