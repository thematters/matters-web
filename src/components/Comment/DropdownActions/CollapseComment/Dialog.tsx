import gql from 'graphql-tag'
import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'

import { CollapseComment } from './__generated__/CollapseComment'

const COLLAPSE_COMMENT = gql`
  mutation CollapseComment($id: ID!, $state: CommentState!) {
    updateCommentsState(input: { ids: [$id], state: $state }) {
      id
      state
    }
  }
`

interface CollapseCommentDialogProps {
  commentId: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const CollapseCommentDialog = ({
  commentId,
  children
}: CollapseCommentDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const [collapseComment] = useMutation<CollapseComment>(COLLAPSE_COMMENT, {
    variables: { id: commentId, state: 'collapsed' },
    optimisticResponse: {
      updateCommentsState: [
        {
          id: commentId,
          state: 'collapsed' as any,
          __typename: 'Comment'
        }
      ]
    }
  })

  const onCollapse = async () => {
    await collapseComment()

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate id="successCollapseComment" />
        }
      })
    )
  }

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} size="sm">
        <Dialog.Header
          title={<Translate id="collapseComment" />}
          close={close}
          headerHidden
        />

        <Dialog.Message
          headline="collapseComment"
          description={
            <>
              <Translate
                zh_hant="闔上評論後，其他用戶需展開才可查看"
                zh_hans="折叠评论后，其他用户需展开才可查看"
              />
            </>
          }
        />

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="green"
            onClick={() => {
              onCollapse()
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

const LazyCollapseCommentDialog = (props: CollapseCommentDialogProps) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? (
        <CollapseCommentDialog {...props} />
      ) : (
        <>{props.children({ open })}</>
      )
    }
  </Dialog.Lazy>
)

export default LazyCollapseCommentDialog
