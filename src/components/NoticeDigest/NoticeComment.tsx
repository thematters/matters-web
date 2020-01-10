import gql from 'graphql-tag'
import Link from 'next/link'

import Content from '~/components/Comment/Content'

import { makeSummary, toPath } from '~/common/utils'

import { NoticeComment as NoticeCommentType } from './__generated__/NoticeComment'

const fragments = {
  comment: gql`
    fragment NoticeComment on Comment {
      id
      state
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
      parentComment {
        id
      }
      ...ContentComment
    }

    ${Content.fragments.comment}
  `
}

const NoticeComment = ({ comment }: { comment: NoticeCommentType | null }) => {
  if (!comment) {
    return null
  }

  const parentId = comment?.parentComment?.id
  const path = toPath({
    page: 'articleDetail',
    userName: comment.article.author.userName || '',
    slug: comment.article.slug || '',
    mediaHash: comment.article.mediaHash || '',
    fragment: parentId ? `${parentId}-${comment.id}` : comment.id
  })
  const content = makeSummary(comment.content || '', 70)

  if (comment.state === 'active') {
    return (
      <Link {...path}>
        <a>
          <Content comment={{ ...comment, content }} />
        </a>
      </Link>
    )
  }

  return <Content comment={{ ...comment, content }} />
}

NoticeComment.fragments = fragments

export default NoticeComment
