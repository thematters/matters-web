import React from 'react'

import { DateTime } from '~/components'

import UserDigestRich, { UserDigestRichProps } from '../Rich'
import { fragments } from '../Rich/gql'
import styles from './styles.css'

import { UserDigestRichUserPrivate } from '../Rich/__generated__/UserDigestRichUserPrivate'
import { UserDigestRichUserPublic } from '../Rich/__generated__/UserDigestRichUserPublic'

export type CircleDigestFeedProps = {
  user: UserDigestRichUserPublic & Partial<UserDigestRichUserPrivate>

  header?: React.ReactNode

  date: Date | string | number
} & UserDigestRichProps

const Feed = ({ user, header, date }: CircleDigestFeedProps) => {
  return (
    <section className="container">
      {header}

      <UserDigestRich
        user={user}
        bgColor="grey-lighter"
        borderRadius="xtight"
      />

      <footer>
        <DateTime date={date} />
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

const MemoizedFeed = React.memo(Feed, ({ user: prevUser }, { user }) => {
  return (
    prevUser.id === user.id &&
    prevUser.isFollowee === user.isFollowee &&
    prevUser.isFollower === user.isFollower &&
    prevUser.isBlocked === user.isBlocked
  )
}) as MemoizedFeedType

MemoizedFeed.fragments = fragments

export default MemoizedFeed
