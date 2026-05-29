---
title: TD Student Budget Calculator
slug: td-student-budget-calculator
featured: false
description: Helping students and families right-size education financing with TD Canada Trust.
featuredImage: /img/projects/td-sbc/td-sbc-featuredImage.png
client: TD Canada Trust
clientUrl: https://www.td.com/
projectUrl: https://ix1.apps.td.com/sbc/#/
color: "#00a750"
category: SWE + UX
contributions:
  - Web Expert, TD Lab
  - Lead Developer
  - Tech Advisor
  - Angular / TypeScript
  - NgRx State Management
  - Angular Material
  - Transloco i18n
  - Responsive Charts
  - Accessibility (WCAG)
  - Localization (4 Languages)
  - tdlab.io Website
longDescription: |
  A multilingual, fully accessible student budget calculator for TD Canada Trust — used in-branch with banking advisors and self-serve online — to help students and their families model real education costs and connect with a lending specialist.
---

## Overview

Government student loans in Canada don't cover the full cost of attendance. Most students discover this gap only after they've enrolled — when tuition, housing, groceries, transit, and textbooks start adding up against a loan sized for something smaller. The Student Budget Calculator (SBC) was built to surface that gap early and make it actionable.

Launched on October 2, 2020 and hosted on the [TD Student Advice Hub](https://www.td.com/ca/en/personal-banking/solutions/student-advice), the SBC walks students through five steps to build a complete picture of their post-secondary costs — tuition, living expenses, and everything in between — alongside their expected funding sources: scholarships, bursaries, family contributions, part-time income, and loans. Two real-time meters show costs versus contributions, so the gap is impossible to miss.

The business case was equally clear. Students are HENRY candidates — High Earners Not Rich Yet — and the banks that earn their trust early tend to keep them. The SBC positioned TD not as a lender pushing products but as a genuine financial literacy resource, converting student relationships into long-term ones.

## Origin

The idea came from the students themselves. In summer 2019, [TD Lab](https://www.td.com/ca/en/about-td/who-we-are/innovation) — TD's innovation team at the Communitech Hub in Kitchener-Waterloo — challenged their co-op students to solve a real problem in student banking. Two interns, Estelle Chung and Tri Nhan Nguyen, were paired up. They researched what already existed and found that every bank had some version of a student budget tool. Every single one was a variation of a spreadsheet.

They built something different: visual, fast, mobile-friendly, and focused on financial literacy rather than product upselling. Their prototype was tested with focus groups of 50 students, then refined with feedback from over 300 students at Wilfrid Laurier University via TD Lab's dedicated research platform, tdlab.io.

The concept was strong enough to move from prototype to production — and the work eventually yielded a patent. [US20220084111A1](https://patents.google.com/patent/US20220084111A1/en), *Systems and Methods for Managing Resource Accounts*, was filed by Toronto Dominion Bank in September 2020 and published in March 2022. It covers the method of aggregating anonymized transaction data across peer accounts to surface realistic cost benchmarks for students in similar programs and situations.

## My Role

As TD Lab's web expert, I was the go-to for anything that lived in a browser. That included building tdlab.io, the student research platform the team used to share early-stage concepts with university students and collect feedback during prototyping. For the SBC itself, I led the full front-end build and made the technical architecture decisions that would carry it through four languages, every screen size, and TD's strict accessibility requirements.

## Technical Architecture

The SBC is a single-page Angular application built with TypeScript. The choice of Angular was deliberate — TD's design system and internal tooling were already Angular-aligned, and the framework's opinionated structure made it easier to enforce consistency across a team and audit for compliance.

**State Management with NgRx**

Budget calculations involve a lot of interdependent values. Changing a tuition figure ripples into total costs, funding gaps, and chart data simultaneously. I used NgRx (Redux for Angular) to manage this state centrally. All inputs flow into a single store, and derived values are computed via selectors — making the calculation logic testable in isolation and the UI purely reactive.

**Transloco for Localization**

The app is fully localized into four languages: English, French, Simplified Chinese, and Traditional Chinese. Transloco handles runtime language switching without a page reload, which was important for in-branch use where an advisor might switch languages mid-session for a client. All string keys, number formats, and currency displays adapt accordingly.

**Angular Material + Custom Theming**

The UI is built on Angular Material, themed to TD's brand. Material gave us a solid accessible baseline for form controls, dialogs, and interactive elements — TD's accessibility requirements are strict, and starting from a well-audited component library significantly reduced the compliance surface area to manage.

**Responsive Charts**

Budget breakdowns are visualized as charts that adapt to screen size — not just scaled down, but re-laid out. On smaller viewports, chart labels reposition and legends collapse to keep the data readable without horizontal scrolling. Chart dimensions are bound to the Angular change detection cycle so they update live as users adjust inputs.

## Accessibility

The SBC meets WCAG 2.1 AA compliance, which is a hard requirement for TD's public-facing products.

Every interaction in the app is reachable and operable by keyboard alone — tab order follows a logical reading sequence, and interactive controls expose clear focus states. All form inputs, charts, and dynamic content regions carry appropriate ARIA labels and live region announcements so screen readers can follow along as values update in real time. The color palette satisfies contrast ratio minimums across both light and dark states.

Accessibility wasn't bolted on at the end. ARIA attributes were baked into components during build, and I tested continuously with VoiceOver and NVDA throughout development.

## Localization

Supporting four writing systems, including Simplified and Traditional Chinese, required more than just swapping strings. Typography sizing, line heights, and container widths had to accommodate the density and character width variation between Latin and CJK scripts. Number formatting follows locale conventions for each target market.

Language is persisted across sessions so returning users don't have to reset their preference.

## Outcome

Before the SBC launched, TD's student loan pages were effectively invisible — pulling single-digit views annually and generating no meaningful loan conversions. The Student Advice Hub had no real reason for students to visit, share, or return.

After launch, traffic jumped to thousands of visits and the loan pipeline came back to life. For the first time, TD's student lending team had organic, qualified inbound interest from students who had already done the math and were ready to talk. The tool got shared on its own — passed between students, posted in campus forums, linked in financial literacy resources.

That organic reach has compounded. The TD Stories article, the Student Advice Hub, and the calculator itself all still rank. Every link in this case study was found through a plain Google search — no internal TD portals or archived documents required. That's rare for a tool nearly five years old, and it reflects what happens when a product leads with genuine utility rather than a sales pitch.
