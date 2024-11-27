import gql from 'graphql-tag'

import { TagBookmarkButtonTagPrivateFragment } from '~/gql/graphql'

import Bookmark from './Bookmark'
import Unbookmark from './Unbookmark'

interface TagBookmarkButtonProps {
  tag: TagBookmarkButtonTagPrivateFragment
}

const fragments = {
  tag: {
    private: gql`
      fragment TagBookmarkButtonTagPrivate on Tag {
        id
        isFollower
      }
    `,
  },
}

export const TagBookmarkButton = ({ tag }: TagBookmarkButtonProps) => {
  if (tag.isFollower) {
    return <Unbookmark tag={tag} />
  } else {
    return <Bookmark tag={tag} />
  }
}

TagBookmarkButton.fragments = fragments
