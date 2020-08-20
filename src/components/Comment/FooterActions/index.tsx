import gql from 'graphql-tag'
import { useContext } from 'react'

import { LikeCoinDialog, Translate, ViewerContext } from '~/components'

import { ADD_TOAST, TextId } from '~/common/enums'

import CreatedAt, { CreatedAtControls } from '../CreatedAt'
import DownvoteButton from './DownvoteButton'
import ReplyButton, { ReplyButtonProps } from './ReplyButton'
import styles from './styles.css'
import UpvoteButton from './UpvoteButton'

import { FooterActionsCommentPrivate } from './__generated__/FooterActionsCommentPrivate'
import { FooterActionsCommentPublic } from './__generated__/FooterActionsCommentPublic'

export type FooterActionsControls = {
  hasReply?: boolean
  hasCreatedAt?: boolean
  inCard?: boolean
} & CreatedAtControls &
  Pick<ReplyButtonProps, 'commentCallback'>

export type FooterActionsProps = {
  comment: FooterActionsCommentPublic & Partial<FooterActionsCommentPrivate>
} & FooterActionsControls

const fragments = {
  comment: {
    public: gql`
      fragment FooterActionsCommentPublic on Comment {
        id
        state
        ...CreatedAtComment
        ...ReplyComemnt
        ...UpvoteCommentPublic
        ...DownvoteCommentPublic
      }
      ${CreatedAt.fragments.comment}
      ${ReplyButton.fragments.comment}
      ${UpvoteButton.fragments.comment.public}
      ${DownvoteButton.fragments.comment.public}
    `,
    private: gql`
      fragment FooterActionsCommentPrivate on Comment {
        id
        article {
          id
          author {
            id
            isBlocking
          }
        }
        ...UpvoteCommentPrivate
        ...DownvoteCommentPrivate
        ...CreatedAtComment
      }
      ${CreatedAt.fragments.comment}
      ${UpvoteButton.fragments.comment.private}
      ${DownvoteButton.fragments.comment.private}
    `,
  },
}

const BaseFooterActions = ({
  comment,
  hasReply,
  hasLink,
  hasCreatedAt,
  inCard = false,

  openLikeCoinDialog,

  ...replyButtonProps
}: FooterActionsProps & { openLikeCoinDialog: () => void }) => {
  const viewer = useContext(ViewerContext)

  const { state, article } = comment
  const isActive = state === 'active'
  const isCollapsed = state === 'collapsed'
  const isDisabled = !isActive && !isCollapsed
  const addToast = (id: TextId) => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id={id} />,
        },
      })
    )
  }
  const forbid = () => addToast('FORBIDDEN_BY_STATE')

  let onClick

  if (viewer.shouldSetupLikerID) {
    onClick = openLikeCoinDialog
  } else if (viewer.isOnboarding && article.author.id !== viewer.id) {
    onClick = () => addToast('failureCommentOnboarding')
  } else if (viewer.isArchived || viewer.isFrozen) {
    onClick = forbid
  } else if (article.author.isBlocking) {
    onClick = () => addToast('failureCommentBlocked')
  }

  const buttonProps = {
    comment,
    onClick,
    disabled: isDisabled,
    inCard,
  }

  // customize case for banned user
  const replyCustomButtonProps = viewer.isBanned ? { onClick: forbid } : {}

  return (
    <footer aira-label={`${comment.upvotes} 點讚、${comment.downvotes} 點踩`}>
      <section className="left">
        {hasReply && (
          <ReplyButton
            {...buttonProps}
            {...replyButtonProps}
            {...replyCustomButtonProps}
          />
        )}

        <UpvoteButton {...buttonProps} />

        <DownvoteButton {...buttonProps} />
      </section>

      {hasCreatedAt && <CreatedAt comment={comment} hasLink={hasLink} />}
      <style jsx>{styles}</style>
    </footer>
  )
}

const FooterActions = (props: FooterActionsProps) => (
  <LikeCoinDialog>
    {({ open: openLikeCoinDialog }) => (
      <BaseFooterActions {...props} openLikeCoinDialog={openLikeCoinDialog} />
    )}
  </LikeCoinDialog>
)

FooterActions.fragments = fragments

export default FooterActions
