export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string | null;
  author: string | null;
  source: string;
  category: string[];
  publishedAt: Date;
}

export interface CurrentsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language: string;
  category: string[];
  published: string;
}

export type Status = 'loading' | 'error' | 'ready';
