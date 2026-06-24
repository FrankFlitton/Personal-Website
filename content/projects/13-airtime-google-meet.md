---
title: Airtime for Google Meet
slug: airtime-google-meet
featured: false
description: A Chrome extension I built to make speaking time visible during Google Meet calls — so meetings stay balanced and every perspective gets heard.
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
  - Vite Build
  - Store Listing & Branding
longDescription: |
  A Chrome extension I designed and built to make speaking time visible during Google Meet calls — a live fair-share line for facilitators and a personal talk-time chip for everyone else, so no single voice accidentally takes over the room.
---

## The problem

Most meetings have a quiet imbalance running underneath them, and almost nobody
can see it in the moment.

I noticed it first in myself. I'd leave a call replaying it in my head —
*did I just talk for ten minutes straight?* — with no way to have known while it
was happening. By the time you feel it, the moment to ease off has already
passed.

Then I started noticing the same thing across the room. In a roundtable or a
Q&A, one person genuinely engaged — not rude, just enthusiastic — would
accidentally spend the entire question budget, and three people who'd been
waiting for a gap simply never got one. The quietest, most considered
perspectives are often the ones that never make it into the conversation, and
the facilitator usually only realizes once the meeting is already over.

The nuance that mattered: **imbalance isn't always bad.** A presentation is
*supposed* to be one voice. A demo, a readout, a status update — one person
should dominate. The goal was never "make everyone talk equally." It was to
make the split **visible**, so a facilitator can tell the difference between a
presentation and an attendee accidentally clobbering everyone else's airtime —
and gently steer.

## What I wanted to build

A live, glanceable signal of who's been speaking and for how long, that:

- works *inside* a normal Google Meet call, with no setup,
- gives facilitators a **fair-share reference** for the whole room,
- gives each attendee a quiet, private nudge about their **own** airtime, and
- records nothing off the device — no transcripts, no audio, no accounts.

![The live Airtime panel during a Google Meet call: each participant with a talk-time bar and percentage, and a fair-share reference for the room.](/img/projects/airtime/airtime-live-centered.png)

## What I built

**Airtime** is a Chrome extension that adds a live panel to any
`meet.google.com` call. Each participant gets a bar and a percentage, and a
**"fair share" line** marks what an even split would look like — so it's obvious
at a glance whether the room is balanced, or whether one voice is running away
with it.

It deliberately works at two zoom levels, because the two problems are
different:

- **For the room.** The fair-share marker gives a facilitator an at-a-glance
  read: who's been quiet, who's over, and whether the imbalance is the expected
  one (a presenter) or an accidental one (an attendee eating all of Q&A). That's
  the cue to make space — "let's hear from someone we haven't yet."
- **For you.** The panel collapses to a single chip showing just your own
  talk-time %. No watching everyone else — just enough self-awareness to ease
  off or lean in, while it's still useful.

![Airtime's history view: the last meetings with their talk-time breakdowns, stored locally on the user's own device.](/img/projects/airtime/airtime-history-centered.png)

## How it works

There's no microphone access, no audio analysis, and no AI. Airtime is a
**Manifest V3 content script** that reads what Google Meet already renders on
the page — the participant tiles, their display names, and the visual speaking
and mute indicators. By sampling those indicators over time, it reconstructs who
has been speaking and for how long, entirely from the DOM, inside the user's own
tab.

A few decisions did the heavy lifting:

- **Sample the UI, not the audio.** Meet already shows who's talking; reading
  that signal kept the extension out of microphone permissions entirely and made
  the whole thing dramatically simpler — and more trustworthy.
- **Follow picture-in-picture.** When you switch tabs, Meet pops the call into a
  PiP window; the panel follows it, so the numbers travel with you instead of
  vanishing the moment you look at something else.
- **Local only.** A short summary of each meeting is kept in
  `chrome.storage.local`, capped at the 20 most recent, so the history lives on
  the user's machine and never leaves it. That made the product honest by
  construction — there's no server to send anything to.

It's built with **TypeScript and Vite**, bundling all JavaScript into the
package (no remotely hosted code, no `eval`). Even the branding pipeline is
reproducible: icons, screenshots, and promo art all render programmatically from
HTML templates via headless Chrome, rather than being hand-exported.

## The result

Airtime turns an invisible meeting dynamic into something you can act on while
it still matters. Facilitators get a fair-share read of the room without playing
referee; individuals get a quiet, private gauge of their own airtime; and the
quieter perspectives that usually get crowded out have a much better chance of
being heard.

The product's whole idea is compressed into a single glyph for the icon: three
participant segments against a blue gradient, with an amber fair-share tick that
the largest talker overshoots.

[See the live product page →](/airtime)
