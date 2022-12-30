import gql from 'graphql-tag'

import { TagDigestFollowButtonPrivateFragment } from '~/gql/graphql'

import Follow from './Follow'
import Unfollow from './Unfollow'

interface Props {
  tag: Partial<TagDigestFollowButtonPrivateFragment>
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
