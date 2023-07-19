import classNames from 'classnames'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import BOOK_COVER from '@/public/static/images/book-cover.png'
import {
  IconCamera24,
  ResponsiveImage,
  Spinner,
  useColorThief,
} from '~/components'

import Placeholder from './Placeholder'
import styles from './styles.module.css'

export type BookProps = {
  title: string
  cover?: string | null
  articleCount?: number
  variant?: 'flat' | 'classic'

  hasMask?: boolean
  loading?: boolean
}

export const Book: React.FC<BookProps> & {
  Placeholder: typeof Placeholder
} = ({ title, cover, articleCount, variant = 'classic', hasMask, loading }) => {
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
        {hasMask && (
          <div className={styles.mask}>
            {loading ? <Spinner /> : <IconCamera24 color="white" size="xl" />}
          </div>
        )}
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

Book.Placeholder = Placeholder
