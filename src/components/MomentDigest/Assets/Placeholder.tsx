import IMG_PLACEHOLDER from '@/public/static/images/placeholder.svg'
import { ResponsiveImage } from '~/components'

import styles from './styles.module.css'

export const Placeholder = () => {
  const width = 106
  return (
    <section className={styles.assets}>
      <div className={styles.item}>
        <ResponsiveImage url={IMG_PLACEHOLDER} width={width} />
      </div>
      <div className={styles.item}>
        <ResponsiveImage url={IMG_PLACEHOLDER} width={width} />
      </div>
      <div className={styles.item}>
        <ResponsiveImage url={IMG_PLACEHOLDER} width={width} />
      </div>
    </section>
  )
}
