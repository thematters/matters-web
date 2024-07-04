import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch, useMutation } from '~/components'
import { DeleteMomentMutation } from '~/gql/graphql'

const DELETE_MOMENT = gql`
  mutation DeleteMoment($id: ID!) {
    deleteMoment(input: { id: $id })
  }
`

export interface DeleteMomentDialogProps {
  momentId: string
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DeleteMomentDialog = ({
  momentId,
  children,
}: DeleteMomentDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [deleteMoment] = useMutation<DeleteMomentMutation>(DELETE_MOMENT, {
    variables: { id: momentId },
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
