import IMAGE_PLACEHOLDER from '@/public/static/images/placeholder.svg?url'
import { Card } from '~/components'

import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <Card spacing={[20, 0]} bgActiveColor="none">
      <section className={styles.container} aria-busy="true" aria-live="polite">
        <section className={styles.content}>
          <div className={placeholderStyles.text} />
          <div className={placeholderStyles.text} />
          <div className={placeholderStyles.text} />
        </section>

        <div className={styles.cover}>
          <img src={IMAGE_PLACEHOLDER} alt="" />
        </div>
      </section>
    </Card>
  )
}

export default Placeholder
