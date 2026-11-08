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

function cleanValue(value) {
  return (
    value === 'None' ||
    value === '' ||
    value?.length === 0
  ) ? null : value;
}

function toStored(article) {
  const published = new Date(article.published);
  if (isNaN(published)) return null;
  return {
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: cleanValue(article.image),
    author: cleanValue(article.author),
    source: sourceFromUrl(article.url),
    category: cleanValue(article.category),
    publishedAt: published,
  };
}

/**
 * Fetches, filters, and upserts articles into the database.
 * Existing articles (matched by id) are left unchanged; only new ones are inserted.
 * @returns {Promise<Object>} Import meta.
*/
export async function importArticles() {
  const timestamp = Date.now();
  const raw = await fetchArticles();
  const filtered = filterArticles(raw);

  const ms = 1000 * 60;
  let newest = null, oldest = null;
  if (filtered.length > 0) {
    const dates = filtered.map(a => new Date(a.published).getTime());
    // newest and oldest posts' relative ages in minutes
    // oldest only if there are more than 1 post
    newest = (timestamp - Math.max(...dates)) / ms;
    if (filtered.length > 1) {
      oldest = (timestamp - Math.min(...dates)) / ms;
    }
  }

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

  const logs = {
    importTime: timestamp,
    itemsReceived: raw.length,
    itemsKept: filtered.length,
    itemsInserted: inserted,
    newestPostAgeMinutes: newest,
    oldestPostAgeMinutes: oldest
  };

  return logs;
}
