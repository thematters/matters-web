import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDebounce } from 'use-debounce'

import { INPUT_DEBOUNCE, MAX_COLLECTION_ARTICLES_COUNT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import {
  Dialog,
  QueryError,
  SpinnerBlock,
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
}

const BaseAddArticlesCollectionDialog = ({
  children,
  collection,
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
  const {
    show,
    openDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)

  const [area, setArea] = useState<Area>('selecting')
  const inSelectingArea = area === 'selecting'
  const inSearchingArea = area === 'searching'
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useDebounce(
    searchValue,
    INPUT_DEBOUNCE
  )

  const { getQuery } = useRoute()

  const userName = getQuery('name')
  const { data, loading, error, fetchMore } =
    usePublicQuery<AddArticlesCollectionUserQuery>(
      ADD_ARTICLES_COLLECTION_USER,
      {
        variables: { userName },
        fetchPolicy: 'network-only',
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
        MAX_COLLECTION_ARTICLES_COUNT - collection.articles.totalCount
      )

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
          cache.evict({ id: cache.identify(viewer), fieldName: 'collections' })
          cache.gc()
        },
      })

      setSubmitting(false)
      baseCloseDialog()
      setArea('selecting')
      // clear data
      formik.setFieldValue('checked', [])
    },
  })

  const closeDialog = () => {
    formik.setFieldValue('checked', [])
    setArea('selecting')
    baseCloseDialog()
  }

  useEffect(() => {
    setSearchValue(debouncedSearchValue)
  }, [debouncedSearchValue])

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
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      loading={formik.isSubmitting}
    />
  )

  if (loading) {
    return (
      <>
        {children({ openDialog })}
        <Dialog isOpen={show} onDismiss={closeDialog}>
          <Dialog.Content>
            <SpinnerBlock />
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

  // pagination
  const connectionPath = 'user.articles'
  const { edges, pageInfo } = data?.user?.articles || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user-collection-articles',
      location: edges?.length || 0,
    })

    await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }
  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Add to collection" id="ub1kHa" />
          }
          closeDialog={closeDialog}
          rightBtn={SubmitButton}
        />

        <Dialog.Content fixedHeight>
          <SearchInput
            value={debouncedSearchValue}
            onChange={(value) => setDebouncedSearchValue(value)}
          />

          {inSelectingArea && (
            <SelectDialogContent
              formik={formik}
              user={user}
              collection={collection}
              checkingIds={formik.values.checked}
              formId={formId}
              loadMore={loadMore}
              pageInfo={pageInfo}
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
                text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
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
