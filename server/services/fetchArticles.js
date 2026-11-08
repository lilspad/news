const URL = 'https://api.currentsapi.services/v1/latest-news';


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