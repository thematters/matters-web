import classNames from 'classnames'

import styles from './styles.module.css'

/**
 * <Layout.FixedMain> is a container component that has the fixed position and
 * width same as the middle column, used by <BottomBar>, <NavBar>.
 *
 */
type FixedMainProps = {
  children?: React.ReactNode
}

const FixedMain: React.FC<FixedMainProps> = ({ children }) => {
  const classes = classNames({
    [styles.fixedMain]: true,
    fixedMain: true, // global selector
  })

  return (
    <section className={classes}>
      <section className={styles.wrapper}>
        <main className={styles.main}>
          <article className={styles.article}>{children}</article>
        </main>
      </section>
    </section>
  )
}

export default FixedMain
