import gql from 'graphql-tag'

import { Button, DateTime } from '~/components'

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
  `
}

const CreatedAt = ({ comment, hasLink }: CreatedAtProps) => {
  const path = toPath({ page: 'commentDetail', comment })

  return (
    <Button {...path} is={!hasLink ? 'span' : undefined}>
      <DateTime date={comment.createdAt} />
    </Button>
  )
}

CreatedAt.fragments = fragments

export default CreatedAt
