import { useEffect, useState } from 'react';
import type { Article, Status } from '@/types';
import { mapArticles } from '@/services/mapArticle';
import mockResponse from '@data/mock-response.json';

function fakeFetch(): Promise<Article[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mapArticles(mockResponse.news)), 5000)
  );
}

export function useFetchArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    fakeFetch()
      .then((data) => {
        setArticles(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return { articles, status };
}
