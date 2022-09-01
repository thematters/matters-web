import gql from 'graphql-tag'

import { DateTime, LinkWrapper } from '~/components'

import { toPath } from '~/common/utils'

import { CreatedAtComment } from './__generated__/CreatedAtComment'

export interface CreatedAtControls {
  hasLink?: boolean
}

export type CreatedAtProps = {
  comment: CreatedAtComment
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
          mediaHash
          author {
            userName
          }
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
      circle: circle! as unknown as { __typename: 'Circle'; name: string },
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
