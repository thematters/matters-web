import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  QueryError,
  Spinner,
  useDialogSwitch,
  useMutation,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { updateUserCollectionDetail } from '~/components/GQL'
import {
  AddArticlesCollectionMutation,
  AddArticlesCollectionUserQuery,
  CollectionArticlesCollectionFragment,
} from '~/gql/graphql'
import { USER_COLLECTIONS } from '~/views/User/Collections/gql'

import { ADD_ARTICLES_COLLECTION, ADD_ARTICLES_COLLECTION_USER } from './gql'
import SearchingDialogContent from './SearchingDialogContent'
import SearchInput from './SearchInput'
import SelectDialogContent from './SelectDialogContent'

type Area = 'selecting' | 'searching'

interface FormValues {
  checked: string[]
}

interface AddArticlesCollectionDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  collection: CollectionArticlesCollectionFragment
  onUpdate: () => void
}

const BaseAddArticlesCollectionDialog = ({
  children,
  collection,
  onUpdate,
}: AddArticlesCollectionDialogProps) => {
  const viewer = useContext(ViewerContext)

  const formId = 'add-articles-collection-form'

  const [update] = useMutation<AddArticlesCollectionMutation>(
    ADD_ARTICLES_COLLECTION,
    undefined,
    {
      showToast: false,
    }
  )
  const { show, openDialog, closeDialog: cd } = useDialogSwitch(true)

  const [area, setArea] = useState<Area>('selecting')
  const inSelectingArea = area === 'selecting'
  const inSearchingArea = area === 'searching'
  const [searchValue, setSearchValue] = useState('')

  const { getQuery } = useRoute()

  const userName = getQuery('name')
  const { data, loading, error } =
    usePublicQuery<AddArticlesCollectionUserQuery>(
      ADD_ARTICLES_COLLECTION_USER,
      {
        variables: { userName },
      }
    )

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

      const addChecked = checked.slice(
        0,
        100 - collection.articles.totalCount - 1
      )

      onUpdate()
      await update({
        variables: {
          input: {
            collections: [collection.id],
            articles: addChecked,
          },
          first: addChecked.length,
        },
        update: (cache, result) => {
          updateUserCollectionDetail({
            cache,
            type: 'add',
            collectionId: collection.id,
            result,
          })
        },
        refetchQueries: [
          {
            query: USER_COLLECTIONS,
            variables: { userName: viewer.userName },
          },
        ],
      })

      setSubmitting(false)
      cd()
      setArea('selecting')
      // clear data
      formik.setFieldValue('checked', [])
    },
  })

  const closeDialog = () => {
    formik.setFieldValue('checked', [])
    setArea('selecting')
    cd()
  }

  useEffect(() => {
    if (searchValue === '') {
      setArea('selecting')
    } else {
      setArea('searching')
    }
  }, [searchValue])

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={formik.isSubmitting || formik.values.checked.length === 0}
      text={<FormattedMessage defaultMessage="Confirm" />}
      loading={formik.isSubmitting}
    />
  )

  if (loading) {
    return (
      <>
        {children({ openDialog })}
        <Dialog isOpen={show} onDismiss={closeDialog}>
          <Dialog.Content>
            <Spinner />
          </Dialog.Content>
        </Dialog>
      </>
    )
  }

  const user = data?.user

  if (error) {
    return <QueryError error={error} />
  }

  if (!user) {
    return <>{children({ openDialog })}</>
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Add to collection" />}
          closeDialog={closeDialog}
          rightBtn={SubmitButton}
        />

        <Dialog.Content fixedHeight>
          <SearchInput
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
          />

          {inSelectingArea && (
            <SelectDialogContent
              formik={formik}
              user={user}
              collection={collection}
              checkingIds={formik.values.checked}
              formId={formId}
            />
          )}

          {inSearchingArea && (
            <SearchingDialogContent
              formik={formik}
              user={user}
              collection={collection}
              checkingIds={formik.values.checked}
              searchValue={searchValue}
              formId={formId}
            />
          )}
        </Dialog.Content>

        <Dialog.Footer
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Cancel" />}
                color="greyDarker"
                onClick={closeDialog}
              />
              {SubmitButton}
            </>
          }
        />
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
