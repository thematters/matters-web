import { Card } from '~/components'

import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <Card spacing={['base', 0]} bgActiveColor="none">
      <section className={styles.container} aria-busy="true" aria-live="polite">
        <section className={placeholderStyles.content}>
          <div className={placeholderStyles.updatedDate} />
          <div className={placeholderStyles.title} />
        </section>
      </section>
    </Card>
  )
}

export default Placeholder
