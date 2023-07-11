import IMG_PLACEHOLDER from '@/public/static/images/placeholder.svg'
import { ResponsiveImage } from '~/components'

import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <section className={placeholderStyles.book}>
      <div className={placeholderStyles.cover}>
        <ResponsiveImage url={IMG_PLACEHOLDER} size="360w" />
      </div>
    </section>
  )
}

export default Placeholder
