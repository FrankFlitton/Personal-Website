---
title: "A Practical Pattern for Hydrating AI-Generated Object Templates"
description: "How I hydrate server-side LLM templates with client constants and API data using a queue-based pattern."
featuredImage: https://images.unsplash.com/photo-1711831521065-e546a5aca68e
slug: a-practical-pattern-for-hydrating-ai-generated-object-templates
date: Fri Dec 12 2025
categories:
  - ai
  - javascript
  - typescript
  - algorithms
  - software-architecture
---

LLMs produce structured output. You save it to a database, ship it to a client, and render it. The problem is that some values in that structure cannot be known at generation time. Colors derived from a gradient based on live data. A user's first and last name. A preference pulled from your database at runtime. If you burn those values into the LLM output, you lose the ability to update them without regenerating everything.

The better pattern is to treat LLM-generated objects as templates. The LLM emits placeholder strings where dynamic values belong. At runtime, you walk the structure and hydrate those placeholders with real data. This separates generation from rendering, gives you a clean migration path when values change, and keeps the LLM output stable in your database regardless of what the runtime context looks like.

The traversal problem that unlocks this pattern is simpler than it sounds, and the right tool for it is not recursion.

## The Problem: LLM-Generated Chart Configs

Here's a real scenario I ran into: using an LLM to generate Highcharts configurations. The LLM outputs something like this:

```javascript
{
  series: [
    { name: "NEGATIVE_SERIES", data: [1, 2, 3] },
    { name: "POSITIVE_SERIES", data: [4, 5, 6] }
  ],
  colors: ["NEGATIVE_COLOR", "POSITIVE_COLOR"],
  plotOptions: {
    series: {
      marker: {
        fillColor: "NEGATIVE_COLOR"
      }
    }
  }
}
```

The LLM uses placeholder strings like `"NEGATIVE_SERIES"` and `"NEGATIVE_COLOR"` because it can't know your actual color scheme or series names ahead of time. In certain contexts, the obvious red or green hex codes may be too harsh or a brand warm and cool scheme may apply. 

You could try a simple `JSON.stringify` → replace → `JSON.parse` approach, but that's brittle and can break with special characters or circular references. Or you could write a recursive function... but we've all seen where that leads.

The recursive approach looks elegant at first:

```javascript
function recursiveReplace(obj, target, replacement) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(target, replacement);
    } else if (typeof obj[key] === 'object') {
      recursiveReplace(obj[key], target, replacement);
    }
  }
}
```

Clean, right? But process nodes level-by-level? Or exit early once you've found what you need? Suddenly, that elegant recursion gets messy fast.

## Enter Breadth-First Search

Breadth-first search processes data structures level by level. Instead of diving deep immediately like DFS, BFS explores all nodes at the current depth before moving deeper.

For object traversal, this means using a queue instead of the call stack. You start by adding all top-level properties to the queue, then process them one by one. When you encounter a nested object, you add its properties to the back of the queue. The result? You traverse the entire structure without a single recursive call.

The queue gives you explicit control. You can see exactly what's being processed, in what order, and you can modify that behavior to have additional business logic without fighting against recursion's implicit call stack.

## A Real Implementation

Here's a practical example: a function that finds and replaces a target string in every string property throughout an object, no matter how deeply nested:

```typescript
/**
 * Performs a breadth-first search on any JavaScript object to find and replace a target string
 * with a new value in all string properties.
 */
function objectStringReplace(obj: any, target: string, replacement: string): number {
    if (!obj || typeof obj !== "object") {
        return 0;
    }

    let replacementCount = 0;
    const queue: Array<{ key: string | number; value: any; parent: any }> = [];

    // Start by adding all top-level properties to the queue
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            queue.push({ key, value: obj[key], parent: obj });
        }
    }

    // If it's an array, also add all items
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            queue.push({ key: i, value: obj[i], parent: obj });
        }
    }

    while (queue.length > 0) {
        const { key, value, parent } = queue.shift()!;

        if (typeof value === "string") {
            // Check if the string contains the target
            if (value.includes(target)) {
                const newValue = value.replace(new RegExp(escapeRegExp(target), "g"), replacement);
                const occurrences = (value.match(new RegExp(escapeRegExp(target), "g")) || []).length;
                replacementCount += occurrences;

                // Update the value in the parent object
                parent[key] = newValue;
            }
        } else if (value !== null && typeof value === "object") {
            // Traverse object properties
            for (const childKey in value) {
                if (Object.prototype.hasOwnProperty.call(value, childKey)) {
                    queue.push({ key: childKey, value: value[childKey], parent: value });
                }
            }

            // Traverse array items
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    queue.push({ key: i, value: value[i], parent: value });
                }
            }
        }
    }

    return replacementCount;
}

function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
```

Let's break down what makes this work:

**The Queue Structure**: Each queue item stores three things: the key being processed, its value, and a reference to its parent. This lets us mutate values in place without losing track of where they belong.

**Initialization**: We start by pushing all top-level properties onto the queue. If the root is an array, we also add all array indices. This ensures we don't miss anything.

**The While Loop**: As long as there are items in the queue, we shift one off the front. If it's a string, we do our replacement. If it's an object or array, we add all its children to the queue. The loop continues until every node has been processed.

**No Recursion**: Not a single recursive call. The call stack stays flat. Memory usage is proportional to the width of your data structure at its widest level, not its depth.

## Why This Pattern Works

The BFS approach solves several problems at once:

With recursion, you're at the mercy of the call stack. With a queue, you control exactly what's in memory. You can even implement queue size limits if needed. Or maybe we want to to track depth? Add a depth counter to each queue item. Want to stop after processing N items? Just break the loop. Want to skip certain branches? Don't add them to the queue. The pattern accommodates these changes naturally.

If you're dealing with deeply nested JSON from an API, a massive config object, or generated data structures, BFS won't blow your stack. It just keeps chugging through the queue enabling counting or incrementing logic. You can log every item as it comes off the queue. You can inspect the queue's contents at any point. With recursion, you're stuck trying to follow a call stack that's constantly changing.

## The Bigger Picture: User-Generated Documents at Scale

The Highcharts example is compact, but the same problem shows up at much larger scale when LLMs are helping users generate structured documents. Think of a financial analyst building a client report. The document has a defined shape: portfolio summary, performance commentary, benchmark comparisons, risk flags, forward-looking disclosures. An LLM can produce a well-formed template that is correct in structure and tone, but it cannot know the client's actual holdings, the current quarter's return figures, or the benchmark that applies to their specific mandate until that data is resolved at render time.

If those values are burned into the LLM output at generation time, the document is immediately coupled to a single snapshot. When the client's portfolio changes, or the quarter closes, or the benchmark shifts, the stored document is wrong and you have no clean way to update it short of regenerating everything.

The template pattern solves this. The LLM generates a document object where dynamic slots are explicit placeholders: `CLIENT_NAME`, `PORTFOLIO_RETURN_YTD`, `BENCHMARK_LABEL`. The document is stored as a template. At render time, the BFS traversal walks the structure and hydrates every placeholder with values pulled from your data layer, whether that is a live API, a user's saved preferences, or computed values derived from the current dataset. The stored LLM output becomes a templated and versioned artifact. The rendered output becomes a function of that template and the state of your data at the moment of rendering on the client.

This is the migration path that burning in values prevents. You can update a client record, refresh performance figures, or swap a benchmark definition without touching the template. You can audit exactly what a rendered document looked like at any point by replaying the hydration against the values that existed then. The LLM's contribution stays in the template layer, where it belongs, and the live data stays in the data layer. Everything in it's place.
