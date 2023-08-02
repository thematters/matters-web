import IMG_PLACEHOLDER from '@/public/static/images/placeholder.svg'
import { ResponsiveImage } from '~/components'

import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <section className={placeholderStyles.book}>
      <div className={placeholderStyles.cover}>
        <ResponsiveImage url={IMG_PLACEHOLDER} width={240} />
      </div>
    </section>
  )
}

export default Placeholder
