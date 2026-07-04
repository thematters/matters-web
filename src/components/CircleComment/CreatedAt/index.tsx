import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'
import { DateTime } from '~/components'
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
        ... on Circle {
          id
          name
        }
        ... on Campaign {
          id
          shortHash
        }
      }
      createdAt
    }
  `,
}

const CreatedAt = ({ comment, hasLink }: CreatedAtProps) => {
  const circle = comment.node.__typename === 'Circle' ? comment.node : undefined
  const campaign =
    comment.node.__typename === 'WritingChallenge' ? comment.node : undefined

  if (circle || campaign) {
    const path = toPath({
      page: 'commentDetail',
      comment,
      circle,
      campaign,
    })

    if (!hasLink) {
      return <DateTime date={comment.createdAt} />
    }

    return (
      <Link {...path}>
        <DateTime date={comment.createdAt} />
      </Link>
    )
  }

  return <DateTime date={comment.createdAt} />
}

CreatedAt.fragments = fragments

export default CreatedAt
