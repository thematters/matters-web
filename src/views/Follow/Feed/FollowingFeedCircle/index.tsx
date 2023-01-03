import React from 'react'

import { toPath } from '~/common/utils'
import { Card, CircleAvatar, DateTime, LinkWrapper } from '~/components'
import { FollowingFeedCircleFragment } from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import { fragments } from './gql'
import styles from './styles.css'

export type CircleDigestFeedProps = {
  circle: FollowingFeedCircleFragment
  header?: React.ReactNode
  date: Date | string | number
  onClick?: () => any
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
    <section className="container">
      {header}

      <Card
        href={path.href}
        spacing={['base', 'base']}
        bgColor="grey-lighter"
        borderRadius="xtight"
        {...rest}
      >
        <section className="content">
          <h3 className="title">
            <LinkWrapper {...path} textActiveColor="green">
              {displayName}
            </LinkWrapper>
          </h3>

          {description && <p className="description">{description}</p>}

          <section className="avatar">
            <CircleAvatar circle={circle} size="xl" />
          </section>
        </section>
      </Card>

      <footer>
        <section className="left">
          <DateTime date={date} />
        </section>

        <section className="right">
          <DropdownActions actions={actions} />
        </section>
      </footer>

      <style jsx>{styles}</style>
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
