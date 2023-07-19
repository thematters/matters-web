import classNames from 'classnames'

import styles from './styles.module.css'

type ContentProps = {}

const Content: React.FC<React.PropsWithChildren<ContentProps>> = ({
  children,
}) => {
  const contentClass = classNames({
    [styles.content]: true,
    inputContainer: true, // global selector for `@mixin form-container`
  })

  return <section className={contentClass}>{children}</section>
}

export default Content
