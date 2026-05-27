import { FormattedMessage } from 'react-intl'

import IMAGE_WALL_BACKGROUND_MD from '@/public/static/images/circle-wall-background-md.jpg'
import IMAGE_WALL_BACKGROUND_SM from '@/public/static/images/circle-wall-background-sm.jpg'
// FEATURE IS SUNSETTING: circle wall is no longer clickable
// import Link from 'next/link'
// import { toPath } from '~/common/utils'
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

const CircleWall = ({}: CircleWallProps) => {
  const style = {
    '--circle-wall-bg-sm': `url(${IMAGE_WALL_BACKGROUND_SM.src})`,
    '--circle-wall-bg-md': `url(${IMAGE_WALL_BACKGROUND_MD.src})`,
  } as React.CSSProperties

  // FEATURE IS SUNSETTING: circle wall is no longer clickable
  // const path = toPath({
  //   page: 'circleDetail',
  //   circle,
  // })

  return (
    <section className={styles.container} style={style}>
      <section className={styles.message}>
        <FormattedMessage
          defaultMessage="Circle locked work"
          id="hifvI7"
          description="src/views/ArticleDetail/Wall/Circle/index.tsx"
        />
      </section>
    </section>
  )
}

CircleWall.fragments = fragments

export default CircleWall
