import gql from 'graphql-tag'
import { FormattedMessage, useIntl } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import {
  Dialog,
  IconTrash24,
  toast,
  useDialogSwitch,
  useMutation,
} from '~/components'
import { updateUserDrafts } from '~/components/GQL'
import { DeleteButtonDraftFragment, DeleteDraftMutation } from '~/gql/graphql'

import styles from './styles.module.css'

interface DeleteButtonProps {
  draft: DeleteButtonDraftFragment
}

const DELETE_DRAFT = gql`
  mutation DeleteDraft($id: ID!) {
    deleteDraft(input: { id: $id })
  }
`
const fragments = {
  draft: gql`
    fragment DeleteButtonDraft on Draft {
      id
    }
  `,
}

const DeleteButton = ({ draft }: DeleteButtonProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false)
  const intl = useIntl()

  const [deleteDraft] = useMutation<DeleteDraftMutation>(DELETE_DRAFT, {
    variables: { id: draft.id },
    update: (cache) => {
      updateUserDrafts({
        cache,
        targetId: draft.id,
        type: 'remove',
      })
    },
  })

  const onDelete = async () => {
    await deleteDraft()

    toast.success({
      message: (
        <FormattedMessage defaultMessage="Draft has been deleted" id="yAflVX" />
      ),
    })
  }

  return (
    <>
      <button
        onClick={openDialog}
        className={styles.deleteButton}
        type="button"
        aria-label={intl.formatMessage({
          defaultMessage: 'Delete',
          id: 'K3r6DQ',
        })}
      >
        <IconTrash24 size="md" />
      </button>

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_DELETE_DRAFT}
      >
        <Dialog.Header title="deleteDraft" />

        <Dialog.Message>
          <p>
            <FormattedMessage
              defaultMessage="Are you sure you want to delete draft?"
              id="VbxMwX"
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

DeleteButton.fragments = fragments

export default DeleteButton
