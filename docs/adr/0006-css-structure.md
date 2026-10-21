---
status: accepted
date: 2026-10-20
---

# Style with CSS Modules and global variables

## Context and Problem Statement
The app needs scoped component styles, a shared design system, and parity with figma.

## Considered Options
* Plain global CSS
* CSS Modules + global CSS variables
* CSS-in-JS
* Tailwind

## Decision Outcome
Chosen option: "CSS Modules + global CSS variables"

Reasoning: because variables on :root can be used everywhere to keep components consistent, while modules are scoped and stored alongside the component so all code concerning each component lives together in the same place.