import { Summary } from '../models/summary.js';
import { generateSummary, refreshSummary } from './generateSummary.js';

function mapFromArticles(articles) {
  const map = {};
  for (const a of articles) map[a.id] = { source: a.source, url: a.url };
  return map;
}

/**
 * Generates a summary and saves it to the database.
 * @param {Array<Object>} articles - Articles list to include in the summary.
 * @returns {Promise<void>}
 */
export async function importSummary(articles, incremental = false) {
  const prevSummary = await Summary.findOne().sort({ generatedAt: -1 });
  let result;
  if (incremental) {
    result = await refreshSummary(prevSummary.categories, articles);
  } else {
    result = await generateSummary(articles);
  }
  try {
    const parsedResult = JSON.parse(result);
    const prevCitations = incremental ? Object.fromEntries(prevSummary.citations) : {};
    const citations = {
      ...prevCitations,
      ...mapFromArticles(articles)
    };

    await Summary.create({ categories: parsedResult, citations, incremental });
  } catch (e) {
    console.error('Could not import summary: ', e);
  }
}
