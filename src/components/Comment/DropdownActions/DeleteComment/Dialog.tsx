import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { COMMENT_FEED_ID_PREFIX, TEST_ID } from '~/common/enums'
import {
  Dialog,
  toast,
  useDialogSwitch,
  useMutation,
  useRoute,
} from '~/components'
import { updateArticleComments, updateArticlePublic } from '~/components/GQL'
import {
  CommentDropdownActionsCommentPublicFragment,
  CommentState,
  DeleteCommentMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      state
      node {
        id
        ... on Moment {
          id
          commentCount
        }
      }
    }
  }
`

export interface DeleteCommentDialogProps {
  comment: CommentDropdownActionsCommentPublicFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DeleteCommentDialog = ({
  comment,
  children,
}: DeleteCommentDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const { routerLang } = useRoute()
  const { id, parentComment } = comment
  const node =
    comment.node.__typename === 'Article' ||
    comment.node.__typename === 'Moment'
      ? comment.node
      : undefined
  const isArticle = comment.node.__typename === 'Article'
  const isMoment = comment.node.__typename === 'Moment'
  const isDescendantComment = parentComment !== null

  const nodeId = parentComment ? `${parentComment.id}-${id}` : id

  const [deleteComment] = useMutation<DeleteCommentMutation>(DELETE_COMMENT, {
    variables: { id: id },
    optimisticResponse: {
      deleteComment: {
        id: id,
        state: CommentState.Archived,
        node:
          isMoment && node?.__typename === 'Moment'
            ? {
                id: node?.id,
                commentCount: node.commentCount - 1,
                __typename: 'Moment',
              }
            : {
                id: node?.id || '',
                __typename: 'Article',
              },
        __typename: 'Comment',
      },
    },
    update: (cache) => {
      if (!node) {
        return
      }

      if (isArticle) {
        updateArticleComments({
          cache,
          commentId: comment.id,
          articleId: node.id,
          type: 'delete',
        })

        if (comment.parentComment) {
          updateArticleComments({
            cache,
            commentId: comment.id,
            articleId: node.id,
            type: 'deleteSecondaryComment',
          })
          updateArticlePublic({
            cache,
            shortHash: node.shortHash,
            routerLang,
            type: 'deleteSecondaryComment',
          })
        } else {
          updateArticlePublic({
            cache,
            shortHash: node.shortHash,
            routerLang,
            type: 'deleteComment',
          })
        }
      }
    },
  })

  const playAnimationAndDelete = async () => {
    // play animation
    const commentElements = document.querySelectorAll(
      `#${COMMENT_FEED_ID_PREFIX}${nodeId}`
    )

    if (commentElements.length > 0) {
      commentElements.forEach((commentElement) => {
        commentElement.parentElement?.addEventListener('animationend', () => {
          commentElement.parentElement?.classList.add(styles.hideComment)
          deleteComment()
        })
      })
    }
    if (commentElements.length > 0 && !isDescendantComment) {
      commentElements.forEach((commentElement) => {
        commentElement.parentElement?.classList.add(styles.deletedComment)
      })
    } else if (commentElements.length > 0 && isDescendantComment) {
      commentElements.forEach((commentElement) => {
        commentElement.parentElement?.classList.add(
          styles.deletedDescendantComment
        )
      })
    }

    toast.success({
      message: isMoment ? (
        <FormattedMessage
          defaultMessage="Comment has been deleted"
          description="Moment"
          id="u9LYjQ"
        />
      ) : (
        <FormattedMessage
          defaultMessage="Comment has been deleted"
          id="HbEL82"
        />
      ),
    })
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_COMMENT_DELETE}
      >
        <Dialog.Header
          title={
            isMoment ? (
              <FormattedMessage
                defaultMessage="Delete comment"
                description="Moment"
                id="q192Fl"
              />
            ) : (
              <FormattedMessage defaultMessage="Delete comment" id="wOZRKW" />
            )
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              {isMoment ? (
                <FormattedMessage
                  defaultMessage="After deletion, the comment will be removed immediately"
                  description="Moment"
                  id="VdxjkY"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="After deletion, the comment will be removed immediately"
                  id="wLSBAX"
                />
              )}
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
              color="red"
              onClick={() => {
                // if comment has children, don't play animation
                if (comment.dropdownComments.totalCount <= 0) {
                  playAnimationAndDelete()
                } else {
                  deleteComment()
                }
                closeDialog()
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
              color="red"
              onClick={() => {
                if (comment.dropdownComments.totalCount <= 0) {
                  playAnimationAndDelete()
                } else {
                  deleteComment()
                }
                closeDialog()
              }}
            />
          }
        />
      </Dialog>
    </>
  )
}

const LazyDeleteCommentDialog = (props: DeleteCommentDialogProps) => (
  <Dialog.Lazy mounted={<DeleteCommentDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyDeleteCommentDialog
