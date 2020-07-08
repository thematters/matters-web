import gql from 'graphql-tag'

import Follow from './Follow'
import Unfollow from './Unfollow'

import { FollowButtonTag as FollowButtonTagType } from './__generated__/FollowButtonTag'

interface FollowButtonProps {
  tag: FollowButtonTagType
}

const fragments = {
  tag: gql`
    fragment FollowButtonTag on Tag {
      id
      isFollower
    }
  `,
}

const FollowButton = ({ tag }: FollowButtonProps) => {
  if (tag.isFollower) {
    return <Unfollow tag={tag} />
  } else {
    return <Follow tag={tag} />
  }
}

FollowButton.fragments = fragments

export default FollowButton
