import IMAGE_PLACEHOLDER from '@/public/static/images/placeholder.svg?url'
import { ResponsiveImage } from '~/components'

import styles from './styles.module.css'

export const Placeholder = () => {
  const width = 106
  return (
    <section className={styles.assets}>
      <div className={styles.item}>
        <ResponsiveImage url={IMAGE_PLACEHOLDER.src} width={width} />
      </div>
      <div className={styles.item}>
        <ResponsiveImage url={IMAGE_PLACEHOLDER.src} width={width} />
      </div>
      <div className={styles.item}>
        <ResponsiveImage url={IMAGE_PLACEHOLDER.src} width={width} />
      </div>
    </section>
  )
}
