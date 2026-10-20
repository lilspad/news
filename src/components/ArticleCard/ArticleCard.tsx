import styles from './ArticleCard.module.css';
import OpenInNew from '@components/icons/OpenInNew';
import { formatTimestamp } from '@services/formatTimestamp';
import type { Article } from '@/types';

export function ArticleCard ({
  title,
  description,
  url,
  source,
  publishedAt
}: Article) {
  return (
    <article className={styles['article-card']}>
      <div className={styles['article-card--body']}>
        <div className={styles['article-card--meta']}>
          <span className={styles['article-card--source']}>{source}</span>
          <span className={styles['article-card--time-icon']}><time>{formatTimestamp(publishedAt)}</time><OpenInNew /></span>
        </div>
        <h2><a href={url} className={styles['article-card--link']}>{title}</a></h2>
        <p>{description}</p>
      </div>
    </article>
  );
}
