import { GoogleGenAI, Type } from '@google/genai';
import { GENERATE_PROMPT, REFRESH_PROMPT, SYSTEM_INSTRUCTION } from './prompts/summary.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ api: GEMINI_API_KEY });

const RESPONSE_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      category: { type: Type.STRING },
      text: { type: Type.STRING },
      sources: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ['category', 'text', 'sources'],
    propertyOrdering: ['category', 'text', 'sources'],
  },
};

const CONFIG = {
  systemInstruction: SYSTEM_INSTRUCTION,
  responseMimeType: 'application/json',
  responseSchema: RESPONSE_SCHEMA,
}

function flattenArticles(articles) {
  let textArr = [];
  articles.forEach((a, i) => {
    textArr.push(
      `${i+1}. UID: <_UID_${a.id}_UID_>`,
      `Heading: ${a.title}`,
      `Description: ${a.description}\n`
    );
  });
  return textArr.join('\n');
}

/**
 * Generates a news summary from a block of article text using Gemini.
 * @param articles - List of articles to summarise from.
 * @returns {Array} - The generated summary array of category objects.
 */
export async function generateSummary(articles) {
  const flatArticles = flattenArticles(articles);

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: `
  ${GENERATE_PROMPT}
  Articles: ${flatArticles}
    `,
    config: CONFIG
  });

  return response.text;
}

/**
 * Generates a news summary from a previous summary and articles block.
 * @param summary - a previous summary result
 * @param articles - List of articles to summarise from.
 * @returns {Array} - The generated summary array of category objects.
 */
export async function refreshSummary(summary, articles) {
  const flatArticles = flattenArticles(articles);

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: `
  ${REFRESH_PROMPT}
  Previous summary: ${summary}
  Articles: ${flatArticles}`,
    config: CONFIG
  });

  return response.text;
}
