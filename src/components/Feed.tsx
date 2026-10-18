import { ArticleCard } from '@components/ArticleCard';
import type { Article } from 'src/types';

interface FeedProps {
  data: Article[];
}

export function Feed ({ data }: FeedProps) {
  return (
    <div>
      {data.map((entry) => (
        <ArticleCard key={entry.url} {...entry}></ArticleCard>
      ))}
    </div>
  );
}
