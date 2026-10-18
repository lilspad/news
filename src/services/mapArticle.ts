import { parsePublished } from './parsePublished';
import { getSourceName } from './getSourceName';
import type { Article } from 'src/types';

interface CurrentsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language: string;
  category: string[];
  published: string;
}

function cleanNone(value: string): string | null {
  return !value || value === 'None' ? null : value;
}

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

export function mapArticles(raw: CurrentsArticle[]): Article[] {
  return raw.map(mapArticle);
}