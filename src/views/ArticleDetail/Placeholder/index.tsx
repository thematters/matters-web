import { Spacer } from '~/components'

import styles from './styles.module.css'

const Placeholder = () => {
  return (
    <section className={styles.container}>
      <section className={styles.title}></section>
      <section className={styles.metaInfo}></section>
      <section className={styles.summary}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </section>
      <Spacer size="sp16" />
      <section className={styles.image}></section>
      <section className={styles.text}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </section>
    </section>
  )
}

export default Placeholder
