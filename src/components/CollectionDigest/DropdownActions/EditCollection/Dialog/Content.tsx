import classNames from 'classnames'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import { ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'
import { CoverUploader, Dialog, Form, useMutation } from '~/components'
import {
  EditCollectionCollectionFragment,
  PutCollectionMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface FormProps {
  collection: EditCollectionCollectionFragment
  closeDialog: () => void
}

interface FormValues {
  cover: string | null
  title: string
  description: string
}

const PUT_COLLECTION = gql`
  mutation PutCollection($input: PutCollectionInput!) {
    putCollection(input: $input) {
      id
      title
      description
      cover
    }
  }
`

/**
 * To identify `cover` is changed since it may be `null`
 */
const UNCHANGED_FIELD = 'UNCHANGED_FIELD'

const EditCollectionDialogContent: React.FC<FormProps> = ({
  // user,
  collection,
  closeDialog,
}) => {
  const [update] = useMutation<PutCollectionMutation>(
    PUT_COLLECTION,
    undefined,
    { showToast: false }
  )
  const maxTitle = 40
  const maxDescription = 200

  const formId = 'edit-collection-form'

  const intl = useIntl()
  const validateTitle = (value: string) => {
    if (!value) {
      return intl.formatMessage({
        defaultMessage: 'Required',
      })
    }
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      cover: UNCHANGED_FIELD,
      title: collection.title || '',
      description: collection.description || '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ title }) =>
      _pickBy({
        displayName: validateTitle(title),
      }),
    onSubmit: async (
      { cover, title, description },
      { setSubmitting, setFieldError }
    ) => {
      try {
        await update({
          variables: {
            input: {
              id: collection.id,
              ...(cover !== UNCHANGED_FIELD ? { cover } : {}),
              title,
              description,
            },
          },
        })
        setSubmitting(false)
        closeDialog()
      } catch (error) {
        setSubmitting(false)
      }
    },
  })

  const coverClasses = classNames({
    [styles.container]: true,
    [styles.coverField]: true,
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <section className={coverClasses}>
        <CoverUploader
          assetType={ASSET_TYPE.collectionCover}
          entityId={collection.id}
          cover={collection.cover}
          fallbackCover={IMAGE_COVER.src}
          entityType={ENTITY_TYPE.collection}
          inEditor
          onUpload={(assetId) => setFieldValue('cover', assetId)}
          type="collection"
          bookTitle={values.title}
          bookArticleCount={collection.articles.totalCount}
        />
      </section>

      <section className={styles.container}>
        <Form.Input
          type="text"
          name="title"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Collection name',
          })}
          hint={`${values.title.length}/${maxTitle}`}
          value={values.title}
          error={touched.title && errors.title}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength={maxTitle}
        />
      </section>

      <section className={styles.container}>
        <Form.Textarea
          name="description"
          placeholder={intl.formatMessage({
            defaultMessage: 'Description',
          })}
          hint={`${values.description.length}/${maxDescription}`}
          maxLength={maxDescription}
          value={values.description}
          error={touched.description && errors.description}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </section>
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<FormattedMessage defaultMessage="Confirm" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Edit collection" />}
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

export default EditCollectionDialogContent
