import gql from 'graphql-tag'

import Follow from './Follow'
import Unfollow from './Unfollow'

import { FollowButtonCirclePrivate } from './__generated__/FollowButtonCirclePrivate'

interface FollowButtonProps {
  circle: FollowButtonCirclePrivate
}

const fragments = {
  circle: {
    private: gql`
      fragment FollowButtonCirclePrivate on Circle {
        id
        name
        isFollower
      }
    `,
  },
}

const FollowButton = ({ circle }: FollowButtonProps) => {
  if (circle.isFollower) {
    return <Unfollow circle={circle} />
  } else {
    return <Follow circle={circle} />
  }
}

FollowButton.fragments = fragments

export default FollowButton
