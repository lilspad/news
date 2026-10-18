const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

// Only units within the relative window, nothing bigger than a day is needed
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
  ['second', 1],
];

// Older than this, show an absolute date instead of a relative label
const RELATIVE_LIMIT = 60 * 60 * 24 * 3; // 3 days

/**
 * Format a date to a string value relative to the viewer's current time, e.g "2 hours ago"
 * Will display the exact date if it's been more than 2 days.
 * 
 * @param date - a Date object to compare
 * @returns a string to display to the user, either as relative-to-now phrase or the exact date
 * @example
 * formatTimestamp(new Date(Date.now() - 3_600_000)) // "1 hour ago"
 */
export function formatTimestamp(date: Date): string {
  const seconds = Math.round((date.getTime() - Date.now()) / 1000);

  if (Math.abs(seconds) >= RELATIVE_LIMIT) {
    return date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  for (const [unit, secondsInUnit] of UNITS) {
    if (Math.abs(seconds) >= secondsInUnit || unit === 'second') {
      return rtf.format(Math.round(seconds / secondsInUnit), unit);
    }
  }
  return '';
}