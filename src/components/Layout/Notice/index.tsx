import { Alert } from '@reach/alert'
import classNames from 'classnames'

import styles from './styles.module.css'

/**
 * A fixed notice in <Layout.Main>.
 *
 * Usage:
 *
 * ```jsx
 * <Layout.Notice color="green" content="content" />
 * ```
 */

export interface LayoutNoticeProps {
  color: 'green' | 'grey' | 'red'
  content?: string | React.ReactNode
  subDescription?: string | React.ReactNode

  customButton?: React.ReactNode
}

const LayoutNotice = ({
  color,
  content,
  subDescription,
  customButton,
}: LayoutNoticeProps) => {
  const mainClasses = classNames({
    [styles.notice]: true,
    [styles[color]]: !!color,
    [styles.centerX]: !customButton,
  })
  const alertType = color === 'red' ? 'assertive' : 'polite'

  return (
    <section>
      <section className={mainClasses}>
        <section>
          <Alert type={alertType}>
            {content && <p className={styles.content}>{content}</p>}
            {subDescription && (
              <p className={styles.subDescription}>{subDescription}</p>
            )}
          </Alert>
        </section>

        {customButton && (
          <section className={styles.customButton}>{customButton}</section>
        )}
      </section>
    </section>
  )
}

export default LayoutNotice
