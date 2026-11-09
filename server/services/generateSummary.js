import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ api: GEMINI_API_KEY });

function flattenArticles(articles) {
  let textArr = [];
  articles.map((a, i) => {
    textArr.push(
      `${i+1}. Heading: ${a.title}`,
      `Description: ${a.description}\n`
    );
  });
  return textArr.join('\n');
}

function buildPrompt(articles) {
  return `
You are creating a summary of today's news for a reader. Your response should only contain this summary.
It should be easy to digest and use neutral, factual tone (no opinion).
You may categorise the articles and create short bullet points to generateSummary each category rather than individual articles.
Examples of categories are:
- International
- Politics
- Technology
- Medicine
- Sports
- Finance
You do not need to include every category, nor every single article. You should focus on significant stories to make the summary concise.

Mention only the content from the following articles:
${articles}
  `;
}

/**
 * Generates a news summary from a block of article text using Gemini.
 * @param articles - List of articles to summarise from.
 * @returns {string} - The generated summary text.
 */
export async function generateSummary(articles) {
  const flatArticles = flattenArticles(articles);
  const prompt = buildPrompt(flatArticles);

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: prompt
  });

  return response.text;
}

export async function refreshSummary(summary, articles) {
  console.log('prevSummary: ', summary);
  const flatArticles = flattenArticles(articles);
  console.log('flatArticles.length', flatArticles.length);
  const prompt = `
 You are updating a summary of today's news to a reader. Your response should only contain this summary.
 Here is the current summary for this news feed:
 ${summary}
 
 Please update the summary to include any significant stories form the following articles:
 ${flatArticles}

 Do not alter the facts already described in the current summary, unless one of the new articles is a direct update to an ongoing story.
 You may update the categories if a better grouping can be made with the new articles.
 Your additions should be easy to digest and use neutral, factual tone (no opinion).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: prompt
  });

  return response.text;
}
