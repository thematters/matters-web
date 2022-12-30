import gql from 'graphql-tag'

import { useFeatures } from '~/components'

import { FollowButtonCirclePrivate } from './__generated__/FollowButtonCirclePrivate'
import Follow from './Follow'
import Unfollow from './Unfollow'

interface FollowButtonProps {
  circle: Partial<FollowButtonCirclePrivate>
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
  const features = useFeatures()

  if (!features.circle_interact) {
    return null
  }

  if (circle.isFollower) {
    return <Unfollow circle={circle} />
  } else {
    return <Follow circle={circle} />
  }
}

FollowButton.fragments = fragments

export default FollowButton
