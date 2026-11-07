import { ArticleCard, SkeletonCard } from '@components/ArticleCard';
import type { Article, Status } from '@/types';
import styles from './Feed.module.css';
import { Newsletter } from '@icons/Newsletter';

interface FeedProps {
  data: Article[];
  status: Status;
}

export function Feed ({ data, status }: FeedProps) {
  if ( status === 'loading' ) {
    return (
      <>
        <div className={styles['feed']}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles['feed--error']}>
        <div className={styles['feed--icon']}>
          <Newsletter />
        </div>
        <h2>No articles found</h2>
      </div>
    );
  }
  if (status === 'error' || data.length === 0) {
    return (
      <div className={styles['feed--error']}>
        <div className={styles['feed--icon']}>
          <Newsletter />
        </div>
        <h2>Something went wrong.</h2>
      </div>
    );
  }

  return (
    <div className={styles['feed']}>
      {data.map((entry) => (
        <ArticleCard key={entry.id} {...entry} />
      ))}
    </div>
  );
}
