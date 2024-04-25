import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { IconPin24, Label, TextIcon } from '~/components'
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
        ... on Circle {
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

  const circle = comment.node.__typename === 'Circle' ? comment.node : undefined

  if (circle) {
    return (
      <TextIcon icon={<IconPin24 />} size="sm" color="grey" weight="md">
        <FormattedMessage
          defaultMessage="Pinned"
          id="zkmfjn"
          description="src/components/Comment/PinnedLabel/index.tsx"
        />
      </TextIcon>
    )
  }

  return (
    <Label color="green">
      <FormattedMessage
        defaultMessage="Featured"
        id="cO0im6"
        description="src/components/Comment/PinnedLabel/index.tsx"
      />
    </Label>
  )
}

PinnedLabel.fragments = fragments

export default PinnedLabel
