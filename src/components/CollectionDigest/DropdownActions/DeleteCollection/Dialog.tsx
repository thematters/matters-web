import gql from 'graphql-tag'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Dialog,
  toast,
  useDialogSwitch,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
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
  const {
    show,
    openDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)
  const { isInPath, router } = useRoute()
  const isInUserCollectionDetail = isInPath('USER_COLLECTION_DETAIL')
  const [step, setStep] = useState<Step>('delete')
  const isInDelete = step === 'delete'
  const isInConfirmDelete = step === 'confirmDelete'
  const closeDialog = () => {
    baseCloseDialog()
    setTimeout(() => {
      setStep('delete')
    }, 1000)
  }
  const [deleteCollection, { loading, client }] =
    useMutation<DeleteCollectionMutation>(DELETE_COLLECTION, {
      variables: { id: collection.id },
      update: (cache) => {
        cache.evict({
          id: cache.identify(viewer),
          fieldName: 'collections',
        })
        cache.evict({
          id: cache.identify(viewer),
          fieldName: 'pinnedWorks',
        })
        cache.gc()
        onEmptyCollection()
      },
      onQueryUpdated(observableQuery) {
        return observableQuery.refetch()
      },
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

    toast.info({
      message: (
        <FormattedMessage
          defaultMessage="Collection is deleted"
          id="Ft76YC"
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

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_DELETE_COLLECTION}
      >
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Delete collection" id="m4GG4b" />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            {isInDelete && (
              <p>
                <FormattedMessage
                  defaultMessage="Are you sure you want to delete this collection ‘{collection}’?"
                  id="T9oZC8"
                  values={{
                    collection: (
                      <span className="u-highlight">{collection.title}</span>
                    ),
                  }}
                />
                <br />
                <FormattedMessage
                  defaultMessage="(Articles in this collection will not be deleted)"
                  id="a/xacb"
                />
              </p>
            )}
            {isInConfirmDelete && (
              <p>
                <FormattedMessage
                  defaultMessage="This action cannot be undone. Are you sure you want to delete this collection?"
                  id="Xi40U9"
                />
              </p>
            )}
          </Dialog.Content.Message>
        </Dialog.Content>

        {isInDelete && (
          <Dialog.Footer
            closeDialog={closeDialog}
            btns={
              <Dialog.RoundedButton
                text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
                color="red"
                onClick={() => {
                  setStep('confirmDelete')
                }}
              />
            }
            smUpBtns={
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
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
                text={
                  <FormattedMessage
                    defaultMessage="Confirm Deletion"
                    id="W8OZ3G"
                  />
                }
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
                text={
                  <FormattedMessage
                    defaultMessage="Confirm Deletion"
                    id="W8OZ3G"
                  />
                }
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
