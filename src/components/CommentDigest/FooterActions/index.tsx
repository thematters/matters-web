import gql from 'graphql-tag'
import jump from 'jump.js'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import { DateTime, Icon } from '~/components'
import CommentForm from '~/components/Form/CommentForm'
import { ModalSwitch } from '~/components/ModalManager'
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
  commentCallback?: () => void
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
          id
          userName
          isBlocking
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

const FooterActions: React.FC<FooterActionsProps> & {
  fragments: typeof fragments
} = ({ comment, hasForm, hasLink, refetch, commentCallback }) => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const [showForm, setShowForm] = useState(false)
  const isActive = comment.state === 'active'
  const isCollapsed = comment.state === 'collapsed'
  const isDisabled =
    (!isActive && !isCollapsed) ||
    viewer.isInactive ||
    (viewer.isOnboarding && comment.article.author.id !== viewer.id)

  const { parentComment, id } = comment
  const { slug, mediaHash, author } = comment.article
  const isBlockedByAuthor = author.isBlocking
  const fragment = parentComment?.id ? `${parentComment.id}-${id}` : id
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
  const commentFormCallback = () => {
    if (commentCallback) {
      commentCallback()
    }
    setShowForm(false)
  }

  return (
    <>
      <footer className="actions">
        <ModalSwitch modalId="likeCoinTermModal">
          {(open: any) => (
            <div className="left">
              <UpvoteButton
                comment={comment}
                onClick={viewer.shouldSetupLikerID && open}
                disabled={isDisabled}
              />

              <IconDotDivider />
              <DownvoteButton
                comment={comment}
                onClick={viewer.shouldSetupLikerID && open}
                disabled={isDisabled}
              />

              {hasForm && (
                <>
                  <IconDotDivider />

                  <button
                    type="button"
                    className={showForm ? 'active' : ''}
                    onClick={() => {
                      if (viewer.shouldSetupLikerID) {
                        open()
                      } else {
                        setShowForm(!showForm)
                      }
                    }}
                    disabled={isDisabled}
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
          )}
        </ModalSwitch>

        {/* FIXME: We cannot use <Link>: https://github.com/ReactTraining/history/issues/503 */}
        {hasLink ? (
          <a
            href={commentPath.as}
            onClick={() => {
              if (router.pathname === PATHS.ARTICLE_DETAIL.href) {
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
            articleAuthorId={comment.article.author.id}
            replyToId={comment.id}
            parentId={comment.parentComment?.id || comment.id}
            refetch={refetch}
            submitCallback={commentFormCallback}
            blocked={isBlockedByAuthor}
          />
        </section>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

FooterActions.fragments = fragments

export default FooterActions
