import gql from 'graphql-tag'
import jump from 'jump.js'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext, useState } from 'react'

import { DateTime, Icon } from '~/components'
import CommentForm from '~/components/Form/CommentForm'
import { ViewerContext } from '~/components/Viewer'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'
import ICON_COMMENT_SMALL from '~/static/icons/comment-small.svg?sprite'
import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'

import { DigestActionsComment } from './__generated__/DigestActionsComment'
import DownvoteButton from './DownvoteButton'
import styles from './styles.css'
import UpvoteButton from './UpvoteButton'
export interface FooterActionsControls {
  hasForm?: boolean
  hasLink?: boolean
  refetch?: boolean
}
type FooterActionsProps = {
  comment: DigestActionsComment
} & FooterActionsControls

const fragments = {
  comment: gql`
    fragment DigestActionsComment on Comment {
      id
      createdAt
      state
      article {
        id
        slug
        mediaHash
        author {
          userName
        }
      }
      parentComment {
        id
      }
      replyTo {
        id
      }
      ...UpvoteComment
      ...DownvoteComment
    }
    ${UpvoteButton.fragments.comment}
    ${DownvoteButton.fragments.comment}
  `
}

const IconDotDivider = () => (
  <Icon
    id={ICON_DOT_DIVIDER.id}
    viewBox={ICON_DOT_DIVIDER.viewBox}
    style={{ width: 18, height: 18 }}
  />
)

const FooterActions: React.FC<WithRouterProps & FooterActionsProps> = ({
  router,
  comment,
  hasForm,
  hasLink,
  refetch
}) => {
  const viewer = useContext(ViewerContext)
  const [showForm, setShowForm] = useState(false)
  const isActive = comment.state === 'active'

  const { parentComment, id } = comment
  const { slug, mediaHash, author } = comment.article
  const fragment =
    parentComment && parentComment.id ? `${parentComment.id}-${id}` : id
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

  return (
    <>
      <footer className="actions">
        <div className="left">
          <UpvoteButton
            comment={comment}
            disabled={!isActive || viewer.isInactive}
          />

          <IconDotDivider />
          <DownvoteButton
            comment={comment}
            disabled={!isActive || viewer.isInactive}
          />

          {hasForm && (
            <>
              <IconDotDivider />
              <button
                type="button"
                className={showForm ? 'active' : ''}
                onClick={() => {
                  setShowForm(!showForm)
                }}
                disabled={!isActive || viewer.isInactive}
              >
                <Icon
                  id={ICON_COMMENT_SMALL.id}
                  viewBox={ICON_COMMENT_SMALL.viewBox}
                  size="small"
                />
              </button>
            </>
          )}
        </div>

        {/* We cannot use <Link>: https://github.com/ReactTraining/history/issues/503 */}
        {hasLink ? (
          <a
            href={commentPath.as}
            onClick={() => {
              if (router && router.pathname === PATHS.ARTICLE_DETAIL.href) {
                jump(`#${fragment}`, {
                  offset: -64
                })
              }
            }}
          >
            <DateTime date={comment.createdAt} />
          </a>
        ) : (
          <DateTime date={comment.createdAt} />
        )}
      </footer>

      {showForm && (
        <section className="comment-form">
          <CommentForm
            articleId={comment.article.id}
            replyToId={comment.id}
            parentId={_get(comment, 'parentComment.id') || comment.id}
            refetch={refetch}
            submitCallback={() => setShowForm(false)}
          />
        </section>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

const WrappedFooterActions: any = withRouter(FooterActions)

WrappedFooterActions.fragments = fragments

export default WrappedFooterActions
