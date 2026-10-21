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
  requiredFields.forEach(field => {
    if (isNull(article[field])) return false;
  });
  return true;
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
