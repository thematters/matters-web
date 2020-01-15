import gql from 'graphql-tag'
import Link from 'next/link'

import { DateTime } from '~/components'

import { toCommentPath } from '~/common/utils'

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
  const commentPath = toCommentPath({ comment })

  if (hasLink) {
    return (
      <Link {...commentPath}>
        <a>
          <DateTime date={comment.createdAt} />
        </a>
      </Link>
    )
  }

  return <DateTime date={comment.createdAt} />
}

CreatedAt.fragments = fragments

export default CreatedAt
