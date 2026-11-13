import { useSyncExternalStore } from 'react';
import { formatTimestamp } from '@services/formatTimestamp';

const TICK_MS = 30 * 1000;

const listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (intervalId === null) {
    intervalId = setInterval(() => listeners.forEach((l) => l()), TICK_MS);
  }
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

const getSnapshot = () => Math.floor(Date.now() / TICK_MS);

export function useRelativeTime(date: Date): string {
  useSyncExternalStore(subscribe, getSnapshot);
  return formatTimestamp(date);
}