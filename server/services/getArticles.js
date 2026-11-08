import { Article } from '../models/articles.js';

const HOUR_MS = 1000 * 60 * 60;
const WINDOW_HOURS = 24;

/**
 * Fetches articles published in the last 24 hours from the
 * database, newest first.
 * @returns Articles list sorted by publishedAt descending.
 */
export async function getArticles() {
  const last24Hours = new Date(Date.now() - WINDOW_HOURS * HOUR_MS);
  const articles = await Article
    .find({ publishedAt: { $gte: last24Hours } })
    .sort({ publishedAt: -1 });
  return articles;
}
