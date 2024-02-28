import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { IconPin16 } from '~/components'
import { PinnedLabelBetaCommentFragment } from '~/gql/graphql'

const fragments = {
  comment: gql`
    fragment PinnedLabelBetaComment on Comment {
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

const PinnedLabel = ({
  comment,
}: {
  comment: PinnedLabelBetaCommentFragment
}) => {
  if (!comment.pinned) {
    return null
  }

  return <IconPin16 color="black" data-test-id={TEST_ID.COMMENT_PINNED_LABEL} />
}

PinnedLabel.fragments = fragments

export default PinnedLabel
