import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT, TEST_ID } from '~/common/enums'
import {
  CircleCommentFormType,
  Dialog,
  LanguageContext,
  toast,
  useDialogSwitch,
  useMutation,
} from '~/components'
import {
  CircleCommentDropdownActionsCommentPublicFragment,
  CommentState,
  DeleteCircleCommentMutation,
} from '~/gql/graphql'

const DELETE_CIRCLE_COMMENT = gql`
  mutation DeleteCircleComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      state
    }
  }
`

export interface DeleteCommentDialogProps {
  comment: CircleCommentDropdownActionsCommentPublicFragment
  type: CircleCommentFormType
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

  const [deleteComment] = useMutation<DeleteCircleCommentMutation>(
    DELETE_CIRCLE_COMMENT,
    {
      variables: { id: commentId },
      optimisticResponse: {
        deleteComment: {
          id: commentId,
          state: CommentState.Archived,
          __typename: 'Comment',
        },
      },
    }
  )

  const onDelete = async () => {
    await deleteComment()

    toast.info({
      message: (
        <FormattedMessage
          defaultMessage="{commentType} has been deleted"
          id="wAccv4"
          description="src/components/CircleComment/DropdownActions/DeleteComment/Dialog.tsx"
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
              id="XH1s8E"
              description="src/components/CircleComment/DropdownActions/DeleteComment/Dialog.tsx"
              values={{
                commentType: COMMENT_TYPE_TEXT[lang][type],
              }}
            />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <FormattedMessage
                defaultMessage="After deletion, the {commentType} will be removed immediately"
                id="NlX31w"
                description="src/components/CircleComment/DropdownActions/DeleteComment/Dialog.tsx"
                values={{
                  commentType: COMMENT_TYPE_TEXT[lang][type],
                }}
              />
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

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
