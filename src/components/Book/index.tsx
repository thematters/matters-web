import classNames from 'classnames'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import BOOK_COVER from '@/public/static/images/book-cover.png'
import { TEST_ID } from '@/src/common/enums'
import { countStrWidth } from '~/common/utils'
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

  const titleWidth = countStrWidth(title)
  const hasNonCJK = title.length * 2 !== titleWidth

  const bookClasses = classNames({
    [styles.book]: true,
    [styles.flat]: variant === 'flat',
    [styles.classic]: variant === 'classic',
  })
  const jacketClasses = classNames({
    [styles.jacket]: true,
    [styles.hasCount]: hasCount,
    [styles.titleLg]: hasNonCJK ? titleWidth <= 10 : titleWidth <= 12,
    [styles.titleMd]:
      !hasCount && titleWidth > 12 && titleWidth <= 28 && !hasNonCJK,
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
        <ResponsiveImage
          url={cover || BOOK_COVER.src}
          width={240}
          height={200}
          anonymous
        />
        {hasMask && (
          <div className={styles.mask}>
            {loading ? <Spinner /> : <IconCamera24 color="white" size="xl" />}
          </div>
        )}
      </div>

      <section className={jacketClasses}>
        <h2 className={styles.title} data-test-id={TEST_ID.BOOK_TITLE}>
          {title}
        </h2>

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
