import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { KEYVALUE } from '~/common/enums'
import { toPath, validateCollectionTitle } from '~/common/utils'
import {
  CollectionDigest,
  Dialog,
  Form,
  LanguageContext,
  useMutation,
  useRoute,
} from '~/components'
import updateUserArticles from '~/components/GQL/updates/userArticles'
import updateUserCollections from '~/components/GQL/updates/userCollections'
import { CreateCollectionMutation } from '~/gql/graphql'

import styles from './styles.module.css'

type Collection = CreateCollectionMutation['putCollection']
interface FormProps {
  closeDialog: () => void
  onUpdated?: (cache: any, collection: Collection) => void
  gotoDetailPage?: boolean
}

interface FormValues {
  title: string
}

const CREATE_COLLECTION = gql`
  mutation CreateCollection($input: PutCollectionInput!) {
    putCollection(input: $input) {
      id
      ...CollectionDigestFeedCollection
    }
  }
  ${CollectionDigest.Feed.fragments.collection}
`

const AddCollectionDialogContent: React.FC<FormProps> = ({
  closeDialog,
  onUpdated,
  gotoDetailPage,
}) => {
  const [create] = useMutation<CreateCollectionMutation>(
    CREATE_COLLECTION,
    undefined,
    { showToast: false }
  )
  const { lang } = useContext(LanguageContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const router = useRouter()

  const maxCollectionTitle = 40

  const formId = 'edit-new-collection-form'

  const intl = useIntl()
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      title: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ title }) =>
      _pickBy({
        title: validateCollectionTitle(title, lang),
      }),
    onSubmit: async ({ title }, { setSubmitting, setFieldError }) => {
      try {
        const { data } = await create({
          variables: {
            input: {
              title,
            },
          },
          update(cache, result) {
            updateUserArticles({
              cache,
              userName,
              type: 'addCollection',
            })
            updateUserCollections({
              cache,
              userName,
              collection: result.data?.putCollection || ({} as Collection),
              type: 'add',
            })
            if (onUpdated) {
              onUpdated(cache, result.data?.putCollection || ({} as Collection))
            }
          },
        })
        setSubmitting(false)

        if (gotoDetailPage && data) {
          const path = toPath({
            page: 'collectionDetail',
            userName,
            collection: data.putCollection,
          })
          router.push(path.href)
        }

        closeDialog()
      } catch (error) {
        setSubmitting(false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <section className={styles.container}>
        <Form.Input
          type="text"
          name="title"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Collection Name',
          })}
          hint={`${values.title.length}/${maxCollectionTitle}`}
          value={values.title}
          error={touched.title && errors.title}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength={maxCollectionTitle}
          onKeyDown={(e) => {
            if (e.key.toLocaleLowerCase() === KEYVALUE.enter) {
              e.stopPropagation()
            }
          }}
        />
      </section>
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<FormattedMessage defaultMessage="Create" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="New Collection" />}
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

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
    </>
  )
}

export default AddCollectionDialogContent
