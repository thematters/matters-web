import gql from 'graphql-tag'
import { useContext } from 'react'

import { TextId } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  CommentFormType,
  LanguageContext,
  toast,
  Translate,
  ViewerContext,
} from '~/components'
import {
  FooterActionsCommentPrivateFragment,
  FooterActionsCommentPublicFragment,
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
  comment: FooterActionsCommentPublicFragment &
    Partial<FooterActionsCommentPrivateFragment>
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
        node {
          ... on Circle {
            id
            name
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
    toast.error({
      message: <Translate id={id} />,
    })
  }
  const forbid = () => addToast('FORBIDDEN_BY_STATE')

  let onClick

  if (viewer.isArchived || viewer.isFrozen) {
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
      className={styles.footer}
      aria-label={translate({
        zh_hant: `${comment.upvotes} 點讚`,
        zh_hans: `${comment.upvotes} 点赞`,
        en: `${comment.upvotes} upvotes`,
        lang,
      })}
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
