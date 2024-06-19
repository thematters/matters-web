import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import { CircleCommentFormType, toast, ViewerContext } from '~/components'
import {
  CircleCommentFooterActionsCommentPrivateFragment,
  CircleCommentFooterActionsCommentPublicFragment,
} from '~/gql/graphql'

import CreatedAt, { CreatedAtControls } from '../CreatedAt'
import DownvoteButton from './DownvoteButton'
import ReplyButton, { ReplyButtonProps } from './ReplyButton'
import styles from './styles.module.css'
import UpvoteButton from './UpvoteButton'

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
  comment: CircleCommentFooterActionsCommentPublicFragment &
    Partial<CircleCommentFooterActionsCommentPrivateFragment>
  type: CircleCommentFormType
} & FooterActionsControls

const fragments = {
  comment: {
    public: gql`
      fragment CircleCommentFooterActionsCommentPublic on Comment {
        id
        state
        ...CreatedAtComment
        ...CircleCommentReplyComemnt
        ...CircleCommentUpvoteCommentPublic
        ...CircleCommentDownvoteCommentPublic
      }
      ${CreatedAt.fragments.comment}
      ${ReplyButton.fragments.comment}
      ${UpvoteButton.fragments.comment.public}
      ${DownvoteButton.fragments.comment.public}
    `,
    private: gql`
      fragment CircleCommentFooterActionsCommentPrivate on Comment {
        id
        node {
          ... on Circle {
            id
            name
            owner {
              id
              isBlocking
            }
          }
        }
        ...CircleCommentUpvoteCommentPrivate
        ...CircleCommentDownvoteCommentPrivate
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
  const intl = useIntl()
  const viewer = useContext(ViewerContext)

  const { state, node } = comment
  const circle = node.__typename === 'Circle' ? node : undefined
  const targetAuthor = circle?.owner

  const isActive = state === 'active'
  const isCollapsed = state === 'collapsed'
  const isDisabled = disabled || (!isActive && !isCollapsed)
  const forbid = () =>
    toast.error({
      message: (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })

  let onClick

  if (viewer.isArchived || viewer.isFrozen) {
    onClick = forbid
  } else if (targetAuthor?.isBlocking) {
    onClick = () =>
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="The author has disabled comments for this circle"
            id="RPH69U"
          />
        ),
      })
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
      className={styles.footer}
      aria-label={intl.formatMessage(
        {
          defaultMessage: `{upvotes} upvotes`,
          id: 'BW89hS',
        },
        { upvotes: comment.upvotes }
      )}
    >
      <section className={styles.left}>
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
    </footer>
  )
}

const FooterActions = (props: FooterActionsProps) => (
  <BaseFooterActions {...props} />
)

FooterActions.fragments = fragments

export default FooterActions
