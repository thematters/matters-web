import gql from 'graphql-tag'

import { Translate } from '~/components'
import { CircleDigest } from '~/components/CircleDigest'

import { analytics } from '~/common/utils'

import styles from './styles.css'

import { CircleWallCirclePrivate } from './__generated__/CircleWallCirclePrivate'
import { CircleWallCirclePublic } from './__generated__/CircleWallCirclePublic'

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
      <section className="circle">
        <CircleDigest.Rich
          borderRadius="xtight"
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
      </section>
      <style jsx>{styles}</style>
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
