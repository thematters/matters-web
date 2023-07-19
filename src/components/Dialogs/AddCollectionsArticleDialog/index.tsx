import { useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import {
  Dialog,
  Spinner,
  toast,
  useDialogSwitch,
  useMutation,
  useRoute,
} from '~/components'
import updateUserCollectionsArticles from '~/components/GQL/updates/userCollectionsArticles'
import { AddCollectionsArticlesMutation } from '~/gql/graphql'

import { ADD_COLLECTIONS_ARTICLES } from './gql'
import SelectDialogContent from './SelectDialogContent'

type Area = 'selecting' | 'creating'

interface FormValues {
  checked: string[]
}

interface AddCollectionsArticleDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  articleId: string
}

const DynamicContent = dynamic(() => import('../AddCollectionDialog/Content'), {
  loading: Spinner,
})

const BaseAddCollectionsArticleDialog = ({
  children,
  articleId,
}: AddCollectionsArticleDialogProps) => {
  const { getQuery } = useRoute()

  const userName = getQuery('name')
  const [update] = useMutation<AddCollectionsArticlesMutation>(
    ADD_COLLECTIONS_ARTICLES,
    undefined,
    { showToast: false }
  )
  const { show, openDialog, closeDialog: cd } = useDialogSwitch(true)

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
          updateUserCollectionsArticles({
            cache,
            userName,
            collectionIds: checked,
            articleId: articleId,
            type: 'addArticles',
          })
        },
      })

      const path = toPath({
        page: 'collectionDetail',
        userName,
        collection: { id: checked[0] },
      })
      toast.success({
        message: (
          <FormattedMessage
            defaultMessage="Successfully added"
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
      cd()
    },
  })

  const closeDialog = () => {
    formik.setFieldValue('checked', [])
    cd()
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
          <>
            <DynamicContent
              closeDialog={() => {
                setArea('selecting')
              }}
              onUpdated={(cache, collection) => {
                updateUserCollectionsArticles({
                  userName,
                  articleId: articleId,
                  cache,
                  type: 'addConnection',
                  collection,
                })
                formik.setFieldValue('checked', [
                  collection.id,
                  ...formik.values.checked,
                ])
              }}
            />
          </>
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
