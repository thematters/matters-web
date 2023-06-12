import gql from 'graphql-tag'

import { ADD_TOAST, COMMENT_TYPE_TEXT } from '~/common/enums'
import {
  CommentFormType,
  Dialog,
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

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant={`已成功闔上${COMMENT_TYPE_TEXT.zh_hant[type]}`}
              zh_hans={`已成功折叠${COMMENT_TYPE_TEXT.zh_hans[type]}`}
            />
          ),
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
            <Translate
              zh_hant={`闔上${COMMENT_TYPE_TEXT.zh_hant[type]}`}
              zh_hans={`折叠${COMMENT_TYPE_TEXT.zh_hans[type]}`}
            />
          }
          closeDialog={closeDialog}
          mode="inner"
        />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant={`闔上${COMMENT_TYPE_TEXT.zh_hant[type]}後，其他用戶需展開才可查看`}
              zh_hans={`折叠${COMMENT_TYPE_TEXT.zh_hans[type]}后，其他用户需展开才可查看`}
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            onClick={() => {
              onCollapse()
              closeDialog()
            }}
          >
            <Translate id="confirm" />
          </Dialog.Footer.Button>
          <Dialog.Footer.Button
            bgColor="greyLighter"
            textColor="black"
            onClick={closeDialog}
          >
            <Translate id="cancel" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
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
