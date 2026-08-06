---
title: "J-Space Reinforces Why AI Needs an Intention Layer"
description: "Anthropic's global workspace research reinforces a product lesson from building AI systems: users are consistent in what they want, but inconsistent in how they ask."
featuredImage: /img/blog/intention-layer-series/j-space-intention-layer.jpg
slug: j-space-reinforces-why-ai-needs-an-intention-layer
date: Mon Jul 20 2026
series: intention-layer
categories:
  - ai
  - ux
  - ai-agents
  - product-design
  - intention-layer
---

Users are often consistent about what they want and inconsistent about how they ask for it. That is not a criticism of users. It is the normal condition of human communication.

People write quickly, dictate from phones, use shorthand, misspell words, change registers, and assume context the system may or may not have. Some users write in plain English. Others write in the language of their profession. A good AI product should not make output quality depend too heavily on those differences.

Anthropic's recent work on J-space is interesting to me because it gives more shape to a product problem I have seen in practice: the text we send into a model is not a neutral transport layer. It is part of the computation.

## What Anthropic found

Anthropic published research describing **J-space**, a set of internal model representations discovered with a technique called the Jacobian lens. In the paper, the authors argue that these representations act like a global workspace inside Claude. They can be reported, modulated, used for reasoning, and manipulated in experiments.

That is an interpretability result, not a UX prescription. It does not prove that every typo weakens a response, and it does not give product engineers a direct map from prompt wording to internal model behavior.

It does support a more careful claim: wording can matter before the model produces a single visible token. If internal concepts are being activated, used, and sometimes causally involved in reasoning, then the application layer should take input quality seriously.

The user may have a stable goal even when the phrasing is messy. The product should protect that goal from accidental noise.

## Prompt engineering is the wrong abstraction for users

The industry has spent a lot of time teaching people how to prompt. That has been useful, but it is also a sign that the interface is still immature.

Users should not need to understand prompt construction any more than they need to understand query planning before using search. Mature software absorbs the mechanical burden. It does not turn that burden into user training.

For AI products, this means the product should help normalize spelling mistakes, incomplete thoughts, differences in formality, domain jargon, and missing context before the request reaches the downstream model or agent.

The goal is not to rewrite the user's intent. The goal is to express it clearly enough that the system can act on it consistently.

## A production example

While building reporting workflows at Summation, I kept seeing a version of this problem.

Two users could ask for the same sales report in very different ways:

> Can you give me a QBR for my sales team?

> Generate an executive quarterly business review highlighting revenue trends, customer segmentation, pipeline health, risks, and strategic recommendations.

Both users want a quarterly business review. Without careful steering in the product, though, those requests can produce documents with very different structures. The plain-English version may come back as a conversational summary with a few supporting charts. The formal version may come back as a polished executive report with sections, recommendations, and boardroom language.

The business goal did not change. The user's communication style did.

That is a product problem. If one user naturally writes in MBA language and another writes quickly in plain English, the product should not treat that difference as a hidden quality setting.

## Intent normalization

This is where the **Intention Layer** becomes useful. Before the system forwards raw user input to a model, it should ask what the user is actually trying to accomplish.

Once the intent is understood, the product can normalize the request. It might repair obvious spelling mistakes, expand acronyms, resolve ambiguity from prior conversation, detect the expected artifact, infer the audience, apply company terminology, and assemble the context needed by the downstream model.

The user still gets to write naturally. The system takes responsibility for making the work consistent.

Search engines have done versions of this for years. Google's own Search documentation describes systems that correct spelling mistakes, use synonyms, consider location and language, and connect related words to relevant documents. Mature interfaces do not demand perfect input before they become useful.

AI products need the same expectation.

## Designing for intent

An AI application should not have to spend its budget discovering that "rite me a qbr" and "prepare an executive quarterly business review" usually point at the same job. The application should preserve the user's intent while cleaning up the accidental variation around it.

That does not mean flattening every user's voice into the same output. If style is the user's intent, preserve it. If style is incidental, normalize it. The hard part is knowing the difference, and that is exactly why this belongs in product architecture rather than in a generic prompt wrapper.

Anthropic's J-space research is useful here because it reminds us that model behavior has internal structure we do not fully control. Product teams cannot directly manage the model's latent space. They can manage the interface that feeds it.

The Intention Layer is not about making models smarter. It is about making AI products more forgiving, more consistent, and less dependent on whether the user happened to phrase the request in the model's preferred dialect.

## References

- Anthropic, [A global workspace in language models](https://www.anthropic.com/research/global-workspace), published July 6, 2026.
- Gurnee et al., [Verbalizable Representations Form a Global Workspace in Language Models](https://transformer-circuits.pub/2026/workspace/index.html), Transformer Circuits, published July 6, 2026.
- Google Search, [How Search determines context](https://www.google.com/intl/en_us/search/howsearchworks/how-search-works/ranking-results/).
- Google Search Help, [Learn search tips and how results relate to your search on Google](https://support.google.com/websearch/answer/134479).
