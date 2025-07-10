import IMAGE_PLACEHOLDER from '@/public/static/images/placeholder.svg?url'

import styles from '../Carousel/styles.module.css'

const Placeholder = () => {
  return (
    <section className={styles.carousel}>
      <section className={styles.viewport}>
        <div className={styles.container}>
          <div className={styles.slide}>
            <div className={styles.content}>
              <img src={IMAGE_PLACEHOLDER.src} alt="" />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Placeholder
