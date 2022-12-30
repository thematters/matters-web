import gql from 'graphql-tag'

import IMAGE_WALL_BACKGROUND_MD from '@/public/static/images/circle-wall-background-md.jpg'
import IMAGE_WALL_BACKGROUND_SM from '@/public/static/images/circle-wall-background-sm.jpg'
import { analytics } from '~/common/utils'
import { Translate } from '~/components'
import { CircleDigest } from '~/components/CircleDigest'

import { CircleWallCirclePrivate } from './__generated__/CircleWallCirclePrivate'
import { CircleWallCirclePublic } from './__generated__/CircleWallCirclePublic'
import styles from './styles.css'

interface CircleWallProps {
  circle: CircleWallCirclePublic & Partial<CircleWallCirclePrivate>
}

const CircleWall = ({ circle }: CircleWallProps) => {
  return (
    <section className="container">
      <section className="message">
        \\&nbsp;
        <Translate zh_hans="订阅围炉看更多" zh_hant="訂閱圍爐看更多" />
        &nbsp;//
      </section>

      <CircleDigest.Rich
        borderRadius="xtight"
        borderColor="line-grey-light"
        circle={circle}
        hasFooter
        hasPrice
        onClickPrice={() => {
          analytics.trackEvent('click_button', {
            type: 'subscribe_circle_price',
            pageType: 'article_detail',
          })
        }}
      />

      <style jsx>{styles}</style>
      <style jsx>{`
        .container {
          background-image: url(${IMAGE_WALL_BACKGROUND_SM.src});
          background-size: cover;
          background-position: center top;

          @media (--sm-up) {
            background-image: url(${IMAGE_WALL_BACKGROUND_MD.src});
          }
        }
      `}</style>
    </section>
  )
}

CircleWall.fragments = {
  circle: {
    public: gql`
      fragment CircleWallCirclePublic on Circle {
        id
        ...DigestRichCirclePublic
      }
      ${CircleDigest.Rich.fragments.circle.public}
    `,
    private: gql`
      fragment CircleWallCirclePrivate on Circle {
        id
        ...DigestRichCirclePrivate
      }
      ${CircleDigest.Rich.fragments.circle.private}
    `,
  },
}

export default CircleWall
