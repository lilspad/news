import styles from './ArticleCard.module.css';

export function SkeletonCard () {
  return (
    <article className={styles['skeleton-card']} aria-hidden="true">
      <div className={styles['skeleton-card--body']}>
        <div className={styles['skeleton-card--meta']}>
          <span className={styles['skeleton-card--source']}></span>
          <span></span>
        </div>
        <span className={styles['skeleton-card--heading']}></span>
        <div>  
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </article>
  );
}
