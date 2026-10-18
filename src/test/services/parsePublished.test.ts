import { describe, it, expect } from 'vitest';
import { parsePublished } from '@services/parsePublished';

describe('parsePublished', () => {
  it('parses the Currents format into the correct instant', () => {
    const date = parsePublished('2026-03-24 11:10:00 +0000');
    expect(date?.toISOString()).toBe('2026-03-24T11:10:00.000Z');
  });

  it('handles a non-zero offset', () => {
    const date = parsePublished('2026-03-24 11:10:00 -0500');
    expect(date?.toISOString()).toBe('2026-03-24T16:10:00.000Z');
  });
});