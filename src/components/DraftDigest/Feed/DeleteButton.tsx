import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconDelete from '@/public/static/icons/24px/delete.svg'
import { TEST_ID } from '~/common/enums'
import {
  Dialog,
  Icon,
  toast,
  useDialogSwitch,
  useMutation,
  ViewerContext,
} from '~/components'
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
      title
    }
  `,
}

const DeleteButton = ({ draft }: DeleteButtonProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false)
  const intl = useIntl()
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
              ({ node }: { node: any }) => readField('id', node) !== draft.id
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
        <Icon icon={IconDelete} size={24} />
      </button>

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
                  defaultMessage="Are you sure you want to delete draft ‘{title}’?"
                  id="hpIFGj"
                  description="src/components/DraftDigest/Feed/DeleteButton.tsx"
                  values={{
                    title: <span className="u-highlight">{draft.title}</span>,
                  }}
                />
              )}
              {!draft.title && (
                <FormattedMessage
                  defaultMessage="Are you sure you want to delete draft?"
                  id="7WXDhH"
                  description="src/components/DraftDigest/Feed/DeleteButton.tsx"
                />
              )}
              <br />
              <FormattedMessage
                defaultMessage="(This action cannot be undone)"
                id="F3zk7E"
                description="src/components/DraftDigest/Feed/DeleteButton.tsx"
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

DeleteButton.fragments = fragments

export default DeleteButton
