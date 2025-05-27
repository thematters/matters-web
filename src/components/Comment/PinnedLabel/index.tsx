import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconPin from '@/public/static/icons/24px/pin.svg'
import { TEST_ID } from '~/common/enums'
import { Icon, TextIcon } from '~/components'
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
    <TextIcon
      icon={<Icon icon={IconPin} data-test-id={TEST_ID.COMMENT_PINNED_LABEL} />}
      color="grey"
      size={12}
      spacing={4}
    >
      <FormattedMessage defaultMessage="Pinned" id="fWZYP5" />
    </TextIcon>
  )
}

PinnedLabel.fragments = fragments

export default PinnedLabel
