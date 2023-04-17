import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card } from '~/components'
import CommentContent from '~/components/Comment/Content'
import { NoticeCommentFragment } from '~/gql/graphql'

import styles from './styles.css'

const fragments = {
  comment: gql`
    fragment NoticeComment on Comment {
      id
      state
      type
      node {
        ... on Article {
          id
          title
          slug
          mediaHash
          author {
            id
            userName
          }
        }
        ... on Circle {
          id
          name
        }
      }
      parentComment {
        id
      }
      ...ContentCommentPublic
      ...ContentCommentPrivate
    }
    ${CommentContent.fragments.comment.public}
    ${CommentContent.fragments.comment.private}
  `,
}

const NoticeComment = ({
  comment,
}: {
  comment: NoticeCommentFragment | null
}) => {
  const article =
    comment?.node.__typename === 'Article' ? comment.node : undefined
  const circle =
    comment?.node.__typename === 'Circle' ? comment.node : undefined

  if (!comment) {
    return null
  }

  const path =
    comment.state === 'active'
      ? toPath({
          page: 'commentDetail',
          comment,
          article,
          circle,
        })
      : {}

  return (
    <section className="sub-content">
      <Card
        {...path}
        bgColor="grey-lighter"
        bgActiveColor="grey-lighter"
        spacing={['xtight', 'base']}
        borderRadius="xtight"
        testId={TEST_ID.DIGEST_COMMENT_NOTICE}
      >
        <CommentContent
          comment={comment}
          type="article"
          size="sm"
          bgColor="grey-lighter"
        />
      </Card>

      <style jsx>{styles}</style>
    </section>
  )
}

NoticeComment.fragments = fragments

export default NoticeComment
