import gql from 'graphql-tag'
import { useContext } from 'react'

import { ViewerContext } from '~/components'

import Follow from './Follow'
import FollowState from './FollowState'
import Unfollow from './Unfollow'

import { FollowButtonUserPrivate } from './__generated__/FollowButtonUserPrivate'

interface FollowUserButtonProps {
  user: Partial<FollowButtonUserPrivate>
  inProfile?: boolean
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

export const FollowUserButton = ({
  user,
  inProfile,
}: FollowUserButtonProps) => {
  const viewer = useContext(ViewerContext)

  if (viewer.isInactive || viewer.id === user.id) {
    return <span />
  }

  if (user.isFollowee) {
    return <Unfollow user={user} inProfile={inProfile} />
  } else {
    return <Follow user={user} inProfile={inProfile} />
  }
}

FollowUserButton.fragments = fragments
FollowUserButton.State = FollowState
