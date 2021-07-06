import React from 'react'

import { DateTime, UserDigest } from '~/components'
import { fragments } from '~/components/UserDigest/Rich/gql'

import styles from './styles.css'

import { FollowFeedUserPrivate } from './__generated__/FollowFeedUserPrivate'
import { FollowFeedUserPublic } from './__generated__/FollowFeedUserPublic'

export type FeedUserProps = {
  user: FollowFeedUserPublic & Partial<FollowFeedUserPrivate>
  header?: React.ReactNode
  date: Date | string | number
}

const FeedUser = ({ user, header, date }: FeedUserProps) => {
  return (
    <section className="container">
      {header}

      <UserDigest.Rich
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
type MemoizedFeedUserType = React.MemoExoticComponent<
  React.FC<FeedUserProps>
> & {
  fragments: typeof fragments
}

const MemoizedFeedUser = React.memo(
  FeedUser,
  ({ user: prevUser }, { user }) => {
    return (
      prevUser.id === user.id &&
      prevUser.isFollowee === user.isFollowee &&
      prevUser.isFollower === user.isFollower &&
      prevUser.isBlocked === user.isBlocked
    )
  }
) as MemoizedFeedUserType

MemoizedFeedUser.fragments = fragments

export default MemoizedFeedUser
