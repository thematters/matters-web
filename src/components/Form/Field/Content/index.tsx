import classNames from 'classnames'

import styles from './styles.module.css'

type ContentProps = {
  noMargin?: boolean
}

const Content: React.FC<React.PropsWithChildren<ContentProps>> = ({
  noMargin,
  children,
}) => {
  const contentClass = classNames({
    'input-container': true,
    'no-margin': noMargin,
  })

  return <section className={contentClass}>{children}</section>
}

export default Content
