import classNames from 'classnames'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import BOOK_COVER from '@/public/static/images/book-cover.png'
import { ResponsiveImage, useColorThief } from '~/components'

import styles from './styles.module.css'

type BookProps = {
  title: string
  cover?: string | null
  articleCount?: number
  variant?: 'flat' | 'classic'
}

export const Book: React.FC<BookProps> = ({
  title,
  cover,
  articleCount,
  variant = 'classic',
}) => {
  const hasCount = typeof articleCount === 'number'

  const { getColor, dominantColor, nodeRef: bookRef } = useColorThief()

  useEffect(() => {
    if (!cover) return

    getColor()
  }, [cover])

  const bookClasses = classNames({
    [styles.book]: true,
    [styles.flat]: variant === 'flat',
    [styles.classic]: variant === 'classic',
  })
  const jacketClasses = classNames({
    [styles.jacket]: true,
    [styles.hasCount]: hasCount,
    [styles.titleLg]: title.length <= 6,
    [styles.titleMd]: title.length > 6 && title.length <= 18 && !hasCount,
  })

  return (
    <section
      className={bookClasses}
      ref={bookRef}
      style={
        { '--jacket-bg': dominantColor || '#b3b3b3' } as React.CSSProperties
      }
    >
      <div className={styles.cover}>
        <ResponsiveImage url={cover || BOOK_COVER.src} size="360w" anonymous />
      </div>

      <section className={jacketClasses}>
        <h2 className={styles.title}>{title}</h2>

        {hasCount && (
          <p className={styles.count}>
            <FormattedMessage
              defaultMessage="{count} articles"
              description="src/components/Book/index.tsx"
              values={{ count: articleCount }}
            />
          </p>
        )}
      </section>
    </section>
  )
}
