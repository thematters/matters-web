import IMAGE_PLACEHOLDER from '@/public/static/images/placeholder.svg?url'
import { Card } from '~/components'

import styles from '../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <Card spacing={[0, 0]} bgColor="none" bgActiveColor="none">
      <div
        className={[styles.cover, styles.hasCover].join(' ')}
        aria-busy="true"
        aria-live="polite"
      >
        <img src={IMAGE_PLACEHOLDER.src} alt="" />
      </div>

      <section>
        <div className={placeholderStyles.text} />
        <div className={placeholderStyles.text} />
      </section>
    </Card>
  )
}

export default Placeholder
