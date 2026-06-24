---
title: Airtime for Google Meet
slug: airtime-google-meet
featured: false
description: A Chrome extension that shows how speaking time is shared in Google Meet — with a live fair-share line and a private, local meeting history.
featuredImage: /img/projects/airtime/airtime-live-centered.png
client: Personal Project
clientUrl: https://frankflitton.com/airtime
projectUrl: https://frankflitton.com/airtime
cta: View
color: "#5b8def"
category: Browser Extension · Product
contributions:
  - Product Design
  - Chrome Extension (MV3)
  - TypeScript
  - DOM Instrumentation
  - Real-time UI
  - Privacy-first Architecture
  - Vite Build
  - Store Listing & Branding
longDescription: |
  A privacy-first Chrome extension that measures how long each person speaks during a Google Meet call and surfaces it live — so meetings stay balanced and everyone gets heard. 100% local: no servers, no accounts, no tracking.
---

## Overview

Some voices fill a meeting; others never quite find the gap to speak. The
imbalance is usually invisible in the moment — you only notice afterwards, if
at all. **Airtime for Google Meet** makes it visible while the call is
happening.

The extension adds a live panel to any `meet.google.com` call that tracks how
long each participant has been speaking. Each person gets a bar and a
percentage, and a **"fair share" line** marks what an even split would look
like — so it's obvious at a glance whether airtime is balanced, or whether one
voice is doing all the talking (sometimes it's yours).

It works at two zoom levels. **For the room:** facilitators can see who's been
quiet and make space for them. **For you:** the panel collapses to a single
chip showing your own talk-time %, so you can stay honest without watching
everyone else.

[See the product page →](/airtime)

## How it works

There's no microphone access, no audio analysis, and no AI. The extension is a
**Manifest V3 content script** that reads what Google Meet already renders: the
participant tiles, their display names, and the visual speaking and mute
indicators on each tile. By sampling those indicators over time, it
reconstructs who has been speaking and for how long — entirely from the DOM, in
the user's own tab.

When you switch tabs, Meet pops out a picture-in-picture window; the panel
follows it, so the numbers travel with you instead of disappearing.

## Privacy by design

The most load-bearing design decision was architectural: **everything stays on
the device.** There is no backend, no analytics, and no third-party service.

A short summary of each meeting — display names, total talk time, and
percentages — is written to `chrome.storage.local`, capped at the 20 most
recent meetings so users can review them in the popup and History view. Nothing
is ever transmitted off the machine. That made the Chrome Web Store data
disclosure simple and honest: the only data the extension touches is on-page
**website content**, read and discarded locally.

[Read the privacy policy →](/airtime/privacy)

## Build & distribution

The extension is built with **TypeScript and Vite**, bundling all JavaScript
into the package — no remotely hosted code, no `eval`, which keeps it inside
the store's remote-code policy. The icon set, store screenshots, and promo
tiles are all rendered programmatically from HTML templates via headless
Chrome, so the branding pipeline is reproducible rather than hand-exported.

The product's core idea is compressed into a single glyph for the icon: three
white participant segments against a blue gradient, with an amber fair-share
tick that the largest talker overshoots.
