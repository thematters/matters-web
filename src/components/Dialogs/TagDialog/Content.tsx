import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useRouter } from 'next/router'
import { useContext } from 'react'

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
  translate,
  validateTagName,
} from '~/common/utils'
import {
  CoverUploader,
  Dialog,
  Form,
  LanguageContext,
  Translate,
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
              content: <Translate id={id ? 'tagEdited' : 'tagCreated'} />,
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
        label={<Translate id="tagName" />}
        type="text"
        name="newContent"
        placeholder={translate({ id: id ? 'tagName' : 'searchTag', lang })}
        value={values.newContent}
        error={touched.newContent && errors.newContent}
        onBlur={handleBlur}
        onChange={(e) => {
          const newContent = normalizeTagInput(e.target.value)
          setFieldValue('newContent', newContent)
          return newContent
        }}
        hint={<Translate id="hintAddTagNamingRestriction" />}
        maxLength={MAX_TAG_CONTENT_LENGTH}
        extraButton={
          <HintLengthText
            curLength={values.newContent?.length ?? 0}
            maxLength={MAX_TAG_CONTENT_LENGTH}
          />
        }
      />

      <Form.Textarea
        label={<Translate id="tagDescription" />}
        name="newDescription"
        placeholder={translate({ id: 'tagDescriptionPlaceholder', lang })}
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
      text={<Translate id="confirm" />}
      type="submit"
      form={formId}
      disabled={isSubmitting}
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
