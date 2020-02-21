import styles from './styles.css'

export interface FooterProps {
  hint?: string | React.ReactNode
  error?: string | React.ReactNode
}

const Footer: React.FC<FooterProps> = ({ hint, error }) => (
  <footer>
    {hint && !error && <div className="hint">{hint}</div>}
    {error && <div className="error">{error}</div>}

    <style jsx>{styles}</style>
  </footer>
)

export default Footer
