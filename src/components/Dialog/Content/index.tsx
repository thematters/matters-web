import classNames from 'classnames'

import Spacing from './Spacing'
import styles from './styles.module.css'

interface DialogContentProps {
  noSpacing?: boolean
  fixedHeight?: boolean
}

const DialogContent: React.FC<React.PropsWithChildren<DialogContentProps>> & {
  Spacing: typeof Spacing
} = ({ noSpacing, fixedHeight, children }) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.spacing]: !noSpacing,
    [styles.fixedHeight]: !!fixedHeight,
  })

  return <section className={contentClasses}>{children}</section>
}

DialogContent.Spacing = Spacing

export default DialogContent
