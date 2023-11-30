import { useEffect } from 'react'

import BOOK_COVER from '@/public/static/images/book-cover.png'
import { TEST_ID } from '~/common/enums'
import { ResponsiveImage, useColorThief } from '~/components'

import styles from './styles.module.css'

type BookArticleProps = {
  title: string
  description: string
  cover?: string | null
}

const BookArticle: React.FC<BookArticleProps> = ({
  title,
  description,
  cover,
}) => {
  const { getColor, dominantColor, nodeRef: bookRef } = useColorThief()

  useEffect(() => {
    if (!cover) return

    getColor()
  }, [cover])

  return (
    <section
      className={styles.book}
      ref={bookRef}
      style={
        {
          '--jacket-bg': dominantColor || '#b3b3b3',
          '--jacket-underline': dominantColor
            ? dominantColor.replace(', 1)', ', 0.1)')
            : 'rgba(179, 179, 179, 0.10)',
        } as React.CSSProperties
      }
      data-test-id={TEST_ID.BOOK_ARTICLE}
    >
      <h2 className={styles.title} data-test-id={TEST_ID.BOOK_TITLE}>
        {title}
      </h2>

      {cover && (
        <div className={styles.cover}>
          <ResponsiveImage
            url={cover || BOOK_COVER.src}
            width={240}
            height={200}
            anonymous
            disableAnimation={true}
          />
        </div>
      )}

      {!cover && description && (
        <p className={styles.description}>{description}</p>
      )}
    </section>
  )
}

export default BookArticle
