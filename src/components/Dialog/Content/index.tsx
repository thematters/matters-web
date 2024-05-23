import classNames from 'classnames'

import Message from './Message'
import styles from './styles.module.css'

interface DialogContentProps {
  noSpacing?: boolean
  smExtraSpacing?: boolean
  fixedHeight?: boolean
  noSpacingTop?: boolean
  noSpacingBottom?: boolean
  noMaxHeight?: boolean
  className?: string
}

const DialogContent: React.FC<React.PropsWithChildren<DialogContentProps>> & {
  Message: typeof Message
} = ({
  noSpacing,
  smExtraSpacing = true,
  noSpacingTop,
  noSpacingBottom,
  noMaxHeight,
  fixedHeight,
  className,
  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.spacing]: !noSpacing,
    [styles.smExtraSpacing]: smExtraSpacing,
    [styles.fixedHeight]: !!fixedHeight,
    [styles.noSpacingTop]: !!noSpacingTop,
    [styles.noSpacingBottom]: !!noSpacingBottom,
    [styles.noMaxHeight]: !!noMaxHeight,
    [className || '']: !!className,
  })

  return (
    <section className={contentClasses} data-dialog-entity>
      {children}
    </section>
  )
}

DialogContent.Message = Message

export default DialogContent
