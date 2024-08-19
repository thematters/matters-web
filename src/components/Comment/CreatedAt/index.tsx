import gql from 'graphql-tag'

import { toPath } from '~/common/utils'
import { DateTime, LinkWrapper } from '~/components'
import { CreatedAtCommentFragment } from '~/gql/graphql'

export interface CreatedAtControls {
  hasLink?: boolean
}

export type CreatedAtProps = {
  comment: CreatedAtCommentFragment
} & CreatedAtControls

const fragments = {
  comment: gql`
    fragment CreatedAtComment on Comment {
      id
      type
      parentComment {
        id
      }
      node {
        ... on Article {
          id
          slug
          shortHash
          author {
            userName
          }
        }
        ... on Circle {
          id
          name
        }
      }
      createdAt
    }
  `,
}

const CreatedAt = ({ comment, hasLink }: CreatedAtProps) => {
  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
  const circle = comment.node.__typename === 'Circle' ? comment.node : undefined

  if (article || circle) {
    const path = toPath({
      page: 'commentDetail',
      comment,
      article,
      circle,
    })
    return (
      <LinkWrapper {...path} disabled={!hasLink}>
        <DateTime date={comment.createdAt} />
      </LinkWrapper>
    )
  }

  return <DateTime date={comment.createdAt} />
}

CreatedAt.fragments = fragments

export default CreatedAt
