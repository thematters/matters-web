import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

interface DialogMessageProps {
  align?: 'left' | 'center'
  smUpAlign?: 'left' | 'center'
  type?: 'error'
  spacingBottom?: boolean
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
  align = 'center',
  smUpAlign = 'left',
  spacingBottom,
  type,

  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.spacingBottom]: !!spacingBottom,
    [styles[`${type}`]]: !!type,
    [align ? styles[`align${capitalizeFirstLetter(align)}`] : '']: !!align,
    [smUpAlign ? styles[`alignSmUp${capitalizeFirstLetter(smUpAlign)}`] : '']:
      !!smUpAlign,
  })

  return <section className={contentClasses}>{children}</section>
}

export default DialogMessage
