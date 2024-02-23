import classNames from 'classnames'

import Message from './Message'
import styles from './styles.module.css'

interface DialogContentProps {
  noSpacing?: boolean
  smExtraSpacing?: boolean
  fixedHeight?: boolean | 90
  noSpacingBottom?: boolean
  noMaxHeight?: boolean
}

const DialogContent: React.FC<React.PropsWithChildren<DialogContentProps>> & {
  Message: typeof Message
} = ({
  noSpacing,
  smExtraSpacing = true,
  noSpacingBottom,
  noMaxHeight,
  fixedHeight,
  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.spacing]: !noSpacing,
    [styles.smExtraSpacing]: smExtraSpacing,
    [styles.fixedHeight]: !!fixedHeight,
    [styles.noSpacingBottom]: !!noSpacingBottom,
    [styles.noMaxHeight]: !!noMaxHeight,
  })

  const contentStyle = {
    height: fixedHeight === 90 ? `calc(90vh - 4.25rem)` : undefined,
    maxHeight: fixedHeight === 90 ? `calc(90vh - 4.25rem)` : undefined,
  }

  return (
    <section className={contentClasses} style={contentStyle} data-dialog-entity>
      {children}
    </section>
  )
}

DialogContent.Message = Message

export default DialogContent
