import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT, TEST_ID } from '~/common/enums'
import {
  CircleCommentFormType,
  Dialog,
  toast,
  Translate,
  useDialogSwitch,
  useMutation,
} from '~/components'
import {
  CircleCommentDropdownActionsCommentPublicFragment,
  CollapseCommentMutation,
  CommentState,
} from '~/gql/graphql'

const COLLAPSE_COMMENT = gql`
  mutation CollapseComment($id: ID!, $state: CommentState!) {
    updateCommentsState(input: { ids: [$id], state: $state }) {
      id
      state
    }
  }
`

export interface CollapseCommentDialogProps {
  comment: CircleCommentDropdownActionsCommentPublicFragment
  type: CircleCommentFormType
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
            state: CommentState.Collapsed,
            __typename: 'Comment',
          },
        ],
      },
    }
  )

  const onCollapse = async () => {
    await collapseComment()

    toast.info({
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

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_COMMENT_COLLAPSE}
      >
        <Dialog.Header
          title={
            <Translate
              zh_hant={`闔上${COMMENT_TYPE_TEXT.zh_hant[type]}`}
              zh_hans={`折叠${COMMENT_TYPE_TEXT.zh_hans[type]}`}
            />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <Translate
                zh_hant={`闔上${COMMENT_TYPE_TEXT.zh_hant[type]}後，其他用戶需展開才可查看`}
                zh_hans={`折叠${COMMENT_TYPE_TEXT.zh_hans[type]}后，其他用户需展开才可查看`}
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
