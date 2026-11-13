import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { formatTimestamp } from '@services/formatTimestamp';

describe('formatTimestamp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-24T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows seconds for recent items', () => {
    expect(formatTimestamp(new Date('2026-03-24T11:59:30Z'))).toBe('30 seconds ago');
  });

  it('shows minutes for recent items', () => {
    expect(formatTimestamp(new Date('2026-03-24T11:55:00Z'))).toBe('5 minutes ago');
  });

  it('shows hours for recent items', () => {
    expect(formatTimestamp(new Date('2026-03-24T09:00:00Z'))).toBe('3 hours ago');
  });

  it('shows days for recent items', () => {
    expect(formatTimestamp(new Date('2026-03-23T12:00:00Z'))).toBe('yesterday');
    expect(formatTimestamp(new Date('2026-03-22T12:00:00Z'))).toBe('2 days ago');
  });

  it('switches to an absolute date beyond the limit', () => {
    expect(formatTimestamp(new Date('2026-03-01T12:00:00Z'))).not.toMatch(/ago/);
  });
});