import { FormikProvider, useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import {
  Dialog,
  Form,
  IconAdd20,
  Spinner,
  TextIcon,
  toast,
  useDialogSwitch,
  useMutation,
  usePublicQuery,
  useRoute,
} from '~/components'
import updateUserCollectionsArticles from '~/components/GQL/updates/userCollectionsArticles'
import {
  AddCollectionsArticlesMutation,
  AddCollectionsArticleUserPublicQuery,
} from '~/gql/graphql'

import {
  ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
  ADD_COLLECTIONS_ARTICLES,
} from './gql'
// import SelectDialogContent from './SelectDialogContent'
import styles from './styles.module.css'

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

  // public user data
  const userName = getQuery('name')
  const { data, loading } =
    usePublicQuery<AddCollectionsArticleUserPublicQuery>(
      ADD_COLLECTIONS_ARTICLE_USER_PUBLIC,
      {
        variables: { userName, id: articleId },
      }
    )
  const [update] = useMutation<AddCollectionsArticlesMutation>(
    ADD_COLLECTIONS_ARTICLES,
    undefined,
    { showToast: false }
  )
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [area, setArea] = useState<Area>('selecting')
  const inSelectingArea = area === 'selecting'
  const inCreatingArea = area === 'creating'

  const user = data?.user
  const collections = user?.collections

  const formId = 'add-collection-article-form'
  const hasCheckedEdges = collections?.edges?.filter(
    ({ node }) => !!node.contains
  )
  const hasChecked = hasCheckedEdges?.map(({ node }) => node.id) || []

  const formik = useFormik<FormValues>({
    initialValues: {
      checked: [],
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ checked }, { setSubmitting }) => {
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
      closeDialog()
    },
  })

  if (loading) {
    return (
      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Content>
          <Spinner />
        </Dialog.Content>
      </Dialog>
    )
  }

  const SubmitButton = () => (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={formik.isSubmitting}
      text={<FormattedMessage defaultMessage="Confirm" description="" />}
      loading={formik.isSubmitting}
    />
  )

  const InnerForm = (
    <>
      <Dialog.Header
        title={
          <FormattedMessage defaultMessage="Add to collection" description="" />
        }
        rightBtn={<SubmitButton />}
      />
      <Dialog.Content>
        <section className={styles.formContainer}>
          <FormikProvider value={formik}>
            <Form
              id={formId}
              onSubmit={formik.handleSubmit}
              className={styles.listForm}
            >
              {collections?.edges?.map(
                ({ node }) =>
                  node.articles.totalCount < 100 && (
                    <Form.SquareCheckBox
                      key={node.id}
                      hasTooltip={true}
                      checked={
                        hasChecked.includes(node.id) ||
                        formik.values.checked.includes(node.id)
                      }
                      hint={node.title}
                      disabled={hasChecked.includes(node.id)}
                      {...formik.getFieldProps('checked')}
                      value={node.id}
                    />
                  )
              )}
            </Form>
          </FormikProvider>

          <section
            className={styles.newCollection}
            onClick={() => {
              setArea('creating')
            }}
          >
            <TextIcon icon={<IconAdd20 size="mdS" />}>
              <FormattedMessage
                defaultMessage="New Collection"
                description=""
              />
            </TextIcon>
          </section>
        </section>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" description="" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            <SubmitButton />
          </>
        }
      />
    </>
  )

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {/* {inSelectingArea && (
          <SelectDialogContent
            formik={formik}
            articleId={articleId}
            checkingIds={formik.values.checked}
            closeDialog={closeDialog}
            switchToCreating={() => {
              setArea('creating')
            }}
          />
        )} */}
        {inSelectingArea && <>{InnerForm}</>}
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
