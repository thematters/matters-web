import gql from 'graphql-tag'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import { makeMentionElement, translate } from '~/common/utils'
import {
  CommentFormBeta,
  CommentFormType,
  LanguageContext,
  Spacer,
  toast,
  ViewerContext,
} from '~/components'
import {
  FooterActionsCommentBetaPrivateFragment,
  FooterActionsCommentBetaPublicFragment,
} from '~/gql/graphql'

import ReplyButton, { ReplyButtonProps } from './ReplyButton'
import styles from './styles.module.css'
import UpvoteButton from './UpvoteButton'

export type FooterActionsControls = {
  hasReply?: boolean
  hasUpvote?: boolean
  inCard?: boolean
  disabled?: boolean
} & Pick<ReplyButtonProps, 'replySubmitCallback'>

export type FooterActionsProps = {
  comment: FooterActionsCommentBetaPublicFragment &
    Partial<FooterActionsCommentBetaPrivateFragment>
  type: CommentFormType
} & FooterActionsControls

const fragments = {
  comment: {
    public: gql`
      fragment FooterActionsCommentBetaPublic on Comment {
        id
        state
        ...ReplyComemnt
        ...UpvoteCommentBetaPublic
      }
      ${ReplyButton.fragments.comment}
      ${UpvoteButton.fragments.comment.public}
    `,
    private: gql`
      fragment FooterActionsCommentBetaPrivate on Comment {
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
        ...UpvoteCommentBetaPrivate
      }
      ${UpvoteButton.fragments.comment.private}
    `,
  },
}

const BaseFooterActions = ({
  comment,
  type,
  hasReply,
  hasUpvote = true,
  inCard = false,
  disabled,
  replySubmitCallback,

  ...replyButtonProps
}: FooterActionsProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const [showForm, setShowForm] = useState(false)
  const toggleShowForm = () => setShowForm(!showForm)

  const { state, node } = comment
  const article = node.__typename === 'Article' ? node : undefined
  const circle = node.__typename === 'Circle' ? node : undefined
  const targetAuthor = article?.author || circle?.owner

  const isActive = state === 'active'
  const isCollapsed = state === 'collapsed'
  const isDisabled = disabled || (!isActive && !isCollapsed)
  const forbid = () =>
    toast.error({
      message: (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })

  const submitCallback = () => {
    if (replySubmitCallback) {
      replySubmitCallback()
    }
  }

  let onClick

  if (viewer.isArchived || viewer.isFrozen) {
    onClick = forbid
  } else if (targetAuthor?.isBlocking) {
    onClick = () =>
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="The author has disabled comments for this article"
            id="7cwoRo"
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
    <>
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
          {hasUpvote && <UpvoteButton {...buttonProps} />}
          {hasReply && (
            <ReplyButton
              type={type}
              {...buttonProps}
              {...replyButtonProps}
              {...replyCustomButtonProps}
              onClick={toggleShowForm}
            />
          )}
        </section>
      </footer>
      <section>
        {showForm && (
          <>
            <Spacer size="base" />
            <CommentFormBeta
              articleId={article?.id}
              type={'article'}
              replyToId={comment.id}
              parentId={comment.parentComment?.id || comment.id}
              submitCallback={submitCallback}
              closeCallback={() => setShowForm(false)}
              defaultContent={`${makeMentionElement(
                comment.author.id,
                comment.author.userName || '',
                comment.author.displayName || ''
              )} `}
            />
          </>
        )}
      </section>
    </>
  )
}

const FooterActions = (props: FooterActionsProps) => (
  <BaseFooterActions {...props} />
)

FooterActions.fragments = fragments

export default FooterActions
