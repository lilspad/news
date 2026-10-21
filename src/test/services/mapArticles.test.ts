import { describe, it, expect } from 'vitest';
import { mapArticle, mapArticles } from '@/services/mapArticle';

const raw = {
  id: '1',
  title: 'Test headline',
  description: 'A description.',
  url: 'https://www.bbc.co.uk/news/science-123',
  author: 'Jane Doe',
  image: 'https://example.com/img.jpg',
  language: 'en',
  category: ['science_technology'],
  published: '2026-03-24 11:10:00 +0000',
};

describe('mapArticle', () => {
  it('maps the shared fields through', () => {
    const a = mapArticle(raw);
    expect(a.id).toBe(raw.id);
    expect(a.title).toBe(raw.title);
    expect(a.url).toBe(raw.url);
    expect(a.category).toEqual(raw.category);
  });

  it('derives the source name from the url', () => {
    expect(mapArticle(raw).source).toBe('BBC News');
  });

  it('parses the published date to the correct instant', () => {
    expect(mapArticle(raw).publishedAt?.toISOString()).toBe('2026-03-24T11:10:00.000Z');
  });

  it('converts "None" image and author to null', () => {
    const a = mapArticle({ ...raw, image: 'None', author: 'None' });
    expect(a.imageUrl).toBeNull();
    expect(a.author).toBeNull();
  });
});

describe('mapArticles', () => {
  it('maps a list of articles', () => {
    const result = mapArticles([raw, { ...raw, id: '2' }]);
    expect(result).toHaveLength(2);
    expect(result[1].id).toBe('2');
  });
});