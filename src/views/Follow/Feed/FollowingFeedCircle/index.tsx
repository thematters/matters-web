import Link from 'next/link'
import React from 'react'

import { toPath } from '~/common/utils'
import { Card, CircleAvatar, DateTime } from '~/components'
import { FollowingFeedCircleFragment } from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import { fragments } from './gql'
import styles from './styles.module.css'

export type CircleDigestFeedProps = {
  circle: FollowingFeedCircleFragment
  header?: React.ReactNode
  date: Date | string | number
  onClick?: () => void
} & DropdownActionsControls

const FeedCircle = ({
  circle,
  header,
  date,
  actions,
  ...rest
}: CircleDigestFeedProps) => {
  const { displayName, description } = circle

  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  return (
    <section className={styles.container}>
      {header}

      <Card
        href={path.href}
        spacing={[16, 16]}
        bgColor="greyLighter"
        borderRadius="xtight"
        {...rest}
      >
        <section className={styles.content}>
          <h3 className={styles.title}>
            <Link {...path} className="u-link-active-green">
              {displayName}
            </Link>
          </h3>

          {description && <p className={styles.description}>{description}</p>}

          <section className={styles.avatar}>
            <CircleAvatar circle={circle} size={48} />
          </section>
        </section>
      </Card>

      <footer className={styles.footer}>
        <section className={styles.left}>
          <DateTime date={date} />
        </section>

        <section className={styles.right}>
          <DropdownActions actions={actions} />
        </section>
      </footer>
    </section>
  )
}

/**
 * Memoizing
 */
type MemoizedFeedCircleType = React.MemoExoticComponent<
  React.FC<CircleDigestFeedProps>
> & {
  fragments: typeof fragments
}

const MemoizedFeedCircle = React.memo(
  FeedCircle,
  ({ circle: prevCircle }, { circle }) => {
    return prevCircle.id === circle.id
  }
) as MemoizedFeedCircleType

MemoizedFeedCircle.fragments = fragments

export default MemoizedFeedCircle
