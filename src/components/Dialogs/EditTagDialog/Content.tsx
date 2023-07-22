import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'
import {
  ASSET_TYPE,
  ENTITY_TYPE,
  MAX_TAG_CONTENT_LENGTH,
  MAX_TAG_DESCRIPTION_LENGTH,
} from '~/common/enums'
import {
  normalizeTag,
  parseFormSubmitErrors,
  validateTagName,
} from '~/common/utils'
import {
  CoverUploader,
  Dialog,
  Form,
  LanguageContext,
  toast,
  useMutation,
} from '~/components'
import { PutTagMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const PUT_TAG = gql`
  mutation PutTag($input: PutTagInput!) {
    putTag(input: $input) {
      id
      content
      cover
      description
    }
  }
`

export interface EditTagDialogContentProps {
  id: string
  content?: string
  cover?: string | null
  description?: string | null
}

type BaseEditTagDialogContentProps = {
  closeDialog: () => void
} & EditTagDialogContentProps

interface FormValues {
  newContent: string
  newCover?: string
  newDescription: string
}

const UNCHANGED_FIELD = 'UNCHANGED_FIELD'

const EditTagDialogContent: React.FC<BaseEditTagDialogContentProps> = ({
  id,
  content,
  cover,
  description,
  closeDialog,
}) => {
  const intl = useIntl()
  const [update] = useMutation<PutTagMutation>(PUT_TAG, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)

  const formId = 'put-tag-form'

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
      newContent: content || '',
      newCover: UNCHANGED_FIELD,
      newDescription: description || '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ newContent }) =>
      _pickBy({
        newContent: validateTagName(newContent, lang),
      }),

    onSubmit: async (
      { newContent, newCover, newDescription },
      { setFieldError, setSubmitting }
    ) => {
      try {
        await update({
          variables: {
            input: {
              id,
              content: newContent,
              description: newDescription,
              ...(newCover !== UNCHANGED_FIELD ? { cover: newCover } : {}),
            },
          },
        })

        toast.success({
          message: <FormattedMessage defaultMessage="Saved" />,
        })

        setSubmitting(false)

        closeDialog()
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        setFieldError('newContent', messages[codes[0]])
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <section className={styles.coverField}>
        <CoverUploader
          assetType={ASSET_TYPE.tagCover}
          cover={cover}
          fallbackCover={IMAGE_TAG_COVER.src}
          entityId={id}
          entityType={ENTITY_TYPE.tag}
          inEditor
          onUpload={(assetId) => setFieldValue('newCover', assetId)}
        />
      </section>

      <Form.Input
        label={intl.formatMessage({ defaultMessage: 'tagName' })}
        type="text"
        name="newContent"
        placeholder={intl.formatMessage({ defaultMessage: 'tagName' })}
        value={values.newContent}
        onBlur={handleBlur}
        onChange={(e) => {
          const newContent = normalizeTag(e.target.value)
          setFieldValue('newContent', newContent)
          return newContent
        }}
        maxLength={MAX_TAG_CONTENT_LENGTH}
        hint={`${values.newContent.length}/${MAX_TAG_CONTENT_LENGTH}`}
        error={touched.newContent && errors.newContent}
        hintAlign={touched.newContent && errors.newContent ? 'left' : 'right'}
        spacingTop="loose"
        spacingBottom="base"
      />

      <Form.Textarea
        label={intl.formatMessage({ defaultMessage: 'tagDescription' })}
        name="newDescription"
        placeholder={intl.formatMessage({ defaultMessage: 'tagDescription' })}
        value={values.newDescription}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        maxLength={MAX_TAG_DESCRIPTION_LENGTH}
        hint={`${values.newDescription.length}/${MAX_TAG_DESCRIPTION_LENGTH}`}
        error={touched.newDescription && errors.newDescription}
        hintAlign={
          touched.newDescription && errors.newDescription ? 'left' : 'right'
        }
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      text={<FormattedMessage defaultMessage="Confirm" />}
      type="submit"
      form={formId}
      disabled={isSubmitting}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Edit Tag" />}
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
        hasSmUpTitle={false}
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

export default EditTagDialogContent
