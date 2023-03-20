import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'
import {
  ADD_TOAST,
  ASSET_TYPE,
  ENTITY_TYPE,
  MAX_TAG_CONTENT_LENGTH,
  MAX_TAG_DESCRIPTION_LENGTH,
} from '~/common/enums'
import {
  normalizeTagInput, // stripAllPunct, // stripPunctPrefixSuffix,
  parseFormSubmitErrors,
  toPath,
  validateTagName,
} from '~/common/utils'
import {
  CoverUploader,
  Dialog,
  Form,
  LanguageContext,
  useMutation,
} from '~/components'
import { PutTagMutation } from '~/gql/graphql'

import styles from './styles.css'

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

const HintLengthText: React.FC<{
  curLength: number
  maxLength: number
}> = ({ curLength, maxLength }) => (
  <>
    <span className="count">
      <span className={curLength > 0 ? 'highlight' : ''}>{curLength ?? 0}</span>
      &nbsp;/&nbsp;{maxLength}
    </span>
    <style jsx>{styles}</style>
  </>
)

export interface TagDialogContentProps {
  id?: string
  content?: string
  cover?: string | null
  description?: string | null
}

type BaseTagDialogContentProps = {
  closeDialog: () => void
} & TagDialogContentProps

interface FormValues {
  newContent: string
  newCover?: string
  newDescription: string
}

const UNCHANGED_FIELD = 'UNCHANGED_FIELD'

const TagDialogContent: React.FC<BaseTagDialogContentProps> = ({
  id,
  content,
  cover,
  description,
  closeDialog,
}) => {
  const router = useRouter()
  const [update] = useMutation<PutTagMutation>(PUT_TAG, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)
  const isEditing = id && content

  const intl = useIntl()
  const formId = 'put-tag-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      newContent: content || '',
      newCover: UNCHANGED_FIELD,
      newDescription: description || '',
    },
    validate: ({ newContent }) =>
      _pickBy({
        newContent: validateTagName(newContent, lang),
      }),

    onSubmit: async (
      { newContent, newCover, newDescription },
      { setFieldError, setSubmitting }
    ) => {
      try {
        const result = await update({
          variables: {
            input: {
              id,
              content: newContent,
              description: newDescription,
              ...(newCover !== UNCHANGED_FIELD ? { cover: newCover } : {}),
            },
          },
        })

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: id ? (
                <FormattedMessage
                  defaultMessage="Tag Updated"
                  description="src/components/Dialogs/TagDialog/Content.tsx"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Tag Created"
                  description="src/components/Dialogs/TagDialog/Content.tsx"
                />
              ),
              duration: 2000,
            },
          })
        )

        const returnedTagId = result?.data?.putTag?.id
        const returnedTagContent = result?.data?.putTag?.content as string

        setSubmitting(false)

        if (!id) {
          // if created, then redirect to tag detail page
          const path = toPath({
            page: 'tagDetail',
            tag: {
              id: returnedTagId || '',
              content: returnedTagContent,
            },
          })
          router.push(path.href)
        } else {
          closeDialog()
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        setFieldError('newContent', messages[codes[0]])
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      {isEditing && (
        <section className="cover-field">
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
      )}

      <Form.Input
        label={
          <FormattedMessage
            defaultMessage="Title"
            description="src/components/Dialogs/TagDialog/Content.tsx"
          />
        }
        type="text"
        name="newContent"
        placeholder={
          id
            ? intl.formatMessage({
                defaultMessage: 'Title',
                description: '',
              })
            : intl.formatMessage({
                defaultMessage: 'Search Tags...',
                description: '',
              })
        }
        value={values.newContent}
        error={touched.newContent && errors.newContent}
        onBlur={handleBlur}
        onChange={(e) => {
          const newContent = normalizeTagInput(e.target.value)
          setFieldValue('newContent', newContent)
          return newContent
        }}
        hint={
          <FormattedMessage
            defaultMessage="Tag name does not allow punctuations, only one space is allowed between words, and the maximum length is 50 characters"
            description=""
          />
        }
        maxLength={MAX_TAG_CONTENT_LENGTH}
        extraButton={
          <HintLengthText
            curLength={values.newContent?.length ?? 0}
            maxLength={MAX_TAG_CONTENT_LENGTH}
          />
        }
      />

      <Form.Textarea
        label={
          <FormattedMessage
            defaultMessage="Description"
            description="src/components/Dialogs/TagDialog/Content.tsx"
          />
        }
        name="newDescription"
        placeholder={intl.formatMessage({
          defaultMessage: 'enter Description...',
          description: '',
        })}
        value={values.newDescription}
        error={touched.newDescription && errors.newDescription}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        maxLength={MAX_TAG_DESCRIPTION_LENGTH}
        extraButton={
          <HintLengthText
            curLength={values.newDescription?.length ?? 0}
            maxLength={MAX_TAG_DESCRIPTION_LENGTH}
          />
        }
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      text={<FormattedMessage defaultMessage="Confirm" description="" />}
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={isEditing ? 'editTag' : 'createTag'}
        closeDialog={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
      <style jsx>{styles}</style>
    </>
  )
}

export default TagDialogContent
