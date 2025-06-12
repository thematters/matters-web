import IMAGE_PLACEHOLDER from '@/public/static/images/placeholder.svg?url'

import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <section className={placeholderStyles.book}>
      <div className={placeholderStyles.cover}>
        <img src={IMAGE_PLACEHOLDER.src} alt="" />
      </div>
    </section>
  )
}

export default Placeholder
