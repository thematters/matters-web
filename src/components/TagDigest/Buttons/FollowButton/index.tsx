import gql from 'graphql-tag'

import { TagDigestFollowButtonPrivate } from './__generated__/TagDigestFollowButtonPrivate'
import Follow from './Follow'
import Unfollow from './Unfollow'

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
