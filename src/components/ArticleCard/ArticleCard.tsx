import styles from './ArticleCard.module.css';
import OpenInNew from '@components/icons/OpenInNew';
import { useRelativeTime } from '@hooks/useRelativeTime';
import type { Article } from '@/types';

export function ArticleCard ({
  title,
  description,
  url,
  source,
  publishedAt,
  category,
  imageUrl,
}: Article) {
  return (
    <article className={styles['article-card']}>
      {imageUrl &&
      <div className={styles['article-card--image-container']}>
        <img src={imageUrl} />
      </div>
      }
      <div className={styles['article-card--body']}>
        <div>
          <span className={styles['article-card--category']}>
            {category ? category.length > 0 && category.join('︱') : ''}
          </span>
        </div>
        <h2><a href={url} className={styles['article-card--link']}>{title}</a></h2>
        <p>{description}</p>
        <div className={styles['article-card--meta']}>
          <span className={styles['article-card--time']}>
            <time>{useRelativeTime(publishedAt)}</time>
          </span>
          <span className={styles['article-card--source']}>{source}<OpenInNew /></span>
        </div>
      </div>
    </article>
  );
}
