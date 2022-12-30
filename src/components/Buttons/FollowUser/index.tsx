import gql from 'graphql-tag'
import { useContext } from 'react'

import { ViewerContext } from '~/components'

import { FollowButtonUserPrivate } from './__generated__/FollowButtonUserPrivate'
import Follow from './Follow'
import FollowState from './FollowState'
import Unfollow from './Unfollow'

interface FollowUserButtonProps {
  user: Partial<FollowButtonUserPrivate>
  size?: FollowUserButtonSize
}

const fragments = {
  user: {
    private: gql`
      fragment FollowButtonUserPrivate on User {
        id
        isFollower
        isFollowee
      }
    `,
  },
}

export type FollowUserButtonSize = 'lg' | 'md' | 'md-s'

export const FollowUserButton = ({
  user,
  size = 'md',
}: FollowUserButtonProps) => {
  const viewer = useContext(ViewerContext)

  if (viewer.isInactive || viewer.id === user.id) {
    return <span />
  }

  if (user.isFollowee) {
    return <Unfollow user={user} size={size} />
  } else {
    return <Follow user={user} size={size} />
  }
}

FollowUserButton.fragments = fragments
FollowUserButton.State = FollowState
