const URL = 'https://api.currentsapi.services/v1/latest-news';

/**
 * Fetches the latest news from the Currents API.
 * @param {Object} [options] - Pagination options.
 * @param {number} [options.pageSize=20] - Number of articles per page. 20 is the limit on free tier.
 * @param {number} [options.pageNumber=1] - Page number to fetch. 1 is the limit on free tier.
 * @returns {Promise<Array<Object>>} Raw article objects, or an empty array if none.
 * @throws {Error} If the API key is missing or the request fails.
 */
export async function fetchArticles({ pageSize = 20, pageNumber = 1 } = {}) {
  const apiKey = process.env.CURRENTS_API_KEY;
  if (!apiKey) throw new Error('[Currents API] Missing CURRENTS_API_KEY');

  const params = new URLSearchParams({
    page_size: String(pageSize),
    page_number: String(pageNumber),
  });

  const response = await fetch(`${URL}?${params}`, {
    headers: {
      Authorization: apiKey,
    },
  });
  if (!response.ok) {
    throw new Error(`[Currents API] An error occurred: ${response.status}`);
  };

  const data = await response.json();
  return data.news ?? [];
}