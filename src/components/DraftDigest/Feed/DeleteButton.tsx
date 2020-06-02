import gql from 'graphql-tag'
import { useState } from 'react'

import {
  Button,
  Dialog,
  IconDeleteDraftXS,
  TextIcon,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'

import { DeleteButtonDraft } from './__generated__/DeleteButtonDraft'
import { DeleteDraft } from './__generated__/DeleteDraft'
import { ViewerDrafts } from './__generated__/ViewerDrafts'

interface DeleteButtonProps {
  draft: DeleteButtonDraft
}

const DELETE_DRAFT = gql`
  mutation DeleteDraft($id: ID!) {
    deleteDraft(input: { id: $id })
  }
`

const ME_DRADTS = gql`
  query ViewerDrafts {
    viewer {
      id
      drafts(input: { first: null }) @connection(key: "viewerDrafts") {
        edges {
          cursor
          node {
            id
            title
            slug
            updatedAt
          }
        }
      }
    }
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
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const [deleteDraft] = useMutation<DeleteDraft>(DELETE_DRAFT, {
    variables: { id: draft.id },
    update: (cache) => {
      try {
        const data = cache.readQuery<ViewerDrafts>({ query: ME_DRADTS })

        if (!data?.viewer?.drafts.edges) {
          return
        }

        const edges = data.viewer.drafts.edges.filter(
          ({ node }) => node.id !== draft.id
        )

        cache.writeQuery({
          query: ME_DRADTS,
          data: {
            viewer: {
              ...data.viewer,
              drafts: {
                ...data.viewer.drafts,
                edges,
              },
            },
          },
        })
      } catch (e) {
        console.error(e)
      }
    },
  })

  const onDelete = async () => {
    await deleteDraft()

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate zh_hant="草稿已刪除" zh_hans="草稿已删除" />,
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
        onClick={open}
      >
        <TextIcon
          icon={<IconDeleteDraftXS size="xs" />}
          size="xs"
          color="grey-dark"
          weight="md"
        >
          <Translate id="delete" />
        </TextIcon>
      </Button>

      <Dialog isOpen={showDialog} onDismiss={close} size="sm">
        <Dialog.Header title="deleteDraft" close={close} mode="inner" />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="確認刪除草稿，草稿會馬上消失。"
              zh_hans="确认删除草稿，草稿会马上消失。"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onDelete()
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

DeleteButton.fragments = fragments

export default DeleteButton
