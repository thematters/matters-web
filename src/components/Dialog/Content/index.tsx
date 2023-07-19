import classNames from 'classnames'

import styles from './styles.module.css'

interface DialogContentProps {
  noSpacing?: boolean
  hasFixed?: boolean
}

const DialogContent: React.FC<React.PropsWithChildren<DialogContentProps>> = ({
  noSpacing = true,
  hasFixed,
  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.hasFixed]: !!hasFixed,
    [styles.noSpacing]: !!noSpacing,
  })

  return <section className={contentClasses}>{children}</section>
}

export default DialogContent
