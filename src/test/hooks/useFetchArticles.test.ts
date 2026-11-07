import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { useFetchArticles } from '@hooks/useFetchArticles';

afterEach(() => vi.restoreAllMocks());

test('loads articles and parses dates', async () => {
  const payload = [
    { title: 'Hi', publishedAt: '2026-11-07T10:00:00Z' /* ...rest of Article */ },
  ];
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => payload,
  }));

  const { result } = renderHook(() => useFetchArticles());

  expect(result.current.status).toBe('loading');

  await waitFor(() => expect(result.current.status).toBe('ready'));
  expect(result.current.articles[0].publishedAt).toBeInstanceOf(Date);
});

test('sets error status on a failed request', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

  const { result } = renderHook(() => useFetchArticles());

  await waitFor(() => expect(result.current.status).toBe('error'));
});