import gql from 'graphql-tag'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import {
  Dialog,
  toast,
  useDialogSwitch,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import { updateUserArticles, updateUserCollections } from '~/components/GQL'
import {
  DeleteCollectionCollectionFragment,
  DeleteCollectionMutation,
  ViewerTabsCountQuery,
} from '~/gql/graphql'

const DELETE_COLLECTION = gql`
  mutation DeleteCollection($id: ID!) {
    deleteCollections(input: { ids: [$id] })
  }
`

const VIEWER_TABS_COUNT = gql`
  query ViewerTabsCount {
    viewer {
      id
      status {
        articleCount
      }
      collections(input: { first: 0 }) {
        totalCount
      }
    }
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
  const viewer = useContext(ViewerContext)
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
  const { USER_PROFILE_PUBLIC } = require('~/views/User/UserProfile/gql')
  const [deleteCollection, { loading, client }] =
    useMutation<DeleteCollectionMutation>(DELETE_COLLECTION, {
      variables: { id: collection.id },
      update: (cache) => {
        updateUserArticles({
          cache,
          targetId: collection.id,
          userName: collection.author.userName!,
          type: 'unpin',
        })
        updateUserCollections({
          cache,
          collectionIds: [collection.id],
          userName: collection.author.userName!,
          type: 'delete',
        })

        // FIXME: Why not update user profile tab collection count?
        // const result = updateUserProfile({
        //   cache,
        //   userName: collection.author.userName!,
        //   type: 'decreaseCollection',
        // })
        onEmptyCollection()
      },
      refetchQueries: [
        {
          query: USER_PROFILE_PUBLIC,
          variables: { userName: collection.author.userName },
        },
      ],
    })

  const onEmptyCollection = async () => {
    const result = await client?.query<ViewerTabsCountQuery>({
      query: VIEWER_TABS_COUNT,
      fetchPolicy: 'network-only',
    })

    if (
      result?.data.viewer?.status?.articleCount === 0 &&
      result.data.viewer?.collections.totalCount === 0
    )
      router.push(
        toPath({ page: 'userProfile', userName: viewer.userName || '' }).href
      )
  }

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
              />
            }
            smUpBtns={
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Delete" />}
                color="red"
                onClick={() => {
                  setStep('confirmDelete')
                }}
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
                color={loading ? 'green' : 'red'}
                onClick={async () => {
                  await onDelete()
                  closeDialog()
                }}
                loading={loading}
              />
            }
            smUpBtns={
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Confirm Deletion" />}
                color={loading ? 'green' : 'red'}
                onClick={async () => {
                  await onDelete()
                  closeDialog()
                }}
                loading={loading}
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
