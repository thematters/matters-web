import gql from 'graphql-tag'

import { Card, Expandable } from '~/components'
import CommentContent from '~/components/Comment/Content'

import { toPath } from '~/common/utils'

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

  const path =
    comment.state !== 'active'
      ? toPath({
          page: 'commentDetail',
          comment
        })
      : {}

  return (
    <section className="comment-content">
      <Card
        {...path}
        bgColor="grey-lighter"
        spacing={['xtight', 'base']}
        textSize="md-s"
      >
        <Expandable>
          <CommentContent comment={comment} />
        </Expandable>
      </Card>

      <style jsx>{styles}</style>
    </section>
  )
}

NoticeComment.fragments = fragments

export default NoticeComment
