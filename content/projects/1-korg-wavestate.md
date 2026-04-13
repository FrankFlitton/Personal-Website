---
title: Korg Wavestate Native
slug: korg-wavestate-ux-ui-design
featured: true
description: Bringing a legendary wave sequencing synthesizer to the PC, without losing what makes it special.
featuredImage: /img/projects/korg-wavestate/featured.png
client: Korg R&D
clientUrl: https://www.korg.com/us/products/synthesizers/wavestate/
projectUrl: https://www.korg.com/us/products/synthesizers/wavestate/
color: "#1565C0"
category: Audio Product
contributions:
  - UX Research
  - UI Design
  - Creative Direction
longDescription: |
  The Korg Wavestate is a wave sequencing synthesizer that can run up to four independent layers of sound simultaneously, each with its own timelines for sample, pitch, shape, gate, and step sequencing. The result is a kind of musical tensor: a multi-dimensional space of sound that evolves differently every time you play it.

  The hardware is inspiring to perform on but difficult to program. Bringing it to PC as a plugin offered the chance to give composers and sound designers the screen real estate they had always wished for.

  <i>How might we translate a deeply physical, hardware-native instrument into a software experience that is both more powerful and more intuitive?</i>
---

## The Instrument

<YouTube id="Wxje0gdwAwo" />

The Wavestate is a wave sequencing synthesizer from Korg, a spiritual successor to the legendary Wavestation from the early 1990s. Rather than playing a static sound, it steps through independent sequences of samples, pitches, amplitudes, and shapes that can all run at different lengths and in different orders. With four independent layers, each a full wave sequencer in its own right, the patch space is effectively a musical tensor — an N-dimensional parameter space that rarely repeats the same sound twice.

![Korg Wavestate hardware: 3/4 angle view showing the keyboard, joystick, and step key layout](/img/projects/korg-wavestate/hardware-angle.png)

This is what makes the Wavestate so expressive. It is also what makes it so hard to edit on the hardware's small onboard display.

![Korg Wavestate hardware design details: diamond border, vector joystick, glowing step keys, and retro pixel display](/img/projects/korg-wavestate/hw-inspiration.jpg)

Sweetwater reviewers captured the tension well. Users loved the instrument's direction and felt genuine nostalgia for its predecessor. But the recurring note was the same: the display feels smaller the more you use it. Bringing the Wavestate to PC offered the chance to give composers and sound designers the screen real estate they had always wished for, and to expose the full depth of its signal architecture in a way the hardware simply cannot.

Two goals emerged from the research: make sound design genuinely better, and keep the live performance experience excellent.

## Visual Language & Design Principles

The Wavestate hardware has a distinct visual identity — a futuristic instrument that feels warmly familiar. Key motifs informed the visual language of the software: the diamond border, the blue and white linework around the vector joystick, the glowing white step keys, and the retro pixel display that communicates state at a glance.

![Visual language moodboard: lively colors, blend of nature and futurism, clean line work with natural noise textures](/img/projects/korg-wavestate/art-direction.jpg)

The design philosophy drew from two complementary traditions: Japandi aesthetics (the blend of Japanese and Scandinavian minimalism, where nature, function, and style coexist quietly) and the Swiss Typographic Style (a humanistic mathematical grid that makes complex information feel navigable). Together these set the tone for an interface that is sophisticated and minimal, with geometric clarity and bright color used specifically to call out interactive elements and active states.

![Design philosophy references: Japandi interior, Swiss typographic posters, and Lorn's Anvil album art](/img/projects/korg-wavestate/design-philosophy.jpg)

## UX Research: Mapping the Decision Space

Before any pixels were placed, the goal was to map how users actually move through the instrument. The Wavestate supports two fundamentally different modes of use: **performance** (selecting a known patch, tweaking it live, and playing) and **sound design** (building a patch from scratch, coordinating timelines, dialing in effects and modulation).

These modes have very different flows and very different information needs. A performer needs the layer overview and library front and center. A sound designer needs deep timeline access without losing track of which layer is playing which sound.

The journey below is a composite drawn from Sweetwater reviews, forum threads, and user interviews, mapped onto a representative sound design session.

<UserJourneyMap
  title="Wavestate Hardware — Sound Design Session"
  persona={{
    name: "Jordan",
    role: "Sound Designer",
    bio: "Jordan designs patches for film scoring and live performance. They love the Wavestate's sound engine but spend more time navigating the hardware's display than actually composing — especially once a patch has more than two active layers."
  }}
  expectations={[
    "See all 4 layers and their current state at a glance",
    "Edit any layer's wave sequence without losing track of the others",
    "Stay in a compositional flow — not break to decode menu trees"
  ]}
  phases={[
    {
      name: "Playing",
      steps: [
        { id: 1, description: "Load a preset, start playing", sentiment: 5, quote: "The way this evolves is unlike anything else" },
        { id: 2, description: "Decide to customize the sound for a project", sentiment: 4 }
      ]
    },
    {
      name: "Orientation",
      steps: [
        { id: 3, description: "Press Edit, enter menu navigation", sentiment: 3 },
        { id: 4, description: "Try to identify which of the 4 layers is making which sound", sentiment: 2, quote: "Which layer is doing that?" },
        { id: 5, description: "Realize only one layer is visible on the display at a time", sentiment: 3, quote: "I can't see the whole picture at once" }
      ]
    },
    {
      name: "Layer Editing",
      steps: [
        { id: 6, description: "Navigate into a specific layer's wave sequence", sentiment: 2, quote: "Four button presses just to get here" },
        { id: 7, description: "Edit a step value, return to play mode to hear it", sentiment: 2 }
      ]
    },
    {
      name: "Resolution",
      steps: [
        { id: 8, description: "Write layer state on paper to keep track", sentiment: 2, quote: "Paper notes. On a modern synthesizer." },
        { id: 9, description: "Complete the edit methodically across multiple passes", sentiment: 3 },
        { id: 10, description: "Hear the finished patch — it works", sentiment: 4, quote: "Great result. But it shouldn't take this long." }
      ]
    }
  ]}
/>

The pattern was consistent: the instrument's sound engine was a source of genuine delight, while the experience of editing it across layers was a source of friction. Users could not see what all four layers were doing simultaneously, could not tell which sound belonged to which layer at a glance, and frequently lost context navigating menu trees mid-session. Writing layer state on paper came up independently across multiple interviews and reviews — a reliable signal of where the hardware's display reached its limit.

Those pain points shaped the software directly. The persistent four-layer overview, the Inspector panel, and the color-coded wave sequence editor each address a specific moment in that curve. It also became clear after mapping the detailed user journey that the software needed to serve two distinct modes: a streamlined auditioning experience for performers browsing and playing patches, and a deep sound design environment for users coordinating timelines and modulation across all four layers. The decision flow below maps both usage modes in full.

![High-level decision flow: performance mode vs. sound design mode, with callouts for key UX pain points](/img/projects/korg-wavestate/decision-flow.jpg)



## A Config-Driven Design System

One of the core engineering and design challenges was the sheer volume of parameters. Each lane in a wave sequence — Timing, Sample, Pitch, Shape, Gate, Step Seq — has its own set of configurable values, and those values vary depending on the lane type and what mode a step cell is in. Designing a UI that works across all combinations without going bespoke for each one required building around a config-driven component model.

![Korg Wavestate circuit diagram showing the signal path from oscillators through filters, effects, and output](/img/projects/korg-wavestate/circuit-diagram.png)

The signal path (oscillators, filters, effects, vector envelope, modulation matrix) informed how parameters were grouped and which ones needed to share visual space. The Inspector panel became the key mechanism: a persistent right-side panel that renders whatever controls are relevant to the currently selected element, driven entirely by the selection state. This meant the center of the screen could stay clean and scannable, while the Inspector adapted dynamically to expose the right parameter set without a custom screen for every case.

This pattern extended throughout the design: step cells, effect slots, generator tiles, and voice-assign controls all follow the same select-and-inspect interaction model, making the interface learnable even when the underlying parameter space is vast.

## Information Architecture & Layout

The four-layer architecture presented a fundamental layout challenge: how do you show all four layers at once without overwhelming the user, while still giving each layer access to six independent timelines?

Several layout paradigms were explored and stress-tested against both user modes.

![Wireframe explorations: Accordion + Timeline Waterfall layout with static and dynamic regions](/img/projects/korg-wavestate/wireframes.jpg)

The **Accordion + Timeline Waterfall** concept treated the left and right columns as static anchors (vector, modwheels, screen controls, mod knobs) while the center expanded dynamically for each active layer. Timeline cells could display the current modulation shape or visually describe the looping pattern at a glance.

The **Timeline Wall** filled the entire center with all timelines playing back simultaneously — a more visual, performance-oriented approach.

The **Not iWavestation** concept drew from the iWavestation app's visual language, using a familiar row-per-layer structure with in-line timeline cells and an overlay panel for deeper per-timeline editing.

The **Belt** layout used a top-bottom split: global settings and layer controls across the top, timelines in a scrollable middle band, and a voice parameter detail tray pinned to the bottom.

The final design drew most heavily from the Accordion paradigm, adapting it into a tabbed layer view that keeps all four layers visible while letting any one expand into its full parameter set.

## High Fidelity Mockups

### Performance Overview

The performance overview brings all four layers into a single scannable view. Each layer row shows its BPM, active program, the condensed WSEQ lane, filter state, and effects chain at a glance. Active layers are highlighted in blue; inactive ones recede. The Inspector panel on the right provides contextual deep-editing for whatever parameter or generator is selected — no separate screen needed.

This solved the core hardware complaint: you no longer need to navigate a menu tree to see what all four layers are doing simultaneously.

![Performance overview: all four layers visible with condensed WSEQ lanes, per-layer filter and effects, and the inspector panel](/img/projects/korg-wavestate/featured.png)

### Params & Effects

Clicking into any layer opens tabbed access to Params, Effects, and Waveseq, keeping the four-layer overview persistent on the left while giving the center region over to deep editing.

The **Params** tab surfaces layer setup, voice assign, filter, performance setup, MIDI, and global settings in a structured grid — all the settings that on the hardware require multiple menu dives, surfaced together for the first time.

![Performance Params tab: layer setup, voice assign, filter, performance and MIDI settings in a single view](/img/projects/korg-wavestate/performance-params.jpg)

The **Effects** tab exposes all four effect slots (Pre FX, Mod FX, Delay, Reverb) with a quick-summary row across the top. Clicking any effect expands the bottom region into a full parameter breakdown, with the Inspector handling modulation routing on the right.

![Performance Effects tab: four effect slots with quick summary row and expandable detail panel](/img/projects/korg-wavestate/performance-effects.jpg)

### Wave Sequence Editor

The Waveseq tab is where the instrument's real depth lives. Two views were designed for different working contexts.

The **mini editor** shows a condensed timeline with one row per lane, each step cell displaying only its primary value. This is the everyday editing view: fast to scan, easy to reorder steps, with the Inspector always available for precision work.

![Wave Sequence Editor mini view: condensed lanes showing primary values per step, with inspector for detail edits](/img/projects/korg-wavestate/waveseq-mini.jpg)

The **large editor** expands to reveal the full parameter set per step cell — octave, trim, offset, and sound name for Sample steps; trans and tune for Pitch; offset, level, phase, and shape for Shape. Color coding ties step cells to their lane type, making the visual rhythm of the sequence readable at a glance.

![Wave Sequence Editor large view: full step detail with color-coded lanes and complete per-step parameter access](/img/projects/korg-wavestate/waveseq-large.jpg)

### Vector Joystick

The vector joystick section offered an opportunity to make a purely hardware concept visual in a new way. It can be rendered as a 3D perspective knob showing the joystick's physical position, or as a 2D top-down path view showing the automation trajectory it will trace over time. Vector envelope settings sit alongside the other generators, making the relationship between the joystick path and the sound evolution explicit.

![Vector joystick: 3D knob and 2D path views alongside vector envelope settings](/img/projects/korg-wavestate/vector-joystick.jpg)

## Outcome

The designs were delivered to Korg R&D covering the full performance and sound design workflow: performance overview, params, effects, wave sequence editing at two levels of detail, vector joystick, and patch management. The work spanned visual research, UX flow mapping, multiple layout explorations, and high fidelity mockups with component specifications for the development team — designed around a config-driven system that scales to the Wavestate's full parameter depth without requiring a bespoke screen for every combination.
