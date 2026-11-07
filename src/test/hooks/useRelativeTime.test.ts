import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { useRelativeTime } from '@hooks/useRelativeTime';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

test('label updates as time passes without a re-render', () => {
  const date = new Date();
  const { result } = renderHook(() => useRelativeTime(date));

  expect(result.current).toBe('now');

  act(() => {
    vi.advanceTimersByTime(60 * 1000);
  });

  expect(result.current).toBe('1 minute ago');
});