import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'
import { Dialog } from '~/components'

import styles from './styles.module.css'

interface DialogMessageProps {
  align?: 'left' | 'center'
  smUpAlign?: 'left' | 'center'
  type?: 'error'

  noSpacing?: boolean
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
  type,

  noSpacing,

  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles[`${type}`]]: !!type,
    [align ? styles[`align${capitalizeFirstLetter(align)}`] : '']: !!align,
    [smUpAlign ? styles[`alignSmUp${capitalizeFirstLetter(smUpAlign)}`] : '']:
      !!smUpAlign,
  })

  return (
    <Dialog.Content noSpacing={noSpacing}>
      <section className={contentClasses}>{children}</section>
    </Dialog.Content>
  )
}

export default DialogMessage
