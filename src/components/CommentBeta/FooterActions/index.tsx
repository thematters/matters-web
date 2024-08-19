import gql from 'graphql-tag'
import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { makeMentionElement } from '~/common/utils'
import {
  CommentFormBeta,
  CommentFormBetaDialog,
  CommentFormType,
  Media,
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
  isInCommentDetail?: boolean
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
  isInCommentDetail,
  ...replyButtonProps
}: FooterActionsProps) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const formWrapperRef = useRef<HTMLDivElement>(null)

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

  if (!viewer.isAuthed) {
    onClick = () => {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.collectArticle },
        })
      )
    }
  } else if (viewer.isArchived || viewer.isFrozen) {
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

  useEffect(() => {
    setTimeout(() => {
      if (showForm && formWrapperRef.current) {
        const editor = formWrapperRef.current.querySelector(
          '.tiptap.ProseMirror'
        )
        if (!editor) {
          return
        }

        // focus on end of the comment editor
        // ref: https://stackoverflow.com/a/69727327
        let sel = window.getSelection()
        sel?.selectAllChildren(editor)
        sel?.collapseToEnd()
      }
    }, 100)
  }, [showForm])

  // customize case for banned user
  const replyCustomButtonProps = viewer.isBanned ? { onClick: forbid } : {}
  const isViewerOwnComment = viewer.id === comment.author.id
  const defaultContent = !isViewerOwnComment
    ? `${makeMentionElement(
        comment.author.id,
        comment.author.userName || '',
        comment.author.displayName || ''
      )} `
    : ''

  return (
    <>
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
          {hasUpvote && <UpvoteButton {...buttonProps} />}
          {hasReply && (
            <>
              <Media at="sm">
                <CommentFormBetaDialog
                  articleId={article?.id}
                  type={'article'}
                  replyToId={comment.id}
                  parentId={comment.parentComment?.id || comment.id}
                  submitCallback={submitCallback}
                  // closeCallback={() => setShowForm(false)}
                  isInCommentDetail={isInCommentDetail}
                  defaultContent={defaultContent}
                >
                  {({ openDialog }) => (
                    <ReplyButton
                      type={type}
                      {...buttonProps}
                      {...replyButtonProps}
                      {...replyCustomButtonProps}
                      onClick={openDialog}
                    />
                  )}
                </CommentFormBetaDialog>
              </Media>
              <Media greaterThan="sm">
                <ReplyButton
                  type={type}
                  {...buttonProps}
                  {...replyButtonProps}
                  {...replyCustomButtonProps}
                  onClick={toggleShowForm}
                />
              </Media>
            </>
          )}
        </section>
      </footer>
      <section ref={formWrapperRef}>
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
              isInCommentDetail={isInCommentDetail}
              defaultContent={defaultContent}
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
