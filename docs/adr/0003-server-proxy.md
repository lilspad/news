---
status: accepted
date: 2026-10-17
---

# Call the news API through a Node/Express proxy

## Context and Problem Statement
The Currents API requires an API key and does not allow browser requests
(no permissive CORS). The key must not be exposed in client code.

## Considered Options
* Call Currents directly from the browser
* A serverless function
* A small Node/Express proxy

## Decision Outcome
Chosen option: "Node/Express proxy"

Reasoning: calling the API from the browser would expose the key and be blocked by CORS. A standalone server teaches more backend and deployment skills than a serverless function, and it can also host the later LLM summary route. Trade-off: a second deploy target will be needed for a live demo.