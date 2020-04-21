import gql from 'graphql-tag'
import { useContext } from 'react'

import { LikeCoinDialog, Translate, ViewerContext } from '~/components'

import { ADD_TOAST, TextId } from '~/common/enums'

import CreatedAt, { CreatedAtControls } from '../CreatedAt'
import DownvoteButton from './DownvoteButton'
import ReplyButton, { ReplyButtonProps } from './ReplyButton'
import styles from './styles.css'
import UpvoteButton from './UpvoteButton'

import { FooterActionsComment } from './__generated__/FooterActionsComment'

export type FooterActionsControls = {
  hasReply?: boolean
  hasCreatedAt?: boolean
  inCard?: boolean
} & CreatedAtControls &
  Pick<ReplyButtonProps, 'commentCallback'>

export type FooterActionsProps = {
  comment: FooterActionsComment
} & FooterActionsControls

const fragments = {
  comment: gql`
    fragment FooterActionsComment on Comment {
      id
      state
      ...ReplyComemnt
      ...UpvoteComment
      ...DownvoteComment
      ...CreatedAtComment
    }

    ${ReplyButton.fragments.comment}
    ${UpvoteButton.fragments.comment}
    ${DownvoteButton.fragments.comment}
    ${CreatedAt.fragments.comment}
  `,
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
  const forbid = () => addToast('FORBIDDEN')

  let onClick

  if (viewer.shouldSetupLikerID) {
    onClick = openLikeCoinDialog
  } else if (viewer.isOnboarding && article.author.id !== viewer.id) {
    onClick = () => addToast('failureCommentOnboarding')
  } else if (viewer.isArchived) {
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
        {hasReply && <ReplyButton {...buttonProps} {...replyButtonProps} {...replyCustomButtonProps} />}

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
