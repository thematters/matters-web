import { Book } from '~/components'

import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <section aria-busy="true" aria-live="polite">
      <section className={styles.header}>
        <Book.Placeholder />

        <section className={styles.info}>
          <h2 className={styles.title}>
            <div className={placeholderStyles.title}></div>
          </h2>
          <p>
            <div className={placeholderStyles.description}></div>
            <div className={placeholderStyles.description}></div>
            <div className={placeholderStyles.description}></div>
          </p>
        </section>
      </section>
    </section>
  )
}

export default Placeholder
