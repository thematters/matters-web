import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  CommentFormType,
  LanguageContext,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, OPEN_LIKE_COIN_DIALOG, TextId } from '~/common/enums'
import { translate } from '~/common/utils'

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
  hasUpvote?: boolean
  hasDownvote?: boolean
  inCard?: boolean
  disabled?: boolean
} & CreatedAtControls &
  Pick<ReplyButtonProps, 'replySubmitCallback'>

export type FooterActionsProps = {
  comment: FooterActionsCommentPublic & Partial<FooterActionsCommentPrivate>
  type: CommentFormType
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
      }
      ${CreatedAt.fragments.comment}
      ${ReplyButton.fragments.comment}
      ${UpvoteButton.fragments.comment.public}
    `,
    private: gql`
      fragment FooterActionsCommentPrivate on Comment {
        id
        node {
          ... on Circle {
            id
            owner {
              id
              isBlocking
            }
          }
          ... on Article {
            id
            author {
              id
              isBlocking
            }
          }
        }
        ...UpvoteCommentPrivate
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
  type,
  hasReply,
  hasLink,
  hasCreatedAt,
  hasUpvote = true,
  hasDownvote = true,
  inCard = false,
  disabled,

  ...replyButtonProps
}: FooterActionsProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const { state, node } = comment
  const article = node.__typename === 'Article' ? node : undefined
  const circle = node.__typename === 'Circle' ? node : undefined
  const targetAuthor = article?.author || circle?.owner

  const isActive = state === 'active'
  const isCollapsed = state === 'collapsed'
  const isDisabled = disabled || (!isActive && !isCollapsed)
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
    onClick = () =>
      window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
  } else if (viewer.isOnboarding && targetAuthor?.id !== viewer.id) {
    onClick = () => addToast('failureCommentOnboarding')
  } else if (viewer.isArchived || viewer.isFrozen) {
    onClick = forbid
  } else if (targetAuthor?.isBlocking) {
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
    <footer
      aria-label={translate({
        zh_hant: `${comment.upvotes} 點讚`,
        zh_hans: `${comment.upvotes} 点赞`,
        en: `${comment.upvotes} upvotes`,
        lang,
      })}
    >
      <section className="left">
        {hasReply && (
          <ReplyButton
            type={type}
            {...buttonProps}
            {...replyButtonProps}
            {...replyCustomButtonProps}
          />
        )}

        {hasUpvote && <UpvoteButton {...buttonProps} />}

        {hasDownvote && <DownvoteButton {...buttonProps} />}
      </section>

      {hasCreatedAt && <CreatedAt comment={comment} hasLink={hasLink} />}
      <style jsx>{styles}</style>
    </footer>
  )
}

const FooterActions = (props: FooterActionsProps) => (
  <BaseFooterActions {...props} />
)

FooterActions.fragments = fragments

export default FooterActions
