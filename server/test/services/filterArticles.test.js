import { describe, it, expect } from 'vitest';
import { filterArticles } from '../../services/filterArticles.js';

const good = {
  title: 'Article 1',
  description: 'Article description',
  url: 'https://www.reuters.com/world/example',
};

describe('filterArticles', () => {
  it('keeps an allowlisted article with content', () => {
    expect(filterArticles([good])).toHaveLength(1);
  });

  it('drops an article whose title is "None"', () => {
    expect(filterArticles([{ ...good, title: 'None' }])).toHaveLength(0);
  });

  it('drops an article with an empty description', () => {
    expect(filterArticles([{ ...good, description: '' }])).toHaveLength(0);
  });

  it('drops an article from a non-allowlisted source', () => {
    expect(
      filterArticles([{ ...good, url: 'https://www.randomblog.com/x' }])
    ).toHaveLength(0);
  });

  it('keeps only the valid articles from a mixed list', () => {
    const result = filterArticles([
      good,
      { ...good, title: 'None' },
      { ...good, url: 'https://www.randomblog.com/x' },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe(good.url);
  });

  it('returns an empty array for an empty input', () => {
    expect(filterArticles([])).toEqual([]);
  });
});