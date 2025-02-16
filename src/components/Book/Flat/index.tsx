import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import BOOK_COVER from '@/public/static/images/book-cover.png'
import { TEST_ID } from '~/common/enums'
import { ResponsiveImage, useColorThief } from '~/components'

import styles from './styles.module.css'

export type BookFlatProps = {
  title: string
  cover?: string | null
  type: 'collection' | 'article'
}

const BookFlat: React.FC<BookFlatProps> = ({ title, cover, type }) => {
  const { getColor, dominantColor, nodeRef: bookRef } = useColorThief()

  const isCollection = type === 'collection'

  useEffect(() => {
    if (!cover) return

    getColor()
  }, [cover])

  return (
    <section
      className={styles.book}
      ref={bookRef}
      style={
        { '--jacket-bg': dominantColor || '#b3b3b3' } as React.CSSProperties
      }
      data-test-id={TEST_ID.BOOK_FLAT}
    >
      <div className={styles.cover}>
        <ResponsiveImage
          url={cover || BOOK_COVER.src}
          width={100} // smaller size for color thief
          height={100}
        />
      </div>

      <section>
        {isCollection && (
          <span className={styles.label}>
            <FormattedMessage defaultMessage="Collection" id="phAZoj" />
          </span>
        )}
        <h2 className={styles.title} data-test-id={TEST_ID.BOOK_TITLE}>
          {title}
        </h2>
      </section>
    </section>
  )
}

export default BookFlat
