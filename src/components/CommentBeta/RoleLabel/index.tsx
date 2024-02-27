import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { RoleLabelCommentFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  comment: gql`
    fragment RoleLabelComment on Comment {
      id
      fromDonator
      author {
        id
      }
      node {
        id
        ... on Article {
          author {
            id
          }
        }
      }
    }
  `,
}

// TODO: reuse <Label> component
// https://github.com/thematters/matters-web/pull/4192#discussion_r1495549659
const RoleLabel = ({ comment }: { comment: RoleLabelCommentFragment }) => {
  if (
    comment.node.__typename === 'Article' &&
    comment.author.id === comment.node.author.id
  ) {
    return (
      <span className={`${styles.label} ${styles.authorLabel}`}>
        <FormattedMessage
          defaultMessage="Author"
          id="78qsg6"
          description="src/components/Comment/RoleLabel/index.tsx"
        />
      </span>
    )
  }

  if (comment.fromDonator) {
    return (
      <span className={`${styles.label} ${styles.supporterLabel}`}>
        <FormattedMessage
          defaultMessage="Supporter"
          id="jc3mW/"
          description="src/components/Comment/RoleLabel/index.tsx"
        />
      </span>
    )
  }

  return null
}

RoleLabel.fragments = fragments

export default RoleLabel
