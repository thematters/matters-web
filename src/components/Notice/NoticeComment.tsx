import gql from 'graphql-tag'
import Link from 'next/link'
import { FormattedMessage, useIntl } from 'react-intl'

import { PATHS } from '~/common/enums'
import { MOMENT_DIGEST_REFERRER } from '~/common/enums/moment'
import { sessionStorage, toPath } from '~/common/utils'
import { Media, MomentDetailDialog, toast, useRoute } from '~/components'
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
          articleState: state
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
          momentState: state
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
  const { router } = useRoute()

  const article =
    comment?.node.__typename === 'Article' ? comment.node : undefined
  const circle =
    comment?.node.__typename === 'Circle' ? comment.node : undefined
  const moment =
    comment?.node.__typename === 'Moment' ? comment.node : undefined

  const setReferrer = () => {
    sessionStorage.set(MOMENT_DIGEST_REFERRER, true)
  }

  const goToMomentDetail = () => {
    setReferrer()
    router.push(path.href)
  }

  if (!comment) {
    return null
  }

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

  if (
    comment.state === 'active' &&
    ((moment && moment.momentState === 'archived') ||
      (article && article.articleState === 'archived'))
  ) {
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

  if (moment) {
    return (
      <>
        <Media at="sm">
          <a
            href={path.href}
            onClick={(e) => {
              e.preventDefault()
              goToMomentDetail()
            }}
          >
            <section>
              <NoticeContentDigest content={comment.content || ''} />
            </section>
          </a>
        </Media>
        <Media greaterThan="sm">
          <MomentDetailDialog shortHash={moment.shortHash}>
            {({ openDialog }) => (
              <a
                href={path.href}
                onClick={(e) => {
                  e.preventDefault()
                  // add hash to the url
                  window.history.replaceState(
                    {},
                    '',
                    `${PATHS.ME_NOTIFICATIONS}#${comment.id}`
                  )
                  openDialog()
                }}
              >
                <section>
                  <NoticeContentDigest content={comment.content || ''} />
                </section>
              </a>
            )}
          </MomentDetailDialog>
        </Media>
      </>
    )
  }

  return (
    <Link {...path}>
      <section>
        <NoticeContentDigest content={comment.content || ''} />
      </section>
    </Link>
  )
}

NoticeComment.fragments = fragments

export default NoticeComment
