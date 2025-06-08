---
title: "Treat Your Chart Like MVVM: Client-Side ETL for Better Visualizations"
description: Learn how to build better data visualizations by treating charts like MVVM components with proper client-side ETL pipelines. Stop fighting your charting libraries and start feeding them clean, predictable data.
featuredImage: /img/blog/effective-charting.jpg
slug: treat-your-chart-like-mvvm-client-side-etl-for-better-visualizations
date: Sun Jun 08 2025
categories:
  - data-visualization
  - javascript
  - react
  - frontend-architecture
  - data-processing
---

Most frontend charting problems boil down to this: dirty data goes in, janky chart comes out. Developers assume the charting library will "handle it." It won't.

A chart is a view, just like anything else in your UI. So treat it like one. That means giving it clean, predictable data using ETL concepts: Extract, Transform, Load but adapted for the client side.

Here's how to stop fighting your charts and start feeding them data they can actually use.

## Step 1: Load the Data

Start by pulling in your data from an API call, local file, doesn't matter. What does matter is that you assume it might be empty, partial, or just plain broken.

Use `useMemo` to avoid rerunning transformations every render. Always guard against nulls. And design your components to render something even when there's no data. A chart with no values shouldn't crash your app. It should just be… empty.

## Step 2: Normalize It

Once loaded, normalize the data immediately. That means:

- **Check if it's empty.** If so, return an empty array or fill with defaults like zeros or nulls (depending on what your chart expects).
- **If it's a time series, make sure every expected timestamp is present** even if it's just a zero or null. Fill gaps deliberately.
- **Group by whatever granularity your chart uses**: day, hour, minute. Sort it so downstream logic isn't fighting the order later.

This step makes sure your data has a consistent shape. Don't leave that to the charting library to figure out.

## Step 3: Post-Process

Here's where you enrich the data with things your chart will need.

Compute the min and max values—ideally during the sort pass to avoid extra loops. Calculate quartiles, outliers, or any custom buckets. Generate color values if you're building heatmaps or conditional styling. Format labels for human readability. Clamp values if needed for consistent axes.

But here's the key: **do not mutate your original numbers**. Keep raw values intact (e.g., 64-bit floats), and apply formatting right before rendering. Display should be human-friendly; data should stay precise.

## Step 4: Render the Chart

Now the data is clean, enriched, and ready to go. This is when you finally hand it off to the charting library. Feed in your finalized dataset. Set axes explicitly using your computed min/max. Format the numbers for display—decimals, percent signs, whatever the UX requires.

At this point in your data procedure you should have all the info you need to render a heat map from a gradient using the min and max values or maybe have custom animations tooltips, customize your legend positioning... you have all the data you need to make the best decisions possible for any situation.

And if you're rolling your own rendering logic (e.g., with D3 or SVG), this clean data structure makes it easy to iterate without guesswork. Rendering is a final step, not where the logic lives.

## Normalize Once, Reuse Everywhere

If your charts don't look consistent across views, your normalization step is too loose. The fix? Build your ETL so it's repeatable and predictable.

Test with two or three hardcoded datasets side-by-side. Validate axis alignment, label consistency, color mapping. Basically: **TDD for charts**. Do this early to avoid surprises later.

## Keep the Schema Flat and Simple

Don't overthink your data model. A flat list of records—each one a key/value object—is enough. Think like `pandas.DataFrame` or a NumPy array: simple, scalar values, no deep nesting. Even if you are visualizing nested graph data with many vertices you should still normalize it down to a flat linked list of edges the same principle applies to any kind of graph or tree data structure.

You also have the benefit of reusing formatters for a given data type or based on how you name your keys, for example. Keeping things simple pays dividends.

This makes it easy to tap into values during interactions (click, hover, etc.) and avoids ref headaches when your data updates. Deeply nested structures are a pain. Avoid them.

## Optimize After the Feedback

Early on, it's totally fine to use `map`, `filter`, and even Lodash chains. Let them help you build fast and iterate. What matters is showing users the story in the data.

Later, once the UX is approved and the product is stable, and our uses are pushing our system to the limits of the hardware, start profiling your code to find where it’s slowing down. Here's where you will start to collapse your greedy Lodash prototype code with a single-pass `for` loop. Merge sort + min/max computations. Memoize aggressively.

Even better—wrap each "ETL step" in its own `useMemo`. Now you can feature flag them, test them, or move them server-side if needed (e.g., Next.js API route or Go service). But don't do this too early. **Premature optimization breaks prototypes**.

## Write Smarter Loops

Use `for` loops. Not `map`, not `forEach`, not clever one-liners. Just plain `for`. They're fast, readable, and minimize overhead. Nest only if you must.

Avoid side effects in array transforms. Compute things once, store the result, move on. Dynamic programming is your friend here—hashmaps, buckets, groupings—all doable in linear time with a single pass.

The difference might be invisible at 1,000 rows. But at 50,000+? You'll feel it.

## Want Chart Swaps? Plan for It

If you want to switch chart types later—line to bar, bar to pie, charting lib A to lib B—you need a consistent structure. It's safe to assume that any sufficiently complex project might use two or three best of breed charting libraries that have better support for one chart type versus the other. Maybe you even have a chart type that's 100% custom, coded just for your product.

Keep your raw data in a simple list. Keep your labels in another. Match them by index. Done.

Most charting libs want the same format anyway: either `[{ label, value }]` or two arrays (`labels = []`, `values = []`). If you've prepped your data properly, you can swap libraries with minimal changes.

By skipping the built-in formatters and helpers, you avoid surprises—but now you own data integrity. That means no holes, no `undefined`s, no silent fails. Handle that in your normalization step.

## TL;DR

Charts don't need to be painful. But they do need structure.

- Treat charts like any other MVVM component.
- Build a client-side ETL pipeline.
- Normalize early, post-process intentionally, render late.
- Flat data wins. So do `for` loops.
- Defer optimization until the story is right.
- Make it swappable. Design for future chart types.

Clean data makes for clean visuals. Do the work upfront, and your charting code will stay stable no matter what comes next.
