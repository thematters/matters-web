import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
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
  DeleteCommentMutation,
} from '~/gql/graphql'
import { USER_WRITINGS_PUBLIC } from '~/views/User/Writings/gql'

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      state
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
  const commentId = comment.id
  const node =
    comment.node.__typename === 'Article' ||
    comment.node.__typename === 'Moment'
      ? comment.node
      : undefined
  const isArticle = comment.node.__typename === 'Article'
  const isMoment = comment.node.__typename === 'Moment'

  const [deleteComment] = useMutation<DeleteCommentMutation>(DELETE_COMMENT, {
    variables: { id: commentId },
    optimisticResponse: {
      deleteComment: {
        id: commentId,
        state: 'archived' as any,
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
    refetchQueries: isMoment
      ? [
          {
            query: USER_WRITINGS_PUBLIC,
            variables: { userName: node?.author.userName },
          },
        ]
      : [],
  })

  const onDelete = async () => {
    await deleteComment()

    toast.success({
      message: (
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
            <FormattedMessage defaultMessage="Delete comment" id="wOZRKW" />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <FormattedMessage
                defaultMessage="After deletion, the comment will be removed immediately"
                id="wLSBAX"
              />
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
                onDelete()
                closeDialog()
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
              color="red"
              onClick={() => {
                onDelete()
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
