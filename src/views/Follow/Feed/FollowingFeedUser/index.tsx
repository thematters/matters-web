import React from 'react'

import { DateTime, UserDigest } from '~/components'
import { fragments } from '~/components/UserDigest/Rich/gql'
import {
  FollowingFeedUserPrivateFragment,
  FollowingFeedUserPublicFragment,
} from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import styles from './styles.module.css'

export type FeedUserProps = {
  user: FollowingFeedUserPublicFragment &
    Partial<FollowingFeedUserPrivateFragment>
  header?: React.ReactNode
  date: Date | string | number
} & DropdownActionsControls

const FeedUser = ({ user, header, date, actions }: FeedUserProps) => {
  return (
    <section className={styles.container}>
      {header}

      <UserDigest.Rich
        user={user}
        bgColor="greyLighter"
        borderRadius="xtight"
      />

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
      prevUser.isFollower === user.isFollower
    )
  }
) as MemoizedFeedUserType

MemoizedFeedUser.fragments = fragments

export default MemoizedFeedUser
