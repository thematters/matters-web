import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { translate } from '~/common/utils'
import {
  Dialog,
  IconTrash24,
  LanguageContext,
  toast,
  Translate,
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

  const { lang } = useContext(LanguageContext)

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
        <Translate
          zh_hant="草稿已刪除"
          zh_hans="草稿已删除"
          en="draft has been deleted"
        />
      ),
    })
  }

  return (
    <>
      <button
        onClick={openDialog}
        className={styles.deleteButton}
        type="button"
        aria-label={translate({ id: 'delete', lang })}
      >
        <IconTrash24 size="md" />
      </button>

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title="deleteDraft" />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="確認刪除草稿，草稿會馬上消失。"
              zh_hans="确认删除草稿，草稿会马上消失。"
              en="Are you sure you want to delete draft?."
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
