import classNames from 'classnames'
import { useEffect } from 'react'

import IconCamera from '@/public/static/icons/24px/camera.svg'
import BOOK_COVER from '@/public/static/images/book-cover.png'
import { TEST_ID } from '~/common/enums'
import {
  Icon,
  ResponsiveImage,
  SpinnerBlock,
  useColorThief,
} from '~/components'

import styles from './styles.module.css'

type BookCollectionProps = {
  title: string
  cover?: string | null

  hasMask?: boolean
  loading?: boolean
}

const BookCollection: React.FC<BookCollectionProps> = ({
  title,
  cover,
  hasMask,
  loading,
}) => {
  const { getColor, dominantColor, nodeRef: bookRef } = useColorThief()

  useEffect(() => {
    if (!cover) return

    getColor()
  }, [cover])

  const jacketClasses = classNames({
    [styles.jacket]: true,
  })

  return (
    <section
      className={styles.book}
      ref={bookRef}
      style={
        { '--jacket-bg': dominantColor || '#b3b3b3' } as React.CSSProperties
      }
      data-test-id={TEST_ID.BOOK_COLLECTION}
    >
      <div className={styles.cover}>
        <ResponsiveImage
          url={cover || BOOK_COVER.src}
          width={240}
          height={200}
        />
        {hasMask && (
          <div className={styles.mask}>
            {loading ? (
              <SpinnerBlock />
            ) : (
              <Icon icon={IconCamera} color="white" size={48} />
            )}
          </div>
        )}
      </div>

      <section className={jacketClasses}>
        <h2 className={styles.title} data-test-id={TEST_ID.BOOK_TITLE}>
          {title}
        </h2>
      </section>
    </section>
  )
}

export default BookCollection
