import gql from 'graphql-tag'

import { ReactComponent as IconPin } from '@/public/static/icons/24px/pin.svg'
import { TEST_ID } from '~/common/enums'
import { Icon } from '~/components'
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
        ... on Moment {
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

  return (
    <Icon
      icon={IconPin}
      color="black"
      data-test-id={TEST_ID.COMMENT_PINNED_LABEL}
    />
  )
}

PinnedLabel.fragments = fragments

export default PinnedLabel
