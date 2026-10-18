import { ArticleCard } from '@components/ArticleCard';
import type { Article } from 'src/types';
import styles from './Feed.module.css';

interface FeedProps {
  data: Article[];
}

export function Feed ({ data }: FeedProps) {
  return (
    <div className={styles['feed']}>
      {data.map((entry) => (
        <ArticleCard key={entry.url} {...entry}></ArticleCard>
      ))}
    </div>
  );
}
