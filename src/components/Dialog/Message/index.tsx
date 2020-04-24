import classNames from 'classnames'

import { Dialog } from '~/components'

import styles from './styles.css'

interface DialogMessageProps {
  align?: 'left'
  error?: boolean
  spacing?: 'base' | 'xloose'
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
  error,
  spacing = 'xloose',

  children,
}) => {
  const contentClass = classNames({
    content: true,
    error: !!error,
    [`align-${align}`]: !!align,
  })

  return (
    <Dialog.Content spacing={[spacing, spacing]}>
      <section className={contentClass}>{children}</section>

      <style jsx>{styles}</style>
    </Dialog.Content>
  )
}

export default DialogMessage
