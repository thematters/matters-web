import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import CommentForm from '~/components/Form/CommentForm'
import { ModalSwitch } from '~/components/ModalManager'
import { ViewerContext } from '~/components/Viewer'

import CreatedAt, { CreatedAtControls } from './CreatedAt'
import DownvoteButton from './DownvoteButton'
import ReplyButton from './ReplyButton'
import styles from './styles.css'
import UpvoteButton from './UpvoteButton'

import { FooterActionsComment } from './__generated__/FooterActionsComment'

export type FooterActionsControls = {
  refetch?: boolean
  hasReply?: boolean
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
  refetch
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

  return (
    <>
      <footer>
        <ModalSwitch modalId="likeCoinTermModal">
          {(open: any) => (
            <section className="left">
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

              {hasReply && (
                <ReplyButton
                  onClick={() => {
                    if (viewer.shouldSetupLikerID) {
                      open()
                    } else {
                      setShowForm(!showForm)
                    }
                  }}
                  active={showForm}
                  disabled={isDisabled}
                />
              )}
            </section>
          )}
        </ModalSwitch>

        <CreatedAt comment={comment} hasLink={hasLink} />
      </footer>

      {showForm && (
        <section className="reply-form">
          <CommentForm
            articleId={article.id}
            articleAuthorId={article.author.id}
            replyToId={id}
            parentId={parentComment?.id || id}
            refetch={refetch}
            submitCallback={() => {
              setShowForm(false)
            }}
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
