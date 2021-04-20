import { gql } from '@apollo/client'

import {
  CommentFormType,
  Dialog,
  Translate,
  useDialogSwitch,
  useMutation,
} from '~/components'

import { ADD_TOAST, COMMENT_TYPE_TEXT } from '~/common/enums'

import { DropdownActionsCommentPublic } from '../__generated__/DropdownActionsCommentPublic'
import { DeleteComment } from './__generated__/DeleteComment'

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      state
    }
  }
`

interface DeleteCommentDialogProps {
  comment: DropdownActionsCommentPublic
  type: CommentFormType
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DeleteCommentDialog = ({
  comment,
  type,
  children,
}: DeleteCommentDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)
  const commentId = comment.id

  const [deleteComment] = useMutation<DeleteComment>(DELETE_COMMENT, {
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
            <Translate
              zh_hant={`${COMMENT_TYPE_TEXT.zh_hant[type]}已刪除`}
              zh_hans={`${COMMENT_TYPE_TEXT.zh_hans[type]}已删除`}
            />
          ),

          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} size="sm">
        <Dialog.Header
          title={
            <Translate
              zh_hant={`刪除${COMMENT_TYPE_TEXT.zh_hant[type]}`}
              zh_hans={`删除${COMMENT_TYPE_TEXT.zh_hans[type]}`}
            />
          }
          close={close}
          mode="inner"
        />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant={`確認刪除${COMMENT_TYPE_TEXT.zh_hant[type]}，${COMMENT_TYPE_TEXT.zh_hant[type]}會馬上消失。`}
              zh_hans={`确认删除${COMMENT_TYPE_TEXT.zh_hans[type]}，${COMMENT_TYPE_TEXT.zh_hans[type]}会马上消失。`}
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onDelete()
              close()
            }}
          >
            <Translate id="confirm" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="cancel" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyDeleteCommentDialog = (props: DeleteCommentDialogProps) => (
  <Dialog.Lazy mounted={<DeleteCommentDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default LazyDeleteCommentDialog
