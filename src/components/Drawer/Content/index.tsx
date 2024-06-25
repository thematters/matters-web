import classNames from 'classnames'

import styles from './styles.module.css'

interface ContentProps {
  fixedWidth?: boolean
}

const Content: React.FC<React.PropsWithChildren<ContentProps>> = ({
  fixedWidth = false,
  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.fixedWidth]: !!fixedWidth,
  })

  return <section className={contentClasses}>{children}</section>
}

export default Content
