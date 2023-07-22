import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import {
  ASSET_TYPE,
  ENTITY_TYPE,
  MAX_COLLECTION_DESCRIPTION_LENGTH,
  MAX_COLLECTION_TITLE_LENGTH,
} from '~/common/enums'
import { CoverUploader, Dialog, Form, useMutation } from '~/components'
import {
  EditCollectionCollectionFragment,
  PutCollectionMutation,
} from '~/gql/graphql'

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

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
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

      <Form.Input
        type="text"
        name="title"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Collection name',
        })}
        value={values.title}
        hint={`${values.title.length}/${MAX_COLLECTION_TITLE_LENGTH}`}
        error={touched.title && errors.title}
        hintAlign={touched.title && errors.title ? 'left' : 'right'}
        onBlur={handleBlur}
        onChange={handleChange}
        maxLength={MAX_COLLECTION_TITLE_LENGTH}
        spacingTop="loose"
        spacingBottom="base"
      />

      <Form.Textarea
        name="description"
        placeholder={intl.formatMessage({
          defaultMessage: 'Description',
        })}
        maxLength={MAX_COLLECTION_DESCRIPTION_LENGTH}
        value={values.description}
        hint={`${values.description.length}/${MAX_COLLECTION_DESCRIPTION_LENGTH}`}
        error={touched.description && errors.description}
        hintAlign={touched.description && errors.description ? 'left' : 'right'}
        onBlur={handleBlur}
        onChange={handleChange}
      />
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
