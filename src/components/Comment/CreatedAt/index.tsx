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
      article {
        id
        slug
        mediaHash
        author {
          userName
        }
      }
      createdAt
    }
  `,
}

const CreatedAt = ({ comment, hasLink }: CreatedAtProps) => {
  const path = toPath({ page: 'commentDetail', comment })

  return (
    <LinkWrapper {...path} disabled={!hasLink}>
      <DateTime date={comment.createdAt} />
    </LinkWrapper>
  )
}

CreatedAt.fragments = fragments

export default CreatedAt
