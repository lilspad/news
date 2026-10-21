import sourceNames from '../../src/data/source-names.json' with {type: 'json'};

const ALLOWED = new Set(Object.keys(sourceNames));

function getSource(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function isNull(value) {
  return !value || value === "None";
}

function hasContent(article) {
  const requiredFields = ['title', 'description'];
  return requiredFields.every((field) => !isNull(article[field]));
}

function isAllowedSource(article) {
  return ALLOWED.has(getSource(article.url));
}

/**
 * Filter raw API articles to trustworthy sources.
 *
 * Drops articles missing a title or description (including the "None"
 * placeholder), drops any from a source not in the allowlist.
 *
 * @param {object[]} articles - Raw article objects from the API response.
 * @returns {object[]} The articles that passed every check.
 */
export function filterArticles(articles) {
  return articles.filter(article => {
    if (!hasContent(article)) return false;
    if (!isAllowedSource(article)) return false;
    return true;
  })
}
