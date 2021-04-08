import classNames from 'classnames'

import { Dialog } from '~/components'

import styles from './styles.css'

interface DialogMessageProps {
  align?: 'left'
  type?: 'error' | 'info'
  spacing?: 'md' | 'xxl'
}

/**
 *
 * Usage:
 *
 * ```jsx
 *   <Dialog.Message>
 *     <p>grey text</p>
 *   </Dialog.Message>
 *
 *   <Dialog.Message>
 *     <h3>bold text</h3>
 *   </Dialog.Message>
 * ```
 *
 */
const DialogMessage: React.FC<DialogMessageProps> = ({
  align,
  type,
  spacing = 'base',

  children,
}) => {
  const contentClasses = classNames({
    content: true,
    [`${type}`]: !!type,
    [`align-${align}`]: !!align,
    [`spacing-${spacing}`]: !!spacing,
  })

  return (
    <Dialog.Content spacing={['base', 'base']} hasFixed>
      <section className={contentClasses}>{children}</section>

      <style jsx>{styles}</style>
    </Dialog.Content>
  )
}

export default DialogMessage
