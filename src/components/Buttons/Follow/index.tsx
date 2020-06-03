import gql from 'graphql-tag'
import { useContext } from 'react'

import { ViewerContext } from '~/components'

import Follow from './Follow'
import FollowState from './FollowState'
import Unfollow from './Unfollow'

import { FollowButtonUser } from './__generated__/FollowButtonUser'

interface FollowButtonProps {
  user: Partial<FollowButtonUser>
  size?: FollowButtonSize
}

const fragments = {
  user: gql`
    fragment FollowButtonUser on User {
      id
      isFollower
      isFollowee
    }
  `,
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
