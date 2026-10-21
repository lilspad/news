---
status: accepted
date: 2026-10-17
---

# Use the Currents API as the news source

## Context and Problem Statement
The app needs a free news API that works on a deployed site and returns
enough requests for development and a live demo.

## Considered Options
* NewsAPI.org (free tier is localhost/development only)
* GNews (100 requests/day, past week only)
* NewsData.io (200 requests/day, cleaner data)
* Currents (600 requests/day, works in production)

## Decision Outcome
Chosen option: "Currents"

Reasoning: its free tier works on a deployed site (NewsAPI.org's does not) and has the most generous daily limit. NewsData.io is kept as a fallback if Currents' data quality proves too inconsistent.
