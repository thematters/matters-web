import gql from 'graphql-tag'
import { useContext } from 'react'

import { ViewerContext } from '~/components/Viewer'

import Follow from './Follow'
import FollowState from './FollowState'
import Unfollow from './Unfollow'

import { FollowButtonUser } from './__generated__/FollowButtonUser'

const fragments = {
  user: gql`
    fragment FollowButtonUser on User {
      id
      isFollower
      isFollowee
    }
  `
}

export const FollowButton = ({
  user,
  size = 'sm'
}: {
  user: FollowButtonUser
  size?: 'sm' | 'default'
}) => {
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
