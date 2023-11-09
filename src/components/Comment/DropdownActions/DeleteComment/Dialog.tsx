import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT, TEST_ID } from '~/common/enums'
import {
  CommentFormType,
  Dialog,
  LanguageContext,
  toast,
  useDialogSwitch,
  useMutation,
} from '~/components'
import {
  DeleteCommentMutation,
  DropdownActionsCommentPublicFragment,
} from '~/gql/graphql'

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      state
    }
  }
`

interface DeleteCommentDialogProps {
  comment: DropdownActionsCommentPublicFragment
  type: CommentFormType
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DeleteCommentDialog = ({
  comment,
  type,
  children,
}: DeleteCommentDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const commentId = comment.id

  const { lang } = useContext(LanguageContext)

  const [deleteComment] = useMutation<DeleteCommentMutation>(DELETE_COMMENT, {
    variables: { id: commentId },
    optimisticResponse: {
      deleteComment: {
        id: commentId,
        state: 'archived' as any,
        __typename: 'Comment',
      },
    },
  })

  const onDelete = async () => {
    await deleteComment()

    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="{commentType} has been deleted"
          id="h9CG9E"
          description="src/components/Comment/DropdownActions/DeleteComment/Dialog.tsx"
          values={{
            commentType: COMMENT_TYPE_TEXT[lang][type],
          }}
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
            <FormattedMessage
              defaultMessage="Delete {commentType}"
              id="Cdkhl8"
              description="src/components/Comment/DropdownActions/DeleteComment/Dialog.tsx"
              values={{
                commentType: COMMENT_TYPE_TEXT[lang][type],
              }}
            />
          }
        />

        <Dialog.Message>
          <p>
            <FormattedMessage
              defaultMessage="After deletion, the {commentType} will be removed immediately"
              id="77tYPg"
              description="src/components/Comment/DropdownActions/DeleteComment/Dialog.tsx"
              values={{
                commentType: COMMENT_TYPE_TEXT[lang][type],
              }}
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
              color="red"
              onClick={() => {
                onDelete()
                closeDialog()
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
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
