import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  useDialogSwitch,
  useMutation,
  ViewerContext,
} from '~/components'
import {
  DeleteMomentMutation,
  MomentDigestDropdownActionsMomentFragment,
} from '~/gql/graphql'

const DELETE_MOMENT = gql`
  mutation DeleteMoment($id: ID!) {
    deleteMoment(input: { id: $id }) {
      id
      momentState: state
    }
  }
`

export interface DeleteMomentDialogProps {
  moment: MomentDigestDropdownActionsMomentFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DeleteMomentDialog = ({ moment, children }: DeleteMomentDialogProps) => {
  const viewer = useContext(ViewerContext)
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const { id } = moment

  const [deleteMoment] = useMutation<DeleteMomentMutation>(DELETE_MOMENT, {
    variables: { id },
    update: (cache) => {
      // Remove the deleted moment from the user's writings
      cache.modify({
        id: cache.identify(viewer),
        fields: {
          writings(existingWritingsRefs, { readField }) {
            return {
              ...existingWritingsRefs,
              edges: existingWritingsRefs.edges.filter(
                ({ node }: { node: any }) => readField('id', node) !== id
              ),
            }
          },
        },
      })

      // Decrement the moment count in the viewer's status
      cache.modify({
        id: cache.identify(viewer),
        fields: {
          status(existing) {
            return {
              ...existing,
              momentCount: existing.momentCount - 1,
            }
          },
        },
      })
    },
  })

  const onDelete = async () => {
    await deleteMoment()
    closeDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Delete moment" id="+ixiPI" />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <FormattedMessage
                defaultMessage="Are you sure you want to delete this moment?"
                id="0bTlm4"
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

const LazyDeleteMomentDialog = (props: DeleteMomentDialogProps) => (
  <Dialog.Lazy mounted={<DeleteMomentDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyDeleteMomentDialog
