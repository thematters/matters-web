import gql from 'graphql-tag'

import { FollowButtonUser } from './__generated__/FollowButtonUser'
import Follow from './Follow'
import FollowState from './FollowState'
import Unfollow from './Unfollow'

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
  size = 'small'
}: {
  user: FollowButtonUser
  size?: 'small' | 'default'
}) => {
  if (user.isFollowee) {
    return <Unfollow user={user} size={size} />
  } else {
    return <Follow user={user} size={size} />
  }
}

FollowButton.fragments = fragments
FollowButton.State = FollowState
