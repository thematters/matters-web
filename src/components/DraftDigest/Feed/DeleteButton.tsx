import gql from 'graphql-tag'
import { useContext } from 'react'

import { ADD_TOAST } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Dialog,
  IconTrash24,
  LanguageContext,
  Translate,
  useDialogSwitch,
  useMutation,
} from '~/components'
import { DeleteButtonDraftFragment, DeleteDraftMutation } from '~/gql/graphql'

import { DraftsContext } from '../../../views/Me/Drafts/context'
import styles from './styles.css'

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
  const [edges, setEdges] = useContext(DraftsContext)

  const { lang } = useContext(LanguageContext)

  const [deleteDraft] = useMutation<DeleteDraftMutation>(DELETE_DRAFT, {
    variables: { id: draft.id },
    update: () => {
      const filteredEdges = (edges ?? []).filter(
        ({ node }) => node.id !== draft.id
      )
      setEdges(filteredEdges)
    },
  })

  const onDelete = async () => {
    await deleteDraft()

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="草稿已刪除"
              zh_hans="草稿已删除"
              en="draft has been deleted"
            />
          ),
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <>
      <button
        onClick={openDialog}
        className="delete-button"
        type="button"
        aria-label={translate({ id: 'delete', lang })}
      >
        <IconTrash24 size="md" color="grey" />
        <style jsx>{styles}</style>
      </button>

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header
          title="deleteDraft"
          closeDialog={closeDialog}
          mode="inner"
        />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="確認刪除草稿，草稿會馬上消失。"
              zh_hans="确认删除草稿，草稿会马上消失。"
              en="Are you sure you want to delete draft?."
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onDelete()
              closeDialog()
            }}
          >
            <Translate id="confirm" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
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

DeleteButton.fragments = fragments

export default DeleteButton
