import gql from 'graphql-tag'

import { IconPin16 } from '~/components'
import { PinnedLabelCommentFragment } from '~/gql/graphql'

const fragments = {
  comment: gql`
    fragment PinnedLabelComment on Comment {
      id
      pinned
      node {
        ... on Article {
          id
        }
      }
    }
  `,
}

const PinnedLabel = ({ comment }: { comment: PinnedLabelCommentFragment }) => {
  if (!comment.pinned) {
    return null
  }

  return <IconPin16 color="black" />
}

PinnedLabel.fragments = fragments

export default PinnedLabel
