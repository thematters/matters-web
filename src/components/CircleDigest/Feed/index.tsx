import React from 'react'

import { Card, CircleAvatar, DateTime, LinkWrapper } from '~/components'

import { toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { DigestFeedCircle } from './__generated__/DigestFeedCircle'

export type CircleDigestFeedProps = {
  circle: DigestFeedCircle

  header?: React.ReactNode
  date?: Date | string | number
}

const Feed = ({ circle, header, date }: CircleDigestFeedProps) => {
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
        <DateTime date={date || circle.createdAt} />
      </footer>

      <style jsx>{styles}</style>
    </section>
  )
}

/**
 * Memoizing
 */
type MemoizedFeedType = React.MemoExoticComponent<
  React.FC<CircleDigestFeedProps>
> & {
  fragments: typeof fragments
}

const MemoizedFeed = React.memo(Feed, ({ circle: prevCircle }, { circle }) => {
  return prevCircle.id === circle.id
}) as MemoizedFeedType

MemoizedFeed.fragments = fragments

export default MemoizedFeed
