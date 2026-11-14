import { describe, test, expect } from 'vitest';
import { resolveCitations, formatSummary } from '../../services/formatSummary.js';

describe('resolveCitations', () => {
  test('resolves a single marker to a source link', () => {
    const text = '- Outage hit Asia <_UID_a_UID_>.';
    const citations = { a: { source: 'BBC', url: 'https://bbc.com/x' } };
    expect(resolveCitations(text, citations)).toBe(
      '- Outage hit Asia [BBC](https://bbc.com/x).'
    );
  });

  test('resolves multiple markers on one line', () => {
    const text = '- Big outage <_UID_a_UID_> <_UID_b_UID_>.';
    const citations = {
      a: { source: 'BBC', url: 'u1' },
      b: { source: 'Reuters', url: 'u2' },
    };
    expect(resolveCitations(text, citations)).toBe(
      '- Big outage [BBC](u1) [Reuters](u2).'
    );
  });

  test('leaves text without markers unchanged', () => {
    const text = '- A plain bullet with no citation.';
    expect(resolveCitations(text, {})).toBe(text);
  });

  test('strips a marker whose id is not in citations', () => {
    const text = '- Claim <_UID_ghost_UID_>.';
    expect(resolveCitations(text, {})).toBe('- Claim .');
  });
});

describe('formatSummary', () => {
  test('resolves markers across categories', () => {
    const summary = {
      categories: [{ category: 'Tech', text: '- Outage <_UID_a_UID_>.' }],
      citations: { a: { source: 'BBC', url: 'u' } },
    };
    expect(formatSummary(summary)).toEqual({
      categories: [{ category: 'Tech', text: '- Outage [BBC](u).' }],
    });
  });

  test('strips markers when citations are absent', () => {
    const summary = {
      categories: [{ category: 'Tech', text: '- X <_UID_a_UID_>.' }],
    };
    expect(formatSummary(summary)).toEqual({
      categories: [{ category: 'Tech', text: '- X .' }],
    });
  });
});
