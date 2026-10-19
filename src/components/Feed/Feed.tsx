import { ArticleCard } from '@components/ArticleCard';
import type { Article, Status } from 'src/types';
import styles from './Feed.module.css';
import { Newsletter } from '@icons/Newsletter';

interface FeedProps {
  data: Article[];
  status: Status;
}

export function Feed ({ data, status }: FeedProps) {
  if (status === 'error') {
    return (
      <div className={styles['feed--error']}>
        <div className={styles['feed--icon']}>
          <Newsletter />
        </div>
        <h2>No articles found</h2>
      </div>
    );
  }
  if ( status === 'loading' ) {
    return (
      <div className={styles['feed']}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCard key={i} status={status}></ArticleCard>
        ))}
      </div>
    );}

  return (
    <div className={styles['feed']}>
      {data.map((entry) => (
        <ArticleCard key={entry.id} status={status} article={entry}></ArticleCard>
      ))}
    </div>
  );
}
