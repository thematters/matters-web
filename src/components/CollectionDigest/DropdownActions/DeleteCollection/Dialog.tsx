import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import {
  Dialog,
  toast,
  useDialogSwitch,
  useMutation,
  useRoute,
} from '~/components'
import updateUserCollections from '~/components/GQL/updates/userCollections'
import {
  DeleteCollectionCollectionFragment,
  DeleteCollectionMutation,
} from '~/gql/graphql'

const DELETE_COLLECTION = gql`
  mutation DeleteCollection($id: ID!) {
    deleteCollections(input: { ids: [$id] })
  }
`

type Step = 'delete' | 'confirmDelete'

interface DeleteCollectionDialogProps {
  collection: DeleteCollectionCollectionFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DeleteCollectionDialog = ({
  collection,
  children,
}: DeleteCollectionDialogProps) => {
  const { show, openDialog, closeDialog: cd } = useDialogSwitch(true)
  const { isInPath, router } = useRoute()
  const isInUserCollectionDetail = isInPath('USER_COLLECTION_DETAIL')
  const [step, setStep] = useState<Step>('delete')
  const isInDelete = step === 'delete'
  const isInConfirmDelete = step === 'confirmDelete'
  const closeDialog = () => {
    cd()
    setTimeout(() => {
      setStep('delete')
    }, 1000)
  }

  const [deleteCollection, { loading }] = useMutation<DeleteCollectionMutation>(
    DELETE_COLLECTION,
    {
      variables: { id: collection.id },
      update: (cache) => {
        updateUserCollections({
          cache,
          collectionIds: [collection.id],
          userName: collection.author.userName,
          type: 'delete',
        })
      },
    }
  )

  const onDelete = async () => {
    await deleteCollection()

    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="Collection is deleted"
          description="src/components/CollectionDigest/DropdownActions/DeleteCollection/Dialog.tsx"
        />
      ),
    })

    if (isInUserCollectionDetail) {
      const path = toPath({
        page: 'userCollections',
        userName: collection.author.userName || '',
      })
      router.push(path.href)
    }
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Delete collection" />}
        />

        <Dialog.Message>
          {isInDelete && (
            <p>
              <FormattedMessage
                defaultMessage="Are you sure you want to delete this collection ‘{collection}’?"
                values={{
                  collection: (
                    <span className="u-highlight">{collection.title}</span>
                  ),
                }}
              />
              <br />
              <FormattedMessage defaultMessage="(Articles in this collection will not be deleted)" />
            </p>
          )}
          {isInConfirmDelete && (
            <p>
              <FormattedMessage defaultMessage="This action cannot be undone. Are you sure you want to delete this collection?" />
            </p>
          )}
        </Dialog.Message>

        {isInDelete && (
          <Dialog.Footer
            closeDialog={closeDialog}
            btns={
              <Dialog.RoundedButton
                text={<FormattedMessage defaultMessage="Delete" />}
                color="red"
                onClick={() => {
                  setStep('confirmDelete')
                }}
                loading={loading}
              />
            }
            smUpBtns={
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Delete" />}
                color="red"
                onClick={() => {
                  setStep('confirmDelete')
                }}
                loading={loading}
              />
            }
          />
        )}

        {isInConfirmDelete && (
          <Dialog.Footer
            closeDialog={closeDialog}
            btns={
              <Dialog.RoundedButton
                text={<FormattedMessage defaultMessage="Confirm Deletion" />}
                color="red"
                onClick={() => {
                  onDelete()
                  closeDialog()
                }}
              />
            }
            smUpBtns={
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Confirm Deletion" />}
                color="red"
                onClick={() => {
                  onDelete()
                  closeDialog()
                }}
              />
            }
          />
        )}
      </Dialog>
    </>
  )
}

const LazyDeleteCollectionDialog = (props: DeleteCollectionDialogProps) => (
  <Dialog.Lazy mounted={<DeleteCollectionDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyDeleteCollectionDialog
