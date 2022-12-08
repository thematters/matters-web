import styles from './styles.css'

export interface FooterProps {
  fieldMsgId: string
  hint?: string | React.ReactNode
  error?: string | React.ReactNode
}

const Footer: React.FC<FooterProps> = ({ fieldMsgId, hint, error }) => (
  <footer id={fieldMsgId}>
    {hint && !error && <div className="hint">{hint}</div>}
    {error && (
      <div role="alert" aria-live="polite" className="error">
        {error}
      </div>
    )}

    <style jsx>{styles}</style>
  </footer>
)

export default Footer
