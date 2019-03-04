import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'

import { NoticeComment as NoticeCommentType } from './__generated__/NoticeComment'

const NoticeComment = ({ comment }: { comment: NoticeCommentType | null }) => {
  if (!comment) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: comment.article.author.userName || '',
    slug: comment.article.slug || '',
    mediaHash: comment.article.mediaHash || ''
  })

  return (
    <Link {...path}>
      <a>
        <span>{comment.content}</span>
      </a>
    </Link>
  )
}

NoticeComment.fragments = {
  comment: gql`
    fragment NoticeComment on Comment {
      id
      content
      article {
        id
        title
        slug
        mediaHash
        author {
          id
          userName
        }
      }
    }
  `
}

export default NoticeComment
