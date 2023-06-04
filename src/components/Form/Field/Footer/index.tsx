import styles from './styles.module.css'

export interface FooterProps {
  fieldMsgId: string
  hint?: string | React.ReactNode
  error?: string | React.ReactNode
}

const Footer: React.FC<FooterProps> = ({ fieldMsgId, hint, error }) => (
  <footer className={styles.footer} id={fieldMsgId}>
    {hint && !error && <div className={styles.hint}>{hint}</div>}
    {error && (
      <div role="alert" aria-live="polite" className={styles.error}>
        {error}
      </div>
    )}
  </footer>
)

export default Footer
