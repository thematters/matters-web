import classNames from 'classnames'

import styles from './styles.module.css'

interface DialogContentProps {
  noSpacing?: boolean
  smExtraSpacing?: boolean
  fixedHeight?: boolean
}

const DialogContent: React.FC<React.PropsWithChildren<DialogContentProps>> = ({
  noSpacing,
  smExtraSpacing = true,
  fixedHeight,
  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.spacing]: !noSpacing,
    [styles.smExtraSpacing]: smExtraSpacing,
    [styles.fixedHeight]: !!fixedHeight,
  })

  return <section className={contentClasses}>{children}</section>
}

export default DialogContent
