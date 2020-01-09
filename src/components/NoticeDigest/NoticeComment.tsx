import gql from 'graphql-tag'

import CommentContent from '~/components/Comment/Content'

import { makeSummary, toPath } from '~/common/utils'

import { NoticeComment as NoticeCommentType } from './__generated__/NoticeComment'

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
      <a href={path.as}>
        <CommentContent content={content} state={comment.state} />
      </a>
    )
  }

  return <CommentContent content={content} state={comment.state} />
}

NoticeComment.fragments = {
  comment: gql`
    fragment NoticeComment on Comment {
      id
      content
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
    }
  `
}

export default NoticeComment
