---
status: accepted
date: 2026-10-19
---

# MAnually parse date formatting with Intl (no date library)

## Context and Problem Statement
Currents returns dates like "2026-03-24 11:10:00 +0000" (string), which `new Date()` parses unreliably across browsers. The feed needs relative labels ("2 hours ago") that are correct per time zone and locale.

## Considered Options
* Pass the string straight to `new Date()`
* date-fns
* Luxon
* dayjs
* A small custom service using the built-in `Intl` APIs

## Decision Outcome
Chosen option: "custom service with Intl"

Reasoning: it adds no dependency.