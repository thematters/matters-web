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

const RoleLabel = ({ comment }: { comment: RoleLabelCommentFragment }) => {
  // if (
  //   !comment.fromDonator &&
  //   comment.node.__typename === 'Article' &&
  //   comment.author.id !== comment.node.author.id
  // ) {
  //   return null
  // }

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
