---
status: accepted
date: 2026-10-19
---

# Use an adapter to convert API response to a desired format

## Context and Problem Statement
The Currents response is non-standard (a non-ISO date format, no publisher display name, "None" (string) for missing fields)..

## Considered Options
* Use the raw API shape directly in components
* Map the raw response into an internal `Article` type via an adapter

## Decision Outcome
Chosen option: "adapter"

Reasoning: Components consume a clean `Article` type and never see the raw response that needs parsing. This also makes switching APIs later more feasible, if needed.