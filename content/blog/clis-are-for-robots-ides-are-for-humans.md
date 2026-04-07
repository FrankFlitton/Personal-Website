---
title: "CLIs Are for Robots, IDEs Are for Humans"
description: "A mental model for agentic coding workflows: where machines execute, where humans judge, and why keeping that distinction sharp makes everything work better."
featuredImage: https://images.unsplash.com/photo-1626732837545-107a241ded38
slug: clis-are-for-robots-ides-are-for-humans
date: Mon Apr 06 2026
categories:
  - ai
  - agentic-coding
  - developer-experience
  - software-development
---

CLIs are for robots, IDEs are for humans. That's the mental model I keep coming back to when thinking about agentic coding. Agents do their best work in text and terminal space, executing, iterating, grinding through boilerplate. Humans do their best work from within the editor, reading, judging, reshaping. The workflow clicks when you stop treating those two things as the same surface. The brief friction of those two modes of creation being separated provides a much needed brief boundary for clarity and reflection. 

## Agentic coding as delegated execution

The way I think about it: agents handle the groundwork for a new feature, planning a script for repetitive changes, or taking that first stab at a problem. I prompt them the way I'd hand off a task to an intern or junior engineer. It is high leverage, but I review the output before it goes anywhere. The shift is moving your attention up a level. You're thinking about approach, structure, and intent rather than which keys to press.

## The IDE as the decision-making surface

The editor is where humans are strongest, so that's where review lives. Diff views, refactors, and jump-to-definition exist because reading and navigating code is a human problem. I want to be reading, reshaping, and rejecting agent changes before they become committed history. Lending a careful eye to data flow and data structure keeps the paralell contributions on track. 

Natural language becomes code in the terminal. Whether it stays as code gets decided in the IDE.

## Tests as behavior contracts

Tests keep agent output from becoming a black box. We want high quality software not user facing regressions. I'm not using them just to verify correctness, I'm using them to document what the system is supposed to do, independent of how it does it. That unlocks a clean TDD-style loop: the agent generates, the tests define truth, and I refine. As long as the tests pass, I can optimize or rewrite freely. The implementation becomes a detail.

## Git worktrees and stacked PRs for multi-agent workflows

Git worktrees are great. Worktrees let me run multiple agents on isolated features at the same time without them stepping on each other. It allows PRs to remain focused and reviewable. Each agent gets its own branch and its own context. 

Stacked PRs keep the changes organized for peer review, large work stays incremental instead of landing as one undiffable blob. You can scale up experimentation without losing the discipline of actually reviewing what you're shipping.

## The /docs folder as shared memory

I keep a `/docs` folder in the repo, not in Notion or Jira. I find the file system accessible documentation helpful in ways that feature `agent.md` files aren't. These md files include architecture decisions, trade-offs, system explanations — all of it lives next to the code. Agents can read it like a README when they search for keywords related to the task at hand. So can I, six weeks later. It cuts down on repeated explanations and the prompt drift that builds up over long sessions when the agent loses thread on why things are structured the way they are. Tribal knowledge is preserved and activly used.

## Closing the loop: having agents update their own docs
After a significant change, especially if I've corrected a repeated mistake from the coding LLM harnes or changed direction, I have the agent update the relevant documentation. It ends up writing explanations for itself as much as for future humans. That's the point. Keeping the architectural context fresh and actually aligned with the codebase is the part that usually falls apart first.


## Pitfall: LLMs are mirrors

The agent reflects your language, your tone, and your level of precision back at you. Vague prompts produce vague code. Casual language leads to casual structure. If you're working through a data-heavy problem, you need to be explicit about data models and algorithms upfront. If the task is UI/UX-heavy, design and interaction terms matter. The quality of what comes out is proportional to the clarity of what goes in. That one takes a while to really internalize after some experimenation. Asking for the same output role playing as a leetcode question author vs an art student will yield results that are a world apart.

## Wrapping up

Agentic coding scales execution, not responsibility. You still own correctness, intent, and taste. The workflow holds up because it's honest about where machines are strong and where people need to stay in the loop and it does not try to blur that line.
