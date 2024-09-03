import gql from 'graphql-tag'
import { FormattedMessage, useIntl } from 'react-intl'

import { toPath } from '~/common/utils'
import { LinkWrapper, toast } from '~/components'
import { CommentContent } from '~/components/Comment/Content'
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
          shortHash
          author {
            id
            userName
          }
        }
        ... on Circle {
          id
          name
        }
        ... on Moment {
          id
          state
          shortHash
        }
      }
      parentComment {
        id
      }
      comments(input: { first: 0 }) {
        totalCount
      }
      ...CommentContentCommentPublic
      ...CommentContentCommentPrivate
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
  const intl = useIntl()

  const article =
    comment?.node.__typename === 'Article' ? comment.node : undefined
  const circle =
    comment?.node.__typename === 'Circle' ? comment.node : undefined
  const moment =
    comment?.node.__typename === 'Moment' ? comment.node : undefined

  if (!comment) {
    return null
  }

  console.log({ comment })

  if (
    comment.state === 'banned' &&
    ((comment.parentComment === null && comment.comments?.totalCount === 0) ||
      comment.parentComment !== null)
  ) {
    return (
      <button
        onClick={() => {
          toast.success({
            message: (
              <FormattedMessage
                defaultMessage="This comment has been hidden due to violation of community terms of services"
                id="0tRUjd"
              />
            ),
          })
        }}
      >
        <section>
          <NoticeContentDigest content={comment.content || ''} />
        </section>
      </button>
    )
  }

  if (comment.state === 'archived' && moment) {
    return (
      <section>
        <NoticeContentDigest
          content={intl.formatMessage({
            defaultMessage: 'Comment deleted',
            description: 'src/components/Notice/NoticeComment.tsx/moment',
            id: 'Ci7dxf',
          })}
          color="grey"
        />
      </section>
    )
  }

  if (comment.state === 'archived' && article) {
    return (
      <section>
        <NoticeContentDigest
          content={intl.formatMessage({
            defaultMessage: 'Comment deleted',
            description: 'src/components/Notice/NoticeComment.tsx/article',
            id: '7zn5ig',
          })}
          color="grey"
        />
      </section>
    )
  }

  if (comment.state === 'active' && moment && moment.state === 'archived') {
    return (
      <section>
        <NoticeContentDigest content={comment.content || ''} color="grey" />
      </section>
    )
  }
  const path =
    article || circle
      ? toPath({
          page: 'commentDetail',
          comment,
          article,
          circle,
        })
      : moment
      ? toPath({
          page: 'momentComment',
          moment,
          comment,
        })
      : {
          href: '',
          as: '',
        }

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
