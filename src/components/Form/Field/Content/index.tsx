import classNames from 'classnames'

import styles from './styles.module.css'

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  const contentClass = classNames({
    [styles.content]: true,
    inputContainer: true, // global selector for `src/components/Forms/CreateCircleForm/styles.module.css`
  })

  return <section className={contentClass}>{children}</section>
}

export default Content
