import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  Dialog,
  IconDraftDelete12,
  TextIcon,
  Translate,
  useDialogSwitch,
  useMutation,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'

import { DraftContext } from '../../../views/Me/Drafts/context'

import { DeleteButtonDraft } from './__generated__/DeleteButtonDraft'
import { DeleteDraft } from './__generated__/DeleteDraft'

interface DeleteButtonProps {
  draft: DeleteButtonDraft
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
  const { edges, setEdges } = useContext(DraftContext)

  const [deleteDraft] = useMutation<DeleteDraft>(DELETE_DRAFT, {
    variables: { id: draft.id },
    update: () => {
      const filteredEdges = edges.filter(({ node }) => node.id !== draft.id)

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
      <Button
        spacing={[0, 'xtight']}
        size={[null, '1.25rem']}
        bgColor="grey-lighter"
        onClick={openDialog}
      >
        <TextIcon
          icon={<IconDraftDelete12 size="xs" />}
          size="xs"
          color="grey-dark"
          weight="md"
        >
          <Translate id="delete" />
        </TextIcon>
      </Button>

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
              en="Confirm draft deletion, and it will disappear at once."
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
