import { FormikProvider, useFormik } from 'formik'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  Form,
  IconAdd20,
  Spinner,
  TextIcon,
  useDialogSwitch,
  useMutation,
  usePublicQuery,
  useRoute,
} from '~/components'
import {
  AddCollectionsArticlesMutation,
  CollectionSelectUserPublicQuery,
} from '~/gql/graphql'

import { ADD_COLLECTIONS_ARTICLES, COLLECTION_SELECT_USER_PUBLIC } from './gql'
import styles from './styles.module.css'

type Area = 'selecting' | 'creating'

interface FormValues {
  checked: string[]
}

interface CollectionSelectDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  articleId: string
}

const DynamicContent = dynamic(() => import('../AddCollectionDialog/Content'), {
  loading: Spinner,
})

const BaseCollectionSelectDialog = ({
  children,
  articleId,
}: CollectionSelectDialogProps) => {
  const { getQuery } = useRoute()

  // public user data
  const userName = getQuery('name')
  const { data, loading, refetch } =
    usePublicQuery<CollectionSelectUserPublicQuery>(
      COLLECTION_SELECT_USER_PUBLIC,
      {
        variables: { userName },
        fetchPolicy: 'network-only',
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
  const checked: string[] = []
  collections?.edges?.forEach(({ node }) => {
    if (
      node.articles.edges?.findIndex(
        ({ node: articleNode }) => articleNode.id === articleId
      ) !== -1
    ) {
      checked.push(node.id)
    }
  })

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
      })

      if (checked.length === 1) {
        // TODO: toast
      }
      setSubmitting(false)
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
                    <Form.SquireCheckBox
                      key={node.id}
                      checked={
                        checked.includes(node.id) ||
                        formik.values.checked.includes(node.id)
                      }
                      hint={node.title}
                      disabled={checked.includes(node.id)}
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

  // const CollectionList = (
  //   // Why don't use useFormik 👇🔗
  //   // https://formik.org/docs/api/useFormik
  //   // “Be aware that <Field>, <FastField>, <ErrorMessage>, connect(), and <FieldArray> will NOT work with useFormik() as they all require React Context. ”

  //   <Formik
  //     initialValues={{ checked: [] as string[] }}
  //     enableReinitialize
  //     onSubmit={async (values) => {
  //       // console.log({ values })
  //       update({
  //         variables: {
  //           input: {
  //             collections: values.checked,
  //             articles: [articleId],
  //           },
  //         },
  //       })
  //     }}
  //   >
  //     {({ values, handleSubmit, isSubmitting, setFieldValue }) => {
  //       const SubmitButton = () => (
  //         <Dialog.TextButton
  //           type="submit"
  //           form={formId}
  //           disabled={isSubmitting}
  //           text={<FormattedMessage defaultMessage="Confirm" description="" />}
  //           loading={isSubmitting}
  //         />
  //       )
  //       return (
  //         <>
  //           <Dialog.Header
  //             title={
  //               <FormattedMessage
  //                 defaultMessage="Add to collection"
  //                 description=""
  //               />
  //             }
  //             rightBtn={<SubmitButton />}
  //           />
  //           <section className={styles.formContainer}>
  //             <Form
  //               id={formId}
  //               onSubmit={handleSubmit}
  //               className={styles.listForm}
  //             >
  //               {collections?.edges?.map(
  //                 ({ node }) =>
  //                   node.articles.totalCount < 100 && (
  //                     <Form.SquireCheckBox
  //                       key={node.id}
  //                       name="checked"
  //                       value={node.id}
  //                       checked={
  //                         checked.includes(node.id) ||
  //                         values.checked.includes(node.id)
  //                       }
  //                       hint={node.title}
  //                       disabled={checked.includes(node.id)}
  //                     />
  //                   )
  //               )}
  //             </Form>
  //           </section>

  // <section
  //   className={styles.newCollection}
  //   onClick={() => {
  //     setArea('creating')
  //   }}
  // >
  //   <TextIcon icon={<IconAdd20 size="mdS" />}>
  //     <FormattedMessage
  //       defaultMessage="New Collection"
  //       description=""
  //     />
  //   </TextIcon>
  // </section>

  // {/* </Dialog.Message> */}

  // <Dialog.Footer
  //   smUpBtns={
  //     <>
  //       <Dialog.TextButton
  //         text={
  //           <FormattedMessage
  //             defaultMessage="Cancel"
  //             description=""
  //           />
  //         }
  //         color="greyDarker"
  //         onClick={closeDialog}
  //       />
  //       <SubmitButton />
  //     </>
  //   }
  // />
  //         </>
  //       )
  //     }}
  //   </Formik>
  // )

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {/* {inSelectingArea && <>{CollectionList}</>} */}
        {inSelectingArea && <>{InnerForm}</>}
        {inCreatingArea && (
          <>
            <DynamicContent
              closeDialog={() => {
                refetch()
                setArea('selecting')
              }}
              updateChecked={(value) => {
                formik.setFieldValue('checked', [
                  value,
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

export const CollectionSelectDialog = (props: CollectionSelectDialogProps) => (
  <Dialog.Lazy mounted={<BaseCollectionSelectDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
