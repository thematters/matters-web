import { Book, Card } from '~/components'

import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <Card spacing={['baseLoose', 0]} bgActiveColor="none">
      <section className={styles.container} aria-busy="true" aria-live="polite">
        <section className={styles.book}>
          <Book.Placeholder />
        </section>

        <section className={styles.content}>
          <div className={placeholderStyles.text} />
          <div className={placeholderStyles.text} />
          <div className={placeholderStyles.text} />
        </section>
      </section>
    </Card>
  )
}

export default Placeholder
