import gql from 'graphql-tag'

import { FollowButtonTagPrivateFragment } from '~/gql/graphql'

import Follow from './Follow'
import Unfollow from './Unfollow'

interface FollowButtonProps {
  tag: FollowButtonTagPrivateFragment
}

const fragments = {
  tag: {
    private: gql`
      fragment FollowButtonTagPrivate on Tag {
        id
        isFollower
      }
    `,
  },
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
