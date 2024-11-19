import gql from 'graphql-tag'

import { BookmarkButtonTagPrivateFragment } from '~/gql/graphql'

import Bookmark from './Bookmark'
import Unbookmark from './Unbookmark'

interface FollowButtonProps {
  tag: BookmarkButtonTagPrivateFragment
}

const fragments = {
  tag: {
    private: gql`
      fragment BookmarkButtonTagPrivate on Tag {
        id
        isFollower
      }
    `,
  },
}

const FollowButton = ({ tag }: FollowButtonProps) => {
  if (tag.isFollower) {
    return <Unbookmark tag={tag} />
  } else {
    return <Bookmark tag={tag} />
  }
}

FollowButton.fragments = fragments

export default FollowButton
