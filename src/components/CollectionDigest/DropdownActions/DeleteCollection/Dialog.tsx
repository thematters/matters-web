import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  TextIcon,
  toast,
  useDialogSwitch,
  useMutation,
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

interface DeleteCollectionDialogProps {
  collection: DeleteCollectionCollectionFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DeleteCollectionDialog = ({
  collection,
  children,
}: DeleteCollectionDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [deleteCollection] = useMutation<DeleteCollectionMutation>(
    DELETE_COLLECTION,
    {
      variables: { id: collection.id },
      update: (cache) => {
        updateUserCollections({
          cache,
          collectionId: collection.id,
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
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title="archive" />

        <Dialog.Message>
          <p>
            <FormattedMessage
              defaultMessage="Are you sure you want to delete this collection ‘{collection}’?"
              description="src/components/CollectionDigest/DropdownActions/DeleteCollection/Dialog.tsx"
              values={{
                collection: (
                  <TextIcon color="green">{collection.title}</TextIcon>
                ),
              }}
            />
            <br />
            <FormattedMessage
              defaultMessage="(Articles in this collection will not be deleted)"
              description="src/components/CollectionDigest/DropdownActions/DeleteCollection/Dialog.tsx"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Delete" description="" />}
              color="red"
              onClick={() => {
                onDelete()
                closeDialog()
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Delete" description="" />}
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

const LazyDeleteCollectionDialog = (props: DeleteCollectionDialogProps) => (
  <Dialog.Lazy mounted={<DeleteCollectionDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyDeleteCollectionDialog
