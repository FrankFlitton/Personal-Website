---
title: Shopping Optimizer
slug: td-lab-shopping-optimizer
featured: true
description: The "Expedia for groceries", an AI-powered mobile app that optimizes your weekly shopping trip.
featuredImage: /img/projects/shopping-optimizer/featured.png
client: TD Lab
clientUrl: https://www.td.com/
projectUrl: ""
color: "#43A047"
category: FinTech / Consumer App
contributions:
  - R&D / Technical Direction
  - ML / NLP Engineering
  - Flutter Development
longDescription: |
  The average Canadian family spends over $1,000 a month on groceries, yet the tools available to manage that spend are fragmented, inconvenient, and leave real money on the table.

  As Lead Engineer at TD Lab, I led the R&D effort to find out if we could do better. The result was Shopping Optimizer: a mobile-first experience that aggregates flyer and pricing data across retailers, applies a custom NLP clustering algorithm to normalize products, and presents users with a fully optimized, route-aware grocery trip plan.

  <i>How might we help everyday shoppers save time and money by unifying the entire grocery journey in one intelligent experience?</i>
---

## The Problem

TD Lab's research identified groceries as a persistent, high-friction pain point for a broad range of customers. The numbers told a clear story: prices were rising at their fastest pace in over a decade, 34% of students said it was challenging or impossible to afford food, and yet 76% of shoppers were still visiting more than one store every week, often without a plan.

The core frustration wasn't just cost. It was complexity. A simple weekly shop involves six distinct decision points: taking inventory, choosing stores, finding transportation, locating items, checking prices at checkout, and getting home. Each step carries its own tradeoffs, and no single app addressed all of them.

![The grocery user journey across six stages: deciding, planning, finding transport, shopping, paying, and getting home](/img/projects/shopping-optimizer/user-journey.jpg)

We ran a broad research sprint covering 10 user interviews, 50 survey responses from students and recent graduates, and extensive secondary research on food insecurity, competitor apps, and emerging fintech trends to validate and sharpen the opportunity.

## Research & Personas

The research surfaced a consistent pattern across very different users. Whether someone was a budget-constrained student, a cost-conscious newcomer to Canada, a socially driven millennial, or a time-pressured young professional, the high-level shopping journey was nearly identical. Only the *priority order* of the steps differed.

We developed four key personas to anchor our design and engineering decisions:

**Rina** is a location-limited student who walks or takes the bus, needs to know costs upfront, and prioritizes healthy options within a tight budget.

**Ana** is a mother with a growing family who needs specialty cultural ingredients, wants to plan multi-stop trips around the best weekly deals, and has no margin for surprises at checkout.

**Marc** is a social shopper motivated by friends who needs an experience simple enough that friction won't cause him to abandon it entirely.

**Daniel** is a young professional who shops at the most convenient stores on his commute home, loves cooking new recipes, and is actively saving for a down payment.

The key insight: these users shared being price conscious and wanting a simpler, more convenient path to completing their weekly shop.

![A student grocery shopping, weighing cost and convenience at the store](/img/projects/shopping-optimizer/featured.png)

![User journey map for grocery shopping](/img/projects/shopping-optimizer/user-journey-map.png)


## Competitive Landscape

The existing market had no shortage of apps, but every one of them addressed only one or two stages of the journey. Flipp and Reebee handled digital flyers. Instacart handled delivery. Basket compared prices across stores. PC Express locked you into one retailer's ecosystem.

This fragmentation forced users into one of two bad options: juggling multiple apps and context-switching constantly, or abandoning digital tools altogether and shopping on instinct.

![Competing apps mapped across the six-stage grocery journey, none cover it end-to-end](/img/projects/shopping-optimizer/competitive-map.jpg)

All of Canada's big five banks had noticed groceries mattered, and every one offered credit card rewards for grocery purchases. But none had taken the next step: helping customers *before* they reached the register.

## The Solution

We designed Shopping Optimizer as the "Expedia for groceries", a single experience that covers the entire journey, adapting to each user's mental model and priorities.

At its core, the app lets a user build a shopping list, then generates a ranked set of optimized trip options:

- **One Stop:** best single store for convenience
- **A Few Stops:** balance of time and cost savings
- **Lowest Prices:** maximum savings across multiple retailers

Each route integrates Google Maps to surface walking, transit, and driving options. The list view updates in real time as the user shops, letting them check off items and track spend at each store.

![Shopping Optimizer trip options ranked by cost, stops, and time, with Google Maps routing](/img/projects/shopping-optimizer/trip-options.jpg)

![Shopping list with per-item price ranges and trip detail view](/img/projects/shopping-optimizer/app-screens.jpg)

![User flow: building a pantry, reviewing a shared shopping list, and discovering smart substitutions](/img/projects/shopping-optimizer/user-flow.jpg)

## Technical R&D: Smart Categories

The most technically interesting challenge was data normalization. Flyer and promotional data from different retailers describe the same product in wildly inconsistent ways: "HAND PICKED GREEN BEANS", "Eat Smart Green Beans", "BEANS OR LENTILS, 540 mL". Presenting these to users as separate items would make the app unusable.

I led the research and implementation of a custom NLP clustering algorithm we called **Smart Categories** to solve this.

The pipeline works in several stages:

1. **Normalize** all promotion names: lowercase, stem words, remove English stop words
2. **Score** item pairs using the Jaccard Index to quantify word-level similarity
3. **Cluster** items whose scores exceed a threshold into a single smart category
4. **Generate** a human-readable category title from the most-frequent non-repeated keywords in the cluster

The result: a search for "beans" surfaces green beans, kidney beans, and chickpeas from across a dozen retailers, cleanly grouped, price-sorted, and image-matched. Coconut milk and 2% milk land in different categories. A Gucci t-shirt and a Fruit of the Loom t-shirt are correctly separated.

![Smart Categories NLP pipeline: normalizing, scoring with Jaccard Index, clustering, and generating human-readable category titles](/img/projects/shopping-optimizer/smart-categories.jpg)

I also explored several improvement vectors: word association embeddings to handle brand-to-category mapping (Black Diamond → cheese, Lindt/Godiva → chocolate), secondary price-range clustering to separate truly different product tiers, and server-side caching of cluster results to reduce per-request latency.

## Platform Architecture

To allow rapid iteration and user testing without the overhead of native iOS/Android app review cycles, I architected a Flutter-based cross-platform build pipeline hosted on Netlify's CDN.

From a single codebase, the app could be distributed as:
- A **web app** accessible in any browser (used for prototype testing sessions)
- A **wrapped mobile experience** that surfaces device APIs like location and local storage
- A **native iOS/Android build** through the same CI/CD pipeline

This removed the friction of distributing pre-release TestFlight builds to research participants and let us run user testing sessions the same day we shipped a new build.

![Build architecture: Flutter codebase through CI/CD pipeline to CDN web delivery and iOS/Android native builds](/img/projects/shopping-optimizer/architecture.jpg)

The architecture also included a TDLAB CORS proxy layer to mediate calls to the Flipp API and Google Maps, keeping credentials server-side and providing a clean abstraction layer for future data source additions.

## Outcome & Next Steps

The prototype was built, deployed, and piloted directly in the community with students, recent graduates, low-income households, and young families recruited through TD Lab's Influencer Panel. Seeing it in the hands of real users was the most rewarding part of the project — participants were able to save hundreds of dollars a month on groceries, simply by having their shopping trip optimized for them. For a student on a tight budget or a young family stretching every dollar, that kind of impact is tangible and immediate.

The research validated strong product-market fit across all four personas, and the technical exploration produced reusable learnings beyond this project. The Smart Categories algorithm is directly applicable to transaction data normalization, and the same technique could power smarter spending categories in TD's Money Management tools.

Next steps included expanding data sources into the US market (with SNAP program filtering for food-assistance households), engaging TD line-of-business partners to evaluate a production path, and deepening the ML model to improve clustering accuracy at scale.
