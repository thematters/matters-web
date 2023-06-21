import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'
import { Dialog } from '~/components'

import styles from './styles.module.css'

interface DialogMessageProps {
  align?: 'left'
  type?: 'error' | 'info'
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
const DialogMessage: React.FC<React.PropsWithChildren<DialogMessageProps>> = ({
  align,
  type,

  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles[`${type}`]]: !!type,
    [align ? styles[`align${capitalizeFirstLetter(align)}`] : '']: !!align,
  })

  return (
    <Dialog.Content hasFixed noSpacing={false}>
      <section className={contentClasses}>{children}</section>
    </Dialog.Content>
  )
}

export default DialogMessage
