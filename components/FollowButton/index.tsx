// External modules
import gql from 'graphql-tag'

// Internal modules
import Follow from './Follow'
import FollowState from './FollowState'
import Unfollow from './Unfollow'

import { FollowStateUser } from './__generated__/FollowStateUser'

const fragments = {
  user: gql`
    fragment FollowStateUser on User {
      id
      isFollower
      isFollowee
    }
  `
}

export const FollowButton = ({ user }: { user: FollowStateUser }) => {
  if (user.isFollowee) {
    return <Unfollow user={user} />
  } else {
    return <Follow user={user} />
  }
}

FollowButton.fragments = fragments
FollowButton.State = FollowState
