import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import IMAGE_WALL_BACKGROUND_MD from '@/public/static/images/circle-wall-background-md.jpg'
import IMAGE_WALL_BACKGROUND_SM from '@/public/static/images/circle-wall-background-sm.jpg'
import { toPath } from '~/common/utils'
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
    '--circle-wall-bg-sm': `url(${IMAGE_WALL_BACKGROUND_SM.src})`,
    '--circle-wall-bg-md': `url(${IMAGE_WALL_BACKGROUND_MD.src})`,
  } as React.CSSProperties

  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  return (
    <section className={styles.container} style={style}>
      <Link {...path}>
        <section className={styles.message}>
          <FormattedMessage
            defaultMessage="Subscribe to unlock all articles of"
            id="x7kxvC"
            description="src/views/ArticleDetail/Wall/Circle/index.tsx"
          />
          <br />
          <FormattedMessage
            defaultMessage="{circleName}"
            id="+5O5ev"
            description="src/views/ArticleDetail/Wall/Circle/index.tsx"
            values={{
              circleName: circle.displayName,
            }}
          />
        </section>
      </Link>
    </section>
  )
}

CircleWall.fragments = fragments

export default CircleWall
