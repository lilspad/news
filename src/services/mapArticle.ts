import { parsePublished } from './parsePublished';
import { getSourceName } from './getSourceName';
import type { Article, CurrentsArticle } from 'src/types';

function cleanNone(value: string): string | null {
  return !value || value === 'None' ? null : value;
}

/**
 * Map the raw API response to a desired Article type.
 * 
 * @param raw - a raw article as returned by the Currents API
 * @returns an Article safe to use across the app
 */
export function mapArticle(raw: CurrentsArticle): Article {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    url: raw.url,
    imageUrl: cleanNone(raw.image),
    author: cleanNone(raw.author),
    source: getSourceName(raw.url),
    category: raw.category ?? [],
    publishedAt: parsePublished(raw.published),
  };
}

/**
 * Map the raw API response to a desired Article[] type.
 * 
 * @param raw - a raw article array as returned by the Currents API
 * @returns an Article array safe to use across the app
 */
export function mapArticles(raw: CurrentsArticle[]): Article[] {
  return raw.map(mapArticle);
}