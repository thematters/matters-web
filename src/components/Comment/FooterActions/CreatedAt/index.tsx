import gql from 'graphql-tag'
import jump from 'jump.js'
import { useRouter } from 'next/router'

import { DateTime } from '~/components'

import { PATHS } from '~/common/enums'
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
  const router = useRouter()

  const { parentComment, id } = comment
  const { slug, mediaHash, author } = comment.article
  const fragment = parentComment?.id ? `${parentComment.id}-${id}` : id
  const commentPath =
    author.userName && mediaHash
      ? toPath({
          page: 'articleDetail',
          userName: author.userName,
          slug,
          mediaHash,
          fragment
        })
      : { href: '', as: '' }

  /**
   * FIXME: https://github.com/ReactTraining/history/issues/503
   */
  if (hasLink) {
    return (
      <a
        href={commentPath.as}
        onClick={() => {
          if (router.pathname === PATHS.ARTICLE_DETAIL.href) {
            jump(`#${fragment}`, {
              offset: -64
            })
          }
        }}
      >
        <DateTime date={comment.createdAt} />
      </a>
    )
  }

  return <DateTime date={comment.createdAt} />
}

CreatedAt.fragments = fragments

export default CreatedAt
