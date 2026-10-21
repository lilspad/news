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

export function filterArticles(articles) {
  return articles.filter(article => {
    if (!hasContent(article)) return false;
    if (!isAllowedSource(article)) return false;
    return true;
  })
}
