import classNames from 'classnames'

import styles from './styles.css'

/**
 * Pure UI Toast
 *
 * Usage:
 *
 * ```tsx
 * <Toast color="green" header="header content" />
 * ```
 */

export interface ToastProps {
  color: 'green' | 'grey' | 'red' | 'white'
  header?: string | React.ReactNode
  content?: string | React.ReactNode

  customButton?: React.ReactNode
  buttonPlacement?: 'top' | 'bottom' | 'center'
}

export const Toast: React.FC<ToastProps> = ({
  color,
  header,
  content,
  customButton,
  buttonPlacement = 'top'
}) => {
  const mainClass = classNames({
    toast: true,
    [color]: !!color,
    [buttonPlacement]: buttonPlacement
  })

  return (
    <section className={mainClass}>
      <div>
        {header && <h4 className="header">{header}</h4>}
        {content && <p className="content">{content}</p>}
      </div>

      {customButton}

      <style jsx>{styles}</style>
    </section>
  )
}
