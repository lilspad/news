import { Article } from '../models/articles.js';
import { filterArticles } from './filterArticles.js';
import { fetchArticles } from './fetchArticles.js';

function sourceFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return undefined;
  }
}

function toStored(article) {
  const published = new Date(article.published);
  return {
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.image || null,
    author: article.author || null,
    source: sourceFromUrl(article.url),
    category: article.category,
    publishedAt: isNaN(published) ? new Date() : published,
  };
}

export async function importArticles() {
  const raw = await fetchArticles();
  const filtered = filterArticles(raw);

  const bulkOps = filtered.map(article => ({
    updateOne: {
      filter: { _id: article.id },
      update: { $setOnInsert: toStored(article) },
      upsert: true,
    },
  }));

  let inserted = 0;
  if (bulkOps.length) {
    const result = await Article.bulkWrite(bulkOps, { ordered: false });
    inserted = result.upsertedCount ?? 0;
  }

  const summary = { raw: raw.length, filtered: filtered.length, inserted };
  console.log('Import:', summary);
  return summary;
}
