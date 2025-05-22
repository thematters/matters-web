import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import BOOK_COVER from '@/public/static/images/book-cover.png'
import { TEST_ID } from '~/common/enums'
import {
  ResponsiveImage,
  useColorThief,
  useIsomorphicLayoutEffect,
} from '~/components'

import styles from './styles.module.css'

type BookArticleProps = {
  title: string
  description?: string
  cover?: string | null
}

const BookArticle: React.FC<BookArticleProps> = ({
  title,
  description,
  cover,
}) => {
  const { getColor, dominantColor, nodeRef: bookRef } = useColorThief()

  const descRef: React.RefObject<any> = useRef(null)
  const [descLines, setDescLines] = useState(0)

  useIsomorphicLayoutEffect(() => {
    if (cover || !description) return

    if (descRef?.current) {
      const lines = Math.floor(descRef.current.clientHeight / 18)
      setDescLines(lines)
    }
  }, [])

  useEffect(() => {
    if (!cover) return

    getColor()
  }, [cover])

  const descClasses = classNames({
    [styles.description]: true,
    [styles.lineClamp]: descLines > 0,
  })

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
          '--desc-lines': descLines,
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
          />
        </div>
      )}

      {!cover && description && (
        <p className={descClasses} ref={descRef}>
          {description}
        </p>
      )}
    </section>
  )
}

export default BookArticle
