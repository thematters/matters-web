import { useFormik } from 'formik'
import { useState } from 'react'

import {
  Dialog,
  // Spinner,
  // toast,
  useDialogSwitch,
  useMutation,
} from '~/components'
import updateUserCollectionDetail from '~/components/GQL/updates/userCollectionDetail'
import {
  AddArticlesCollectionMutation,
  CollectionDetailFragment,
} from '~/gql/graphql'

import { ADD_ARTICLES_COLLECTION } from './gql'
import SelectDialogContent from './SelectDialogContent'

type Area = 'selecting' | 'searching'

interface FormValues {
  checked: string[]
}

interface AddArticlesCollectionDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  collection: CollectionDetailFragment
  onUpdate: () => void
}

const BaseAddArticlesCollectionDialog = ({
  children,
  collection,
  onUpdate,
}: AddArticlesCollectionDialogProps) => {
  const [update] = useMutation<AddArticlesCollectionMutation>(
    ADD_ARTICLES_COLLECTION,
    undefined,
    {
      showToast: false,
    }
  )
  const { show, openDialog, closeDialog: cd } = useDialogSwitch(true)

  // const [area, setArea] = useState<Area>('selecting')
  const [area] = useState<Area>('selecting')
  const inSelectingArea = area === 'selecting'
  const inSearchingArea = area === 'searching'

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
      onUpdate()
      await update({
        variables: {
          input: {
            collections: [collection.id],
            articles: checked,
          },
          first: checked.length,
        },
        update: (cache, result) => {
          updateUserCollectionDetail({
            cache,
            type: 'add',
            collectionId: collection.id,
            result,
          })
        },
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
            collection={collection}
            checkingIds={formik.values.checked}
            closeDialog={closeDialog}
          />
        )}
        {inSearchingArea && <>search area</>}
      </Dialog>
    </>
  )
}

export const AddArticlesCollectionDialog = (
  props: AddArticlesCollectionDialogProps
) => (
  <Dialog.Lazy mounted={<BaseAddArticlesCollectionDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
