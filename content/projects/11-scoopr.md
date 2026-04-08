---
title: Scoopr
slug: scoopr-real-estate-comps
featured: true
description: Instant comparable sales data for condo buyers, delivered on any listing page the moment it matters.
featuredImage: /img/projects/scoopr/unnamed.png
client: Personal Project
clientUrl: ""
projectUrl: ""
color: "#E8A000"
category: PropTech / Consumer App
contributions:
  - Product Strategy
  - UX Research
  - UX Design
  - UI Design
  - Browser Extension Development
  - iOS Development
longDescription: |
  During the COVID sellers market, condos in Vancouver were going for 30% over asking, sometimes more. My wife and I were watching friends make seven-figure bids without any clear picture of what comparable units had actually sold for.

  The insight that changed things: within a specific condo building, price is highly predictable. Bedrooms, bathrooms, and square footage tell most of the story. Six months of the same building's sales history gives a reliable signal, even in a market moving as fast as that one was.

  We built Scoopr to surface that signal on any listing page, the moment a buyer needs it.

  <i>How might we collapse the gap between browsing a listing and having the confidence to make an offer?</i>
---

![Scoopr: We help you win condos. Bid with confidence.](/img/projects/scoopr/unnamed.png)

## The Problem

In a competitive sellers market, buyers don't lose on price alone. They lose because they don't have the right information at the right moment. The tools existed to find comparable sales data, but accessing them required leaving the listing, navigating a separate system, and manually reconciling what you found. Most buyers never did it systematically.

The result was a familiar pattern: buyers would reach the moment of an offer having done their research in fragments. Multiple browser tabs open. Rough notes on paper or in a spreadsheet. A call to their realtor hoping for a quick read on what the market would bear. Confidence came from intuition as much as data.

In metro areas like Vancouver, this gap was particularly costly. From building to building, prices vary significantly. But *within* a building, they're remarkably consistent. Layout (bedrooms, bathrooms, square footage) does most of the work. A buyer standing in a unit, or staring at its listing page, was steps away from a highly predictable answer to the most important question they'd face. They just had no way to get to it.

## The Decision Flow

To design a targeted solution, we mapped the full buyer journey across four stages.

![Buyer decision flow: from browsing listings to making an offer, with Scoopr's intervention point highlighted](/img/projects/scoopr/Decision%20Flow%20Chart.jpg)

The flow makes the problem visible. The first three stages (browsing listings, filtering by criteria, evaluating individual listings) are fast and well-served by existing real estate platforms. The friction lives in stage four: *considering an offer*.

That stage required a buyer to:
1. Open comparable listings across multiple tabs
2. Manually compile key details (price, beds, baths, sqft) for each
3. Search for past sold prices of similar units
4. Call their realtor for a read on the current market

Each of these steps happened *outside* the listing page, after a buyer had already decided they were interested. The cognitive overhead was high, and most buyers only partially completed it.

Scoopr's design goal was direct: collapse stage four into stage three. Bring the comps to the listing, instead of asking buyers to go find them.

## The Insight: Building-Level Predictability

The key product bet was that condo prices are more predictable within a building than the broader market suggests.

In Vancouver's COVID-era market, city-wide pricing was chaotic. Bidding wars were common. Prices shifted week to week. But zoom in to a single building, and the signal becomes clear: units with the same number of bedrooms, bathrooms, and similar square footage sell within a tight, consistent band. The building itself acts as a natural control group.

A six-month lookback window proved to be the right horizon. Long enough to accumulate meaningful comparable sales across layouts; short enough to stay relevant in a rapidly moving market. With that window, Scoopr could deliver a reliable read on what any given unit was likely to trade at. Not a prediction, just the actual sold prices of comparable units in the same building, presented cleanly.

This framing also kept the product honest. Scoopr wasn't predicting prices. It was showing buyers what buyers like them had actually paid, in that building, recently. The interpretation remained with the buyer. The confidence came from having the data.

## The Product

### One Click on Any Listing Page

The entry point was a browser extension that worked across the major real estate platforms Canadian buyers used: Realtor.ca, REW, Remax, Zillow, and others.

When a buyer landed on a listing page, Scoopr appeared as a contextual overlay. One click surfaced the last six months of sold prices in the same building, filtered by layout type. No new tab. No separate search. The data appeared inside the browsing session where the decision was already forming.

![Scoopr browser extension: one-click price history overlay on a listing page, showing sold prices by date and layout](/img/projects/scoopr/unnamed-1.png)

The table showed sold date, price, and layout (beds, baths, sqft) for each comparable unit. Buyers could immediately see the spread: what similar units had gone for at the low end, the high end, and the middle. That context was often enough to know whether the asking price was reasonable, aggressive, or genuinely competitive.

### Building-Level Sales History

The mobile app extended the experience for buyers actively tracking multiple properties. Rather than building-by-building searches, it let buyers pull up a full sales history for any address and browse it by layout type.

![Scoopr mobile app: building sales history with sold prices and layout details for 1351 Continental Street](/img/projects/scoopr/unnamed-2.png)

The card view surfaced the same information as the browser extension (sold price, layout, date) in a format designed for browsing rather than point-in-time lookup. Buyers could scroll through a building's recent history and get a feel for its pricing dynamics before they'd even looked at a specific listing.

### Favorite Buildings

Buyers in a serious search are usually watching a small set of buildings or neighbourhoods. The Favorites feature let buyers save those buildings and revisit their sales activity at any time, without having to remember the address or re-run the search.

Comparing across buildings at a glance also made it easier to weigh tradeoffs: a building with fewer recent sales might be harder to price confidently; one with consistent, high-volume turnover told a clearer story.

### Share Your Scoop

Real estate decisions are rarely made alone. Most buyers were shopping with a partner, a family member, or at least bouncing ideas off their realtor. Scoopr included native sharing that let buyers send a building's price summary as an image through any messaging app.

![Scoopr sharing: sending a building's price history card through iMessage](/img/projects/scoopr/unnamed-3.png)

This turned Scoopr into a communication tool as much as a research one. Instead of describing a listing in words and hoping the other person could picture it, a buyer could share the actual comps and have a conversation grounded in the same data.

## Outcome

We piloted Scoopr with friends and family during one of the most competitive Canadian real estate markets in recent memory, a COVID sellers market where homes in major metro areas were routinely selling at 30% or more over asking.

The results were tangible. Our group of early users purchased homes for under asking, saving a combined **$100,000** at a time when overpaying was the norm. Having the building's sales history in hand before making an offer changed the negotiation dynamic: buyers came in with a clear view of what the market would actually bear, not a guess. That confidence showed in the offers they wrote.

The core hypothesis held: within a condo building, pricing is predictable enough that a six-month lookback gives buyers a meaningful edge. Getting that data in front of buyers at the right moment, on the listing page, before the offer, without additional friction, was enough to change behaviour.
