---
title: Agent-Generated BI Dashboards
slug: summation-agent-dashboards
featured: true
description: A dashboard product where an agent turns a business question into a complete, live, multi-tab analysis.
featuredImage: /img/projects/summation-dashboards/featured.png
client: Summation
clientUrl: https://www.summation.com/
projectUrl: https://www.summation.com/resources/dashboards-is-live
cta: View
color: "#b14434"
category: AI Product · Data Visualization
contributions:
  - Product Engineering
  - Agent Orchestration
  - Schema Design
  - React & TypeScript
  - Python Validators
  - Data Visualization
  - Filter Query Brokering
longDescription: |
  A dashboard product where an agent turns a business question into a complete, live, multi-tab analysis. Built at Summation in partnership with the Fanatics wholesale sales team.

  Wholesale ops and finance teams have questions, not dashboards. Answering them normally means a BI ticket and a two-week queue. This asks the question and gets the dashboard.
---

<Img src="/img/projects/summation-dashboards/lifestyle.png" alt="The dashboard product in use: a planning conversation on the left, the generated dashboard package in the middle, and the live multi-tab analysis on the right." framed />

## The problem

Wholesale ops and finance teams have questions, not dashboards. What are my
warehouse forecasting issues. Where are my top sales opportunities. Answering
those normally means a BI ticket and a two-week queue, or a consulting
engagement that produces a static Power BI deck and a six-figure invoice.

{/* ALT (softer — drops the invented figure about someone else's business):
"...or a consulting engagement that produces a static Power BI deck and an
invoice sized to match." */}

## The product

Ask the question, get the dashboard. The agent finds the narrative in the data,
plans it into tabs, wires cross-filters and drilldowns, lays out charts with
written commentary, and validates the whole thing before it calls itself done.
Data stays live. You can then ask the dashboard follow-up questions,
holistically or one cell at a time.

<Img src="/img/projects/summation-dashboards/returns-overview.png" alt="A generated returns analysis: KPI row, agent-written commentary calling out the largest lever, and supporting charts." framed />

## What a person gets to touch

Generation is the first draft, not the last word. Select any card and **Ask**
about it, and the answer streams into the chat pane with that card as context.
Or switch to **Edit with AI**, click the cards you want changed, describe each
change, and the edits queue up to go to the agent as a single request. Anything
the agent built can also be opened in the editor and changed by hand.

<Img src="/img/projects/summation-dashboards/ask-addison.png" alt="A KPI card selected on a dashboard, with an Ask Addison input attached directly beneath it." framed />

<Img src="/img/projects/summation-dashboards/edit-queue.png" alt="Edit with AI mode on a P&L dashboard: a queued instruction pinned to the P&L table card, and a bottom bar holding one edit with Discard and Submit." framed />

## Architecture, in four layers

### 1. Agentic orchestration

Dashboard composition is decomposed into discrete stages, each backed by a skill
carrying its own examples and validators, one per card type. Find the
narratives. Plan them into tabs. Assemble the data. Detect column names shared
across sources and use them to drive cross-filters and drilldowns. Plot the
layout with commentary, as text blocks or as labeled conditional regions inside
a chart.

```mermaid
flowchart TD
  Q["Business question"] --> N["Find the narratives in the data"]
  N --> P["Plan the narratives into tabs"]
  P --> A["Assemble the data; detect shared columns and wire cross-filters"]
  A --> L["Lay out the cards, with commentary"]
  L --> V{"Do the validators pass, and does the render look right?"}
  V -->|"No — revise the layout"| L
  V -->|"Yes"| D["Dashboard complete"]
```

### 2. One schema, three runtimes

A JSON Schema layer is the single source of truth for what a valid dashboard is.
The same contract powers the React editor pane, the Python server-side
validators, and the agent's own output checking. Any setting a person can change
in the editor, the agent can change too, and neither can produce a state the
other rejects.

<Img src="/img/projects/summation-dashboards/config-pane-style.png" alt="The card config pane's Style tab for a bar series: chart type, display name, conditional gradient color stops, and bar styling. Every control maps to a field in the schema." framed tall />

```mermaid
flowchart LR
  S["JSON Schema<br/>the definition of a<br/>valid dashboard"]
  S --> R["React<br/>editor pane"]
  S --> P["Python<br/>validators"]
  S --> A["Agent output<br/>checking"]
  R --> D["Dashboard<br/>state on disk"]
  P --> D
  A --> D
  D -.->|"every write re-checked<br/>against the same contract"| S
```

### 3. File-per-artifact packaging

Every chart is a file. Every query behind it is a file. The package is hoisted
and pulled up on read, so default filters can be coalesced, assembled, and
cached ahead of time rather than resolved per widget at render.

<Img src="/img/projects/summation-dashboards/file-per-artifact.png" alt="The dashboard package on disk: charts, data, filters, kpis, tables and text-cards as individual files alongside meta.json and tabs.json." framed />

<Img src="/img/projects/summation-dashboards/data-sources.png" alt="The data layer for a dashboard: base tables and the per-card SQL queries that feed each chart." framed />

### 4. Rendering and the visual feedback loop

Adapters over Highcharts, ag-Grid powered tables, and fully custom views built
on TanStack. The agent gets a base64 render of the chart back, so it can see how
the UI actually drew the thing, not just what the validators were willing to
call valid configuration.

<Img src="/img/projects/summation-dashboards/pnl-by-league.png" alt="A generated P&L view: KPI row, year-over-year variance, and a grouped financial table." framed />

## Filter brokering

Filters are the part of a dashboard people actually touch, and they were the
hardest thing to make correct by construction.

A filter matches on column name — but a column name alone isn't enough to do
anything useful with. Each filter also needs a *source table*: something to
populate its dropdown from, to enumerate options against, to type its value by.
So the data endpoint takes the set of active filters plus the card's base query
and works backwards. It parses the card's SQL, walks the `FROM`, `JOIN` and
alias nodes to resolve which real table each filter column belongs to, and then
coerces the incoming value to that column's actual type. Some values want to
stay strings. Others have to become numbers before a `BETWEEN` will mean
anything.

<Img src="/img/projects/summation-dashboards/filter-date.png" alt="A date filter using the Period to Date operator, with week, month, quarter and year-to-date presets. The operators offered depend on the resolved column type." framed />

Two rules make the rewrite safe. The filter only attaches when its column is a
genuine base column on a table the card reads directly — a `SELECT` alias or an
aggregate is invisible to the injection, and quietly does nothing rather than
erroring. And when the card's own SQL already constrains that column, the filter
*replaces* that predicate instead of AND-ing a duplicate, so a tab-level filter
cleanly overrides a card's built-in default. Cards whose identity is pinned to a
value — a KPI whose title says "2025" — opt into intersect mode instead, so a
mismatched filter returns no rows rather than silently relabelling the card.

<Img src="/img/projects/summation-dashboards/filter-bar.png" alt="A dashboard filter bar: a saved date-range filter, two temporary filters marked with blue dots, a collapsed +1 group, and Add Filter offering the columns from the resolved source table." framed />

```mermaid
flowchart TD
  UI["Filter — column, operator, value"] --> PARSE["Parse the card's SQL; resolve the source<br/>table from FROM, JOIN and alias nodes"]
  PARSE --> BASE{"Real base column on that table?"}
  BASE -->|"No — alias, aggregate, or behind a CTE"| SKIP["Never attaches. Returns unfiltered<br/>data, silently, never an error"]
  BASE -->|"Yes"| COERCE["Coerce to the column's catalog type"]
  COERCE -->|"replace — the default"| REPL["Replace the card's own predicate"]
  COERCE -->|"intersect — pinned cards"| INT["AND with the card's own predicate"]
  REPL --> INJECT["Inject WHERE into the outermost SELECT"]
  INT --> INJECT
```

That silent-skip path on the left is the whole reason the rest of the system is
strict about flat SQL. A filter that doesn't attach doesn't throw — it returns
perfectly plausible, completely unfiltered numbers. The only defence is making
it impossible to author one, which is what the validators do.

<Img src="/img/projects/summation-dashboards/filter-brokering.png" alt="Tab-scope filters over a sales dashboard. Each filter enumerates its options from the resolved source table." framed />

## The hard part

No cell returns an error. The goal was not an agent that generates dashboards,
it was a dashboard that is completely correct on the first pass. Every chart,
every query, every filter assembles and validates before the agent is permitted
to consider the job complete. Shared schema across the React, Python, and agent
layers is what makes that enforceable rather than aspirational, and the render
feedback loop is what catches the cases where valid configuration still looks
wrong.

## In practice

Built with the Fanatics wholesale sales team, with salespeople, warehousing, and
inventory cases at the center, extending out to financing and P&L views. The
result reads like a Big Four or MBB engagement handed your ops team a Looker
workspace, except it takes minutes, refreshes against live data, and answers
when you ask it something.

{/* ALT (plainer — same claim without the consulting-brand framing):
"The result gives an ops team the kind of analysis that normally arrives as a
consulting deliverable, except it takes minutes, refreshes against live data,
and answers when you ask it something." */}

<Img src="/img/projects/summation-dashboards/region-vs-plan.png" alt="Regional attainment against plan, with variance and a scorecard the agent laid out and annotated." framed />

## Results

- **100% of customers adopted it.**
- **5 to 20 minutes to insight**, down from a two-week BI queue.

{/* ALT (adds the denominator the "100%" is missing — fill in N):
"- **Adopted by all N accounts in the pilot.**" */}

---

React, TypeScript, JSON Schema, Python validators, Highcharts, ag-Grid,
TanStack, Claude Agent SDK.

*All figures shown are synthetic.*

The shipped feature set, card by card, is documented in the
[Summation docs](https://docs.summation.com/features/artifacts/dashboards).
