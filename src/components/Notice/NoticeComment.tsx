import gql from 'graphql-tag'

import { Card } from '~/components'
import CommentContent from '~/components/Comment/Content'

import { makeSummary, toPath } from '~/common/utils'

import styles from './styles.css'

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

    ${CommentContent.fragments.comment}
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
      <section className="comment-content">
        <Card
          {...path}
          bgColor="grey-lighter"
          spacing={['xtight', 'base']}
          fontSize="md-s"
        >
          <CommentContent comment={{ ...comment, content }} />
        </Card>

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className="comment-content">
      <CommentContent comment={{ ...comment, content }} />

      <style jsx>{styles}</style>
    </section>
  )
}

NoticeComment.fragments = fragments

export default NoticeComment
