import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import {
  Dialog,
  toast,
  useDialogSwitch,
  useMutation,
  ViewerContext,
} from '~/components'
import { DeleteButtonDraftFragment, DeleteDraftMutation } from '~/gql/graphql'

const DELETE_DRAFT = gql`
  mutation DeleteDraft($id: ID!) {
    deleteDraft(input: { id: $id })
  }
`

export interface DeleteDraftDialogProps {
  draft: DeleteButtonDraftFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DeleteDraftDialog = ({ draft, children }: DeleteDraftDialogProps) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(false)
  const viewer = useContext(ViewerContext)

  const [deleteDraft] = useMutation<DeleteDraftMutation>(DELETE_DRAFT, {
    variables: { id: draft.id },
    update: (cache) => {
      // Remove the draft from the viewer's drafts and decrease the total count
      cache.modify({
        id: cache.identify(viewer),
        fields: {
          drafts(existingDrafts, { readField }) {
            const filteredEdges = existingDrafts.edges.filter(
              ({ node }: { node: DeleteButtonDraftFragment }) =>
                readField('id', node) !== draft.id
            )
            return {
              ...existingDrafts,
              edges: filteredEdges,
              totalCount: Math.max(0, existingDrafts.totalCount - 1),
            }
          },
        },
      })
    },
  })

  const openDialog = () => {
    baseOpenDialog()
  }

  const onDelete = async () => {
    await deleteDraft()

    toast.info({
      message: (
        <FormattedMessage defaultMessage="Draft has been deleted" id="yAflVX" />
      ),
    })

    closeDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_DELETE_DRAFT}
      >
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Delete Draft" id="4RpVDe" />}
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              {!!draft.title && (
                <FormattedMessage
                  defaultMessage="Are you sure you want to delete draft '{title}'?"
                  id="Nl6BeH"
                  values={{
                    title: <span className="u-highlight">{draft.title}</span>,
                  }}
                />
              )}
              {!draft.title && (
                <FormattedMessage
                  defaultMessage="Are you sure you want to delete draft?"
                  id="VbxMwX"
                />
              )}
              <br />
              <FormattedMessage
                defaultMessage="(This action cannot be undone)"
                id="JYvLqB"
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
              onClick={onDelete}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
              color="red"
              onClick={onDelete}
            />
          }
        />
      </Dialog>
    </>
  )
}

export default DeleteDraftDialog
