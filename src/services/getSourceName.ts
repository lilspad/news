import sourceNames from '@data/source-names.json';

const SOURCE_NAMES = sourceNames;

/**
 * Extract the hostname from article URL
 * 
 * @param url
 * @returns hostname with the 'www.' prefix stripped
 */
export function getSource(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/**
 * Match the source domain to a user-friendly display name.
 * Extracts the domain from URL using getSource(url)
 * 
 * @param url
 * @returns string to be displayed in the UI
 */
export function getSourceName(url: string): string {
  const host = getSource(url);
  return SOURCE_NAMES[host] || host;
}