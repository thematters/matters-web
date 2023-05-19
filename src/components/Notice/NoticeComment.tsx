import gql from 'graphql-tag'

import { toPath } from '~/common/utils'
import { LinkWrapper } from '~/components'
import CommentContent from '~/components/Comment/Content'
import { NoticeCommentFragment } from '~/gql/graphql'

import NoticeContentDigest from './NoticeContentDigest'

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
      : { href: '' }

  return (
    <LinkWrapper {...path}>
      <section>
        <NoticeContentDigest content={comment.content || ''} />
      </section>
    </LinkWrapper>
  )
}

NoticeComment.fragments = fragments

export default NoticeComment
