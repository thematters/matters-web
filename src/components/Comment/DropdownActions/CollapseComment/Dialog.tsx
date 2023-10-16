import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT } from '~/common/enums'
import {
  CommentFormType,
  Dialog,
  toast,
  Translate,
  useDialogSwitch,
  useMutation,
} from '~/components'
import {
  CollapseCommentMutation,
  DropdownActionsCommentPublicFragment,
} from '~/gql/graphql'

const COLLAPSE_COMMENT = gql`
  mutation CollapseComment($id: ID!, $state: CommentState!) {
    updateCommentsState(input: { ids: [$id], state: $state }) {
      id
      state
    }
  }
`

interface CollapseCommentDialogProps {
  comment: DropdownActionsCommentPublicFragment
  type: CommentFormType
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const CollapseCommentDialog = ({
  comment,
  type,
  children,
}: CollapseCommentDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const commentId = comment.id

  const [collapseComment] = useMutation<CollapseCommentMutation>(
    COLLAPSE_COMMENT,
    {
      variables: { id: commentId, state: 'collapsed' },
      optimisticResponse: {
        updateCommentsState: [
          {
            id: commentId,
            state: 'collapsed' as any,
            __typename: 'Comment',
          },
        ],
      },
    }
  )

  const onCollapse = async () => {
    await collapseComment()

    toast.success({
      message: (
        <Translate
          zh_hant={`已成功闔上${COMMENT_TYPE_TEXT.zh_hant[type]}`}
          zh_hans={`已成功折叠${COMMENT_TYPE_TEXT.zh_hans[type]}`}
        />
      ),
    })
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate
              zh_hant={`闔上${COMMENT_TYPE_TEXT.zh_hant[type]}`}
              zh_hans={`折叠${COMMENT_TYPE_TEXT.zh_hans[type]}`}
            />
          }
        />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant={`闔上${COMMENT_TYPE_TEXT.zh_hant[type]}後，其他用戶需展開才可查看`}
              zh_hans={`折叠${COMMENT_TYPE_TEXT.zh_hans[type]}后，其他用户需展开才可查看`}
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
                onCollapse()
                closeDialog()
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
              color="red"
              onClick={() => {
                onCollapse()
                closeDialog()
              }}
            />
          }
        />
      </Dialog>
    </>
  )
}

const LazyCollapseCommentDialog = (props: CollapseCommentDialogProps) => (
  <Dialog.Lazy mounted={<CollapseCommentDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyCollapseCommentDialog
