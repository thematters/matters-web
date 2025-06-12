import { Editor } from '@matters/matters-editor'
import gql from 'graphql-tag'
import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  ADD_MOMENT_COMMENT_MENTION,
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { makeMentionElement } from '~/common/utils'
import {
  ArticleCommentForm,
  ArticleCommentFormDialog,
  Media,
  Spacer,
  toast,
  useCommentEditorContext,
  ViewerContext,
} from '~/components'
import {
  CommentFooterActionsCommentPrivateFragment,
  CommentFooterActionsCommentPublicFragment,
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
  comment: CommentFooterActionsCommentPublicFragment &
    Partial<CommentFooterActionsCommentPrivateFragment>
} & FooterActionsControls

const fragments = {
  comment: {
    public: gql`
      fragment CommentFooterActionsCommentPublic on Comment {
        id
        state
        ...CommentReplyComemnt
        ...CommentUpvoteCommentPublic
      }
      ${ReplyButton.fragments.comment}
      ${UpvoteButton.fragments.comment.public}
    `,
    private: gql`
      fragment CommentFooterActionsCommentPrivate on Comment {
        id
        node {
          ... on Article {
            id
            author {
              id
              isBlocking
            }
            commentCount
          }

          ... on Moment {
            id
            author {
              id
              isBlocking
            }
            commentCount
          }
        }
        ...CommentUpvoteCommentPrivate
      }
      ${UpvoteButton.fragments.comment.private}
    `,
  },
}

const BaseFooterActions = ({
  comment,
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
  const [editor, setEditor] = useState<Editor | null>(null)
  const { setActiveEditor, activeEditor } = useCommentEditorContext()

  const { state } = comment
  const node =
    comment.node.__typename === 'Article' ||
    comment.node.__typename === 'Moment'
      ? comment.node
      : undefined
  const targetAuthor = node?.author
  const isArticle = comment.node.__typename === 'Article'
  const isMoment = comment.node.__typename === 'Moment'

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
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.comment },
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
        const sel = window.getSelection()
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

  const [isHiding, setIsHiding] = useState(false)

  const handleHideForm = () => {
    // Start hide animation
    setIsHiding(true)
  }

  const handleHideComplete = () => {
    // End hide animation
    setIsHiding(false)

    if (editor === activeEditor) {
      setActiveEditor(null)
    }
    setShowForm(false)
  }

  const handleReplyButtonClick = () => {
    if (showForm) {
      handleHideForm()
    } else {
      toggleShowForm()
    }
  }

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
              {isArticle && node?.id && (
                <>
                  <Media lessThan="md">
                    <ArticleCommentFormDialog
                      articleId={node.id}
                      replyToId={comment.id}
                      parentId={comment.parentComment?.id || comment.id}
                      submitCallback={submitCallback}
                      // closeCallback={() => setShowForm(false)}
                      isInCommentDetail={isInCommentDetail}
                      defaultContent={defaultContent}
                    >
                      {({ openDialog }) => (
                        <ReplyButton
                          {...buttonProps}
                          {...replyButtonProps}
                          {...replyCustomButtonProps}
                          onClick={openDialog}
                        />
                      )}
                    </ArticleCommentFormDialog>
                  </Media>
                  <Media greaterThanOrEqual="md">
                    <ReplyButton
                      {...buttonProps}
                      {...replyButtonProps}
                      {...replyCustomButtonProps}
                      onClick={handleReplyButtonClick}
                    />
                  </Media>
                </>
              )}
              {isMoment && (
                <>
                  <ReplyButton
                    {...buttonProps}
                    {...replyButtonProps}
                    {...replyCustomButtonProps}
                    onClick={() => {
                      const detail = {
                        author: comment.author,
                      }
                      window.dispatchEvent(
                        new CustomEvent(ADD_MOMENT_COMMENT_MENTION, {
                          detail,
                        })
                      )
                    }}
                  />
                </>
              )}
            </>
          )}
        </section>
      </footer>
      <section ref={formWrapperRef}>
        {showForm && node?.id && (
          <>
            <Spacer size="sp16" />
            <ArticleCommentForm
              articleId={node?.id}
              setEditor={setEditor}
              replyToId={comment.id}
              parentId={comment.parentComment?.id || comment.id}
              submitCallback={submitCallback}
              closeCallback={handleHideForm}
              isInCommentDetail={isInCommentDetail}
              defaultContent={defaultContent}
              playAnimation
              isHiding={isHiding}
              onHideComplete={handleHideComplete}
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
