import sourceNames from '@data/source-names.json';

const SOURCE_NAMES = sourceNames;

export function getSource(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export function getSourceName(url: string): string {
  const host = getSource(url);
  return SOURCE_NAMES[host] || host;
}