import gql from 'graphql-tag'
import { useContext } from 'react'

import { ViewerContext } from '~/components'
import { FollowButtonUserPrivateFragment } from '~/gql/graphql'

import Follow from './Follow'
import FollowState from './FollowState'
import Unfollow from './Unfollow'

interface FollowUserButtonProps {
  user: Partial<FollowButtonUserPrivateFragment>
  size?: FollowUserButtonSize
  borderWidth?: 'sm' | 'md'
}

const fragments = {
  user: {
    private: gql`
      fragment FollowButtonUserPrivate on User {
        id
        status {
          state
        }
        isFollower
        isFollowee
      }
    `,
  },
}

export type FollowUserButtonSize = 'xl' | 'lg' | 'md'

export const FollowUserButton = ({
  user,
  size = 'md',
  borderWidth = 'md',
}: FollowUserButtonProps) => {
  const viewer = useContext(ViewerContext)

  if (viewer.isInactive || viewer.id === user.id) {
    return <span />
  }

  if (user.isFollowee) {
    return <Unfollow user={user} size={size} />
  } else {
    const isArchived = user?.status?.state === 'archived'
    if (isArchived) {
      return <span />
    }

    return <Follow user={user} size={size} borderWidth={borderWidth} />
  }
}

FollowUserButton.fragments = fragments
FollowUserButton.State = FollowState
