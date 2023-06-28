import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import BOOK_COVER from '@/public/static/images/book-cover.png'
import { ResponsiveImage } from '~/components'

import styles from './styles.module.css'

type BookProps = {
  title: string
  cover?: string
  articleCount?: number
}

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255
  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)
  let d = max - min
  let h = 0
  if (d === 0) h = 0
  else if (max === r) h = ((g - b) / d) % 6
  else if (max === g) h = (b - r) / d + 2
  else if (max === b) h = (r - g) / d + 4
  let l = (min + max) / 2
  let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  return [h * 60, s, l]
}

export const Book: React.FC<BookProps> = ({ title, cover, articleCount }) => {
  const hasCount = typeof articleCount === 'number'
  const jacketClasses = classNames({
    [styles.jacket]: true,
    [styles.hasCount]: hasCount,
    [styles.titleLg]: title.length <= 6,
    [styles.titleMd]: title.length > 6 && title.length <= 18 && !hasCount,
  })

  const [dominantColor, setDominantColor] = useState<string>()
  const bookRef = useRef<HTMLDivElement>(null)

  const getColor = () => {
    import('colorthief').then(({ default: ColorThief }) => {
      const colorThief = new ColorThief()
      const $img = bookRef.current?.querySelector('img') as HTMLImageElement
      const colors = colorThief.getColor($img)
      const hsl = rgbToHsl(...colors)
      setDominantColor(
        `hsl(${parseInt(hsl[0] + '')} ${parseFloat(hsl[1] * 100 + '').toFixed(
          2
        )}% 30%)`
      )
    })
  }

  useEffect(() => {
    if (!cover) return

    const $img = bookRef.current?.querySelector('img') as HTMLImageElement
    if ($img?.complete) {
      getColor()
    } else {
      $img?.addEventListener('load', function () {
        getColor()
      })
    }
  }, [cover])

  return (
    <section className={styles.book} ref={bookRef}>
      <div className={styles.cover}>
        <ResponsiveImage url={cover || BOOK_COVER.src} size="360w" anonymous />
      </div>

      <section
        className={jacketClasses}
        style={{
          ...(dominantColor ? { backgroundColor: dominantColor } : {}),
        }}
      >
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
