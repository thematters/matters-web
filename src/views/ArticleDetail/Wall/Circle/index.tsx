import IMAGE_WALL_BACKGROUND_MD from '@/public/static/images/circle-wall-background-md.jpg'
import IMAGE_WALL_BACKGROUND_SM from '@/public/static/images/circle-wall-background-sm.jpg'
import { analytics } from '~/common/utils'
import { Translate } from '~/components'
import { CircleDigest } from '~/components/CircleDigest'
import {
  CircleWallCirclePrivateFragment,
  CircleWallCirclePublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

interface CircleWallProps {
  circle: CircleWallCirclePublicFragment &
    Partial<CircleWallCirclePrivateFragment>
}

const CircleWall = ({ circle }: CircleWallProps) => {
  const style = {
    '--circle-wall-bg-sm': `url(${IMAGE_WALL_BACKGROUND_SM})`,
    '--circle-wall-bg-md': `url(${IMAGE_WALL_BACKGROUND_MD})`,
  } as React.CSSProperties

  return (
    <section className={styles.container} style={style}>
      <section className={styles.message}>
        \\&nbsp;
        <Translate zh_hans="订阅围炉看更多" zh_hant="訂閱圍爐看更多" />
        &nbsp;//
      </section>

      <CircleDigest.Rich
        borderRadius="xtight"
        borderColor="lineGreyLight"
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
  )
}

CircleWall.fragments = fragments

export default CircleWall
