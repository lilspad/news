import { useEffect, useState } from 'react';
import type { Article, CurrentsArticle, Status } from '@/types';
import { mapArticles } from '@/services/mapArticle';

async function fetchArticles() {
  const res = await fetch('/api/news', {
    headers: {
      'Authorization': 'YOUR_API_KEY'
    }
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const articles: CurrentsArticle[] = await res.json();
  return mapArticles(articles);
}

/**
 * Fetch the articles and track the request's status.
 * 
 * Initial state is set to 'loading' and updated to 'ready'
 * on success and 'error' on failure.
 * 
 * @returns Article[] and Status
 */
export function useFetchArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    fetchArticles()
      .then((articles) => {
        setArticles(articles);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return { articles, status };
}
