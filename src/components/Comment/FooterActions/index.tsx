import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Comment } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'
import { ViewerContext } from '~/components/Viewer'

import CreatedAt, { CreatedAtControls } from '../CreatedAt'
import DownvoteButton from './DownvoteButton'
import ReplyButton from './ReplyButton'
import styles from './styles.css'
import UpvoteButton from './UpvoteButton'

import { FooterActionsComment } from './__generated__/FooterActionsComment'

export type FooterActionsControls = {
  hasReply?: boolean
  hasCreatedAt?: boolean
  commentCallback?: () => void
} & CreatedAtControls

export type FooterActionsProps = {
  comment: FooterActionsComment
} & FooterActionsControls

const fragments = {
  comment: gql`
    fragment FooterActionsComment on Comment {
      id
      state
      article {
        id
        author {
          id
          isBlocking
        }
      }
      parentComment {
        id
      }
      ...UpvoteComment
      ...DownvoteComment
      ...CreatedAtComment
    }

    ${UpvoteButton.fragments.comment}
    ${DownvoteButton.fragments.comment}
    ${CreatedAt.fragments.comment}
  `
}

const FooterActions = ({
  comment,
  hasReply,
  hasLink,
  hasCreatedAt,
  commentCallback
}: FooterActionsProps) => {
  const viewer = useContext(ViewerContext)
  const [showForm, setShowForm] = useState(false)

  const { id, state, article, parentComment } = comment
  const isActive = state === 'active'
  const isCollapsed = state === 'collapsed'
  const isDisabled =
    (!isActive && !isCollapsed) ||
    viewer.isInactive ||
    (viewer.isOnboarding && article.author.id !== viewer.id)

  const onClickReplyButton = () => {
    if (viewer.shouldSetupLikerID) {
      open()
    } else {
      setShowForm(!showForm)
    }
  }
  const submitCallback = () => {
    if (commentCallback) {
      commentCallback()
    }
    setShowForm(false)
  }

  return (
    <>
      <footer>
        <ModalSwitch modalId="likeCoinTermModal">
          {(open: any) => (
            <section className="left">
              {hasReply && (
                <ReplyButton
                  onClick={onClickReplyButton}
                  active={showForm}
                  disabled={isDisabled}
                />
              )}

              <UpvoteButton
                comment={comment}
                onClick={viewer.shouldSetupLikerID && open}
                disabled={isDisabled}
              />

              <DownvoteButton
                comment={comment}
                onClick={viewer.shouldSetupLikerID && open}
                disabled={isDisabled}
              />
            </section>
          )}
        </ModalSwitch>

        {hasCreatedAt && <CreatedAt comment={comment} hasLink={hasLink} />}
      </footer>

      {showForm && (
        <section className="reply-form">
          <Comment.Form
            articleId={article.id}
            articleAuthorId={article.author.id}
            replyToId={id}
            parentId={parentComment?.id || id}
            submitCallback={submitCallback}
            blocked={article.author.isBlocking}
          />
        </section>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

FooterActions.fragments = fragments

export default FooterActions
