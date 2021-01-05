import { Img } from '~/components'

import CIRCLE_COVER_BOTTOM_LEFT from '@/public/static/images/circle-cover-bottom-left.svg'
import CIRCLE_COVER_INNER from '@/public/static/images/circle-cover-inner.svg'
import CIRCLE_COVER_MASK from '@/public/static/images/circle-cover-mask.svg'
import CIRCLE_COVER_TOP_LEFT from '@/public/static/images/circle-cover-top-left.svg'
import CIRCLE_COVER_TOP_RIGHT from '@/public/static/images/circle-cover-top-right.svg'

import styles from './styles.css'

export interface CircleCoverProps {
  cover?: string | null
  fallbackCover: string
  inEditor?: boolean
}

export const CircleCover: React.FC<CircleCoverProps> = ({
  cover,
  fallbackCover,
  inEditor,
  children,
}) => {
  const url = cover || fallbackCover
  const isFallback = !cover

  return (
    <div className="container">
      <div className="bg-top-left">
        <img aria-hidden="true" src={CIRCLE_COVER_TOP_LEFT} />
      </div>
      <div className="bg-top-right">
        <img aria-hidden="true" src={CIRCLE_COVER_TOP_RIGHT} />
      </div>
      <div className="bg-bottom-left">
        <img aria-hidden="true" src={CIRCLE_COVER_BOTTOM_LEFT} />
      </div>
      <div className="bg-inner">
        <img aria-hidden="true" src={CIRCLE_COVER_INNER} />
      </div>

      <section className="cover">
        <Img
          url={url}
          size="1080w"
          smUpSize="540w"
          disabled={isFallback || inEditor}
        />

        {children}
      </section>

      <style jsx>{`
        @supports (mask-size: 0) {
          .cover {
            mask: url(${CIRCLE_COVER_MASK}) bottom no-repeat;
          }
        }
      `}</style>
      <style jsx>{styles}</style>
    </div>
  )
}

export default CircleCover
