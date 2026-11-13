import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>That's today, In a Nutshell. Full stories at the original source.</p>
      <p className='type-meta'>Illustrative stories · Not verified current news</p>
    </footer>
  );
}