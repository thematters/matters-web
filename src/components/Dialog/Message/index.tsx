import classNames from 'classnames'

import { capitalizeFirstLetter } from '~/common/utils'
import { Dialog } from '~/components'

import styles from './styles.module.css'

interface DialogMessageProps {
  align?: 'left' | 'center'
  smUpAlign?: 'left' | 'center'
  type?: 'error'

  smExtraSpacing?: boolean
  noSpacing?: boolean
  noSpacingBottom?: boolean
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

  smExtraSpacing = false,
  noSpacing,
  noSpacingBottom,

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
    <Dialog.Content
      noSpacing={noSpacing}
      noSpacingBottom={noSpacingBottom}
      smExtraSpacing={smExtraSpacing}
    >
      <section className={contentClasses}>{children}</section>
    </Dialog.Content>
  )
}

export default DialogMessage
