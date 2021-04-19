import { gql } from '@apollo/client'

import Follow from './Follow'
import Unfollow from './Unfollow'

import { TagDigestFollowButtonPrivate } from './__generated__/TagDigestFollowButtonPrivate'

interface Props {
  tag: Partial<TagDigestFollowButtonPrivate>
}

const fragments = {
  tag: {
    private: gql`
      fragment TagDigestFollowButtonPrivate on Tag {
        id
        isFollower
      }
    `,
  },
}

const FollowButton = ({ tag }: Props) => {
  if (tag.isFollower) {
    return <Unfollow tag={tag} />
  }
  return <Follow tag={tag} />
}

FollowButton.fragments = fragments

export default FollowButton
