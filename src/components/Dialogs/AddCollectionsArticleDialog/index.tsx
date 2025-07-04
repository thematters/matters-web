import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import {
  Dialog,
  SpinnerBlock,
  toast,
  useDialogSwitch,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import { AddCollectionsArticlesMutation } from '~/gql/graphql'

import { ADD_COLLECTIONS_ARTICLES } from './gql'
import SelectDialogContent from './SelectDialogContent'

type Area = 'selecting' | 'creating'

interface FormValues {
  checked: string[]
}

export interface AddCollectionsArticleDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  articleId: string
}

const DynamicContent = dynamic(() => import('../AddCollectionDialog/Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseAddCollectionsArticleDialog = ({
  children,
  articleId,
}: AddCollectionsArticleDialogProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()

  const userName = viewer.userName || getQuery('name')
  const [update] = useMutation<AddCollectionsArticlesMutation>(
    ADD_COLLECTIONS_ARTICLES,
    undefined,
    { showToast: false }
  )
  const {
    show,
    openDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)

  const [area, setArea] = useState<Area>('selecting')
  const inSelectingArea = area === 'selecting'
  const inCreatingArea = area === 'creating'

  const formik = useFormik<FormValues>({
    initialValues: {
      checked: [],
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ checked }, { setSubmitting }) => {
      if (!checked || checked.length === 0) {
        return
      }

      await update({
        variables: {
          input: {
            collections: checked,
            articles: [articleId],
          },
        },
        update: (cache) => {
          cache.evict({
            id: cache.identify(viewer),
            fieldName: 'collections',
          })
          cache.evict({
            id: cache.identify({ __typename: 'Collection', id: checked[0] }),
          })
          cache.gc()
        },
        onQueryUpdated(observableQuery) {
          return observableQuery.refetch()
        },
      })

      const path = toPath({
        page: 'collectionDetail',
        userName,
        collection: { id: checked[0] },
      })
      toast.info({
        message: (
          <FormattedMessage
            defaultMessage="Successfully added"
            id="6q0G5e"
            description="src/components/Dialogs/CollectionSelectDialog/index.tsx"
          />
        ),
        actions:
          checked.length === 1
            ? [
                {
                  content: (
                    <FormattedMessage
                      defaultMessage="View"
                      id="IKPYe9"
                      description="src/components/Dialogs/CollectionSelectDialog/index.tsx"
                    />
                  ),
                  htmlHref: path.href,
                },
              ]
            : undefined,
      })
      setSubmitting(false)
      // clear data
      formik.setFieldValue('checked', [])
      baseCloseDialog()
    },
  })

  const closeDialog = () => {
    formik.setFieldValue('checked', [])
    baseCloseDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {inSelectingArea && (
          <SelectDialogContent
            formik={formik}
            articleId={articleId}
            checkingIds={formik.values.checked}
            closeDialog={closeDialog}
            switchToCreating={() => {
              setArea('creating')
            }}
          />
        )}
        {inCreatingArea && (
          <DynamicContent
            closeDialog={() => {
              setArea('selecting')
            }}
            onUpdate={(cache, collection) => {
              cache.modify({
                id: cache.identify(viewer),
                fields: {
                  collections: (existingCollections) => {
                    const newEdge = {
                      __typename: 'CollectionEdge',
                      node: {
                        ...collection,
                        articles: {
                          __typename: 'ArticleConnection',
                          totalCount: 0,
                          edges: [],
                        },
                        contains: false,
                      },
                    }
                    return {
                      ...existingCollections,
                      edges: [newEdge, ...existingCollections.edges],
                    }
                  },
                },
              })

              formik.setFieldValue('checked', [
                collection.id,
                ...formik.values.checked,
              ])
            }}
          />
        )}
      </Dialog>
    </>
  )
}

export const AddCollectionsArticleDialog = (
  props: AddCollectionsArticleDialogProps
) => (
  <Dialog.Lazy mounted={<BaseAddCollectionsArticleDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
