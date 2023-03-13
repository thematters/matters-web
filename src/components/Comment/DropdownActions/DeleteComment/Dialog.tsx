import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ADD_TOAST, COMMENT_TYPE_TEXT } from '~/common/enums'
import {
  CommentFormType,
  Dialog,
  LanguageContext,
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

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <FormattedMessage defaultMessage="{commentType} has been deleted" description="src/components/Comment/DropdownActions/DeleteComment/Dialog.tsx" values={{
              commentType: COMMENT_TYPE_TEXT[lang][type]
            }}/>
          ),

          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Delete {commentType}" description="src/components/Comment/DropdownActions/DeleteComment/Dialog.tsx" values={{
              commentType: COMMENT_TYPE_TEXT[lang][type]
            }}/>
          }
          closeDialog={closeDialog}
          mode="inner"
        />

        <Dialog.Message>
          <p>
            <FormattedMessage defaultMessage="Confirm deletion of the {commentType}, The {commentType} will be removed immediately." description="src/components/Comment/DropdownActions/DeleteComment/Dialog.tsx" values={{
              commentType: COMMENT_TYPE_TEXT[lang][type]
            }}/>
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onDelete()
              closeDialog()
            }}
          >
            <FormattedMessage defaultMessage="Confirm" description=""  />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <FormattedMessage defaultMessage="Cancel" description="" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
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
