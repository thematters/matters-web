import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { Label } from '~/components/Label'
import { RoleLabelCommentFragment } from '~/gql/graphql'

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
  if (
    comment.node.__typename === 'Article' &&
    comment.author.id === comment.node.author.id
  ) {
    return (
      <Label color="green">
        <FormattedMessage
          defaultMessage="Author"
          id="OjC4aZ"
          description="src/components/ArticleComment/RoleLabel/index.tsx"
        />
      </Label>
    )
  }

  if (comment.fromDonator) {
    return (
      <Label color="gold">
        <FormattedMessage
          defaultMessage="Supporter"
          id="DZaTBr"
          description="src/components/ArticleComment/RoleLabel/index.tsx"
        />
      </Label>
    )
  }

  return null
}

RoleLabel.fragments = fragments

export default RoleLabel
