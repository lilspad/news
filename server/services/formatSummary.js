function stripUnresolvedMarkers(text) {
  // negating `>` so it always stops at the nearest closing marker
  return text.replace(/<_UID_[^>]*_UID_>/g, '');
}

export function resolveCitations(text, citations) {
  if (!citations || !(citations instanceof Map) || citations.length === 0) {
    return stripUnresolvedMarkers(text);
  }

  let resolved = text;
  for (const [id, { source, url }] of [...citations]) {
    resolved = resolved.replaceAll(`<_UID_${id}_UID_>`, `[${source}](${url})`);
  }

  return stripUnresolvedMarkers(resolved);
}

/**
 * Prepares a stored summary for the client by resolving its citation markers
 * into markdown source links. Leaves the stored document untouched and returns
 * a new object.
 *
 * @param {Object} summary - A summary document.
 * @returns {Object} The summary with each category's markers replaced by links
 */
export function formatSummary(summary) {
  const citations = summary.citations ?? {};
  return {
    categories: summary.categories.map(c => ({
      category: c.category,
      text: resolveCitations(c.text, citations),
    }))
  };
}