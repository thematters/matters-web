import gql from 'graphql-tag'
import { useContext } from 'react'

import { ViewerContext } from '~/components'

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

const BaseFollowButton = ({
  user,
  isLarge
}: {
  user: FollowButtonUser
  isLarge?: boolean
}) => {
  const viewer = useContext(ViewerContext)

  if (viewer.isInactive || viewer.id === user.id) {
    return <span />
  }

  if (user.isFollowee) {
    return <Unfollow user={user} isLarge={isLarge} />
  } else {
    return <Follow user={user} isLarge={isLarge} />
  }
}

BaseFollowButton.fragments = fragments
BaseFollowButton.State = FollowState

export const FollowButton = BaseFollowButton
