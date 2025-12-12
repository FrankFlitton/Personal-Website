---
title: "A Practical Pattern for Hydrating AI-Generated Object Templates"
description: "How I hydrate server-side LLM templates with client constants and API data using a queue-based pattern."
featuredImage: https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200
slug: a-practical-pattern-for-hydrating-ai-generated-object-templates
date: Fri Dec 12 2024
categories:
  - javascript
  - typescript
  - algorithms
  - data-structures
  - software-development
---

When you need to traverse a JavaScript object, what's your first instinct? If you're like most developers, you reach for recursion. Call a function, check if it's an object, call the function again on each property. It works, it's intuitive, and it's what everyone does.

But there's another way. One that gives you more control, better memory predictability, and clearer logic: breadth-first search using a queue.

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

The LLM uses placeholder strings like `"NEGATIVE_SERIES"` and `"NEGATIVE_COLOR"` because it can't know your actual color scheme or series names ahead of time. Now you need to walk through this deeply nested config object and replace every instance of these placeholders with real values.

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

Clean, right? But here's what you're actually doing: pushing function calls onto the call stack for every nested level. If your object is deeply nested enough, you'll hit stack overflow errors. And even if you don't, you're consuming stack memory in a way that's hard to predict or control.

Plus, what if you want to limit the depth of your search? Or process nodes level-by-level? Or exit early once you've found what you need? Suddenly, that elegant recursion gets messy fast.

## Enter Breadth-First Search

Breadth-first search processes data structures level by level. Instead of diving deep immediately like DFS, BFS explores all nodes at the current depth before moving deeper.

For object traversal, this means using a queue instead of the call stack. You start by adding all top-level properties to the queue, then process them one by one. When you encounter a nested object, you add its properties to the back of the queue. The result? You traverse the entire structure without a single recursive call.

Here's the key: the queue gives you explicit control. You can see exactly what's being processed, in what order, and you can modify that behavior without fighting against recursion's implicit call stack.

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

## Keep It Simple

The beauty of BFS for object traversal isn't that it's clever—it's that it's explicit. You see the queue, you see the loop, you see exactly what's happening. No magic, no hidden call stack, no surprises.

Next time you reach for recursion to traverse an object, pause. Ask if a queue would give you better control. More often than not, it will.

## TL;DR

- Object traversal doesn't have to be recursive
- BFS uses a queue to process level-by-level
- Better memory predictability than DFS recursion
- Ideal for large nested structures and transformations
- Easy to add depth control or early exit logic
- Use DFS for tree hierarchies, BFS for data transformations
- Explicit control beats implicit call stack
