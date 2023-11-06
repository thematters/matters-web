import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { IconPin24, TextIcon } from '~/components'
import { PinnedLabelCommentFragment } from '~/gql/graphql'

import styles from './styles.module.css'

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
    <span className={styles.label}>
      <FormattedMessage
        defaultMessage="Featured"
        id="cO0im6"
        description="src/components/Comment/PinnedLabel/index.tsx"
      />
    </span>
  )
}

PinnedLabel.fragments = fragments

export default PinnedLabel
