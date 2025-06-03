import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import {
  ASSET_TYPE,
  ENTITY_TYPE,
  MAX_COLLECTION_DESCRIPTION_LENGTH,
  MAX_COLLECTION_TITLE_LENGTH,
} from '~/common/enums'
import { formStorage } from '~/common/utils'
import {
  CoverUploader,
  Dialog,
  Form,
  useMutation,
  ViewerContext,
} from '~/components'
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

type FormDraft = FormValues & {
  coverPath?: string | null
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
  const intl = useIntl()
  const viewer = useContext(ViewerContext)

  const formId = 'edit-collection-form'
  const formStorageKey = formStorage.genKey({ authorId: viewer.id, formId })
  const formDraft = formStorage.get<FormDraft>(formStorageKey, 'session')

  const [update] = useMutation<PutCollectionMutation>(
    PUT_COLLECTION,
    {
      update: (cache) => {
        cache.evict({
          id: cache.identify(viewer),
          fieldName: 'collections',
        })
        cache.gc()
      },
      onQueryUpdated(observableQuery) {
        return observableQuery.refetch()
      },
    },
    { showToast: false }
  )

  const validateTitle = (value: string) => {
    if (!value) {
      return intl.formatMessage({
        defaultMessage: 'Required',
        id: 'Seanpx',
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
      cover: formDraft?.cover || UNCHANGED_FIELD,
      title: formDraft?.title || collection.title || '',
      description: formDraft?.description || collection.description || '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ title }) =>
      _pickBy({
        displayName: validateTitle(title),
      }),
    onSubmit: async ({ cover, title, description }, { setSubmitting }) => {
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

        // clear draft
        formStorage.remove(formStorageKey, 'session')

        setSubmitting(false)
        closeDialog()
      } catch {
        setSubmitting(false)
      }
    },
  })

  const [coverLoading, setCoverLoading] = useState(false)
  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <CoverUploader
        assetType={ASSET_TYPE.collectionCover}
        entityId={collection.id}
        cover={formDraft?.coverPath || collection.cover}
        fallbackCover={IMAGE_COVER.src}
        entityType={ENTITY_TYPE.collection}
        inEditor
        onUploaded={(assetId, path) => {
          setFieldValue('cover', assetId)
          formStorage.set<FormDraft>(
            formStorageKey,
            { ...values, cover: assetId, coverPath: path },
            'session'
          )
        }}
        onUploadStart={() => setCoverLoading(true)}
        onUploadEnd={() => setCoverLoading(false)}
        onReset={() => {
          setFieldValue('cover', null)
          formStorage.set<FormDraft>(
            formStorageKey,
            { ...values, cover: null, coverPath: null },
            'session'
          )
        }}
        type="collection"
        bookTitle={values.title}
      />

      <Form.Input
        type="text"
        name="title"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Collection name',
          id: 'A6ozr9',
        })}
        value={values.title}
        hint={`${values.title.length}/${MAX_COLLECTION_TITLE_LENGTH}`}
        error={touched.title && errors.title}
        hintAlign={touched.title && errors.title ? 'left' : 'right'}
        onBlur={handleBlur}
        onChange={(e) => {
          handleChange(e)
          formStorage.set<FormDraft>(
            formStorageKey,
            { ...values, title: e.target.value },
            'session'
          )
        }}
        maxLength={MAX_COLLECTION_TITLE_LENGTH}
        spacingTop="loose"
        spacingBottom="base"
      />

      <Form.Textarea
        name="description"
        placeholder={intl.formatMessage({
          defaultMessage: 'Description',
          id: 'Q8Qw5B',
        })}
        maxLength={MAX_COLLECTION_DESCRIPTION_LENGTH}
        value={values.description}
        hint={`${values.description.length}/${MAX_COLLECTION_DESCRIPTION_LENGTH}`}
        error={touched.description && errors.description}
        hintAlign={touched.description && errors.description ? 'left' : 'right'}
        onBlur={handleBlur}
        onChange={(e) => {
          handleChange(e)
          formStorage.set<FormDraft>(
            formStorageKey,
            { ...values, description: e.target.value },
            'session'
          )
        }}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting || coverLoading}
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      loading={isSubmitting || coverLoading}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage defaultMessage="Edit collection" id="WQT8ZA" />
        }
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

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
    </>
  )
}

export default EditCollectionDialogContent
