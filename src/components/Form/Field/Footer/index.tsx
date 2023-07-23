import classNames from 'classnames'

import styles from './styles.module.css'

export interface FooterProps {
  fieldMsgId: string
  hint?: string | React.ReactNode
  error?: string | React.ReactNode
  hintAlign?: 'left' | 'right'
}

const Footer: React.FC<FooterProps> = ({
  fieldMsgId,
  hint,
  error,
  hintAlign = 'left',
}) => {
  const hintClasses = classNames({
    [styles.hint]: true,
    [styles.alignRight]: hintAlign === 'right',
    [styles.error]: !!error,
  })

  if (!hint && !error) {
    return null
  }

  return (
    <footer className={styles.footer} id={fieldMsgId}>
      {hint && !error && <div className={hintClasses}>{hint}</div>}

      {error && (
        <div role="alert" aria-live="polite" className={hintClasses}>
          {error}
        </div>
      )}
    </footer>
  )
}

export default Footer
