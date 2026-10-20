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

  const data: { news: CurrentsArticle[] } = await res.json();
  return mapArticles(data.news);
}

export function useFetchArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        setArticles(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return { articles, status };
}
