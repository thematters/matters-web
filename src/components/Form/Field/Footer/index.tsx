import classNames from 'classnames'

import styles from './styles.module.css'

export interface FooterProps {
  fieldMsgId: string
  hint?: string | React.ReactNode
  error?: string | React.ReactNode
  hintSize?: 'xs' | 'sm'
  hintAlign?: 'left' | 'right' | 'center'
  hintSpace?: 'xTight' | 'baseLoose'
}

const Footer: React.FC<FooterProps> = ({
  fieldMsgId,
  hint,
  error,
  hintSize = 'xs',
  hintAlign = 'left',
  hintSpace = 'xTight',
}) => {
  const footerClasses = classNames({
    [styles.footer]: true,
    [styles.spaceBaseLoose]: hintSpace === 'baseLoose',
  })

  const hintClasses = classNames({
    [styles.hint]: true,
    [styles.hintSizeSm]: hintSize === 'sm',
    [styles.alignRight]: hintAlign === 'right',
    [styles.alignCenter]: hintAlign === 'center',
    [styles.error]: !!error,
  })

  if (!hint && !error) {
    return null
  }

  return (
    <footer className={footerClasses} id={fieldMsgId}>
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
