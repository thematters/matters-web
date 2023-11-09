import IMG_PLACEHOLDER from '@/public/static/images/placeholder.svg'

import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <section className={placeholderStyles.book}>
      <div className={placeholderStyles.cover}>
        <img src={IMG_PLACEHOLDER} alt="" />
      </div>
    </section>
  )
}

export default Placeholder
