import gql from 'graphql-tag'
import { useContext } from 'react'

import { ViewerContext } from '~/components'

import Follow from './Follow'
import FollowState from './FollowState'
import Unfollow from './Unfollow'

import { FollowButtonUserPrivate } from './__generated__/FollowButtonUserPrivate'

interface FollowButtonProps {
  user: Partial<FollowButtonUserPrivate>
  size?: FollowButtonSize
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

export type FollowButtonSize = 'lg' | 'md' | 'md-s'

export const FollowButton = ({ user, size = 'md' }: FollowButtonProps) => {
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

FollowButton.fragments = fragments
FollowButton.State = FollowState
