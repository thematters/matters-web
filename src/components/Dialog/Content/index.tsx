import classNames from 'classnames'

import Message from './Message'
import styles from './styles.module.css'

interface DialogContentProps {
  noSpacing?: boolean
  smExtraSpacing?: boolean
  fixedHeight?: boolean
  fixedHeightNoFooter?: boolean
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
  fixedHeightNoFooter,
  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.spacing]: !noSpacing,
    [styles.smExtraSpacing]: smExtraSpacing,
    [styles.fixedHeight]: !!fixedHeight,
    [styles.fixedHeightNoFooter]: !!fixedHeightNoFooter,
    [styles.noSpacingBottom]: !!noSpacingBottom,
    [styles.noMaxHeight]: !!noMaxHeight,
  })

  return (
    <section className={contentClasses} data-dialog-entity>
      {children}
    </section>
  )
}

DialogContent.Message = Message

export default DialogContent
