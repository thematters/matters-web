import { gql } from '@apollo/client'

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
  const article = comment.node.__typename === 'Article' && comment.node

  if (!article) {
    return <DateTime date={comment.createdAt} />
  }

  const path = toPath({ page: 'commentDetail', comment, article })

  return (
    <LinkWrapper {...path} disabled={!hasLink}>
      <DateTime date={comment.createdAt} />
    </LinkWrapper>
  )
}

CreatedAt.fragments = fragments

export default CreatedAt
