import { useEffect, useState } from 'react';
import type { Status } from '@/types';

async function fetchSummary() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/summary`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const summary: { text: string } = await res.json();
  return summary.text;
}

/**
 * Fetch the summary and track the request's status.
 * 
 * Initial state is set to 'loading' and updated to 'ready'
 * on success and 'error' on failure.
 * 
 * @returns summary: string and Status
 */
export function useFetchSummary() {
  const [summary, setSummary] = useState<string>('');
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    fetchSummary()
      .then((summary) => {
        setSummary(summary);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return { summary, status };
}
