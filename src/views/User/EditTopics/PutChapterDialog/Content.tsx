import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Translate,
  useMutation,
  useRoute,
} from '~/components'

import {
  parseFormSubmitErrors,
  toPath,
  translate,
  validateDescription,
  validateTopicTitle,
} from '~/common/utils'

import { PUT_CHAPTER } from './gql'

import { PutChapter } from './__generated__/PutChapter'
import { PutChapterDialogChapter } from './__generated__/PutChapterDialogChapter'

interface FormProps {
  topicId: string
  chapter?: PutChapterDialogChapter
  closeDialog: () => void
}

interface FormValues {
  title: string
  description: string
}

const PutChapterDialogContent: React.FC<FormProps> = ({
  topicId,
  chapter,
  closeDialog,
}) => {
  const router = useRouter()
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const [putChapter] = useMutation<PutChapter>(PUT_CHAPTER, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)

  const formId = 'put-chapter-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik<FormValues>({
    initialValues: {
      title: chapter?.title || '',
      description: chapter?.description || '',
    },
    validate: ({ title, description }) =>
      _pickBy({
        title: validateTopicTitle(title, lang),
        description: validateDescription(description, lang),
      }),
    onSubmit: async (
      { title, description },
      { setSubmitting, setFieldError }
    ) => {
      try {
        const { data } = await putChapter({
          variables: {
            input: {
              topic: topicId,
              ...(chapter ? { id: chapter.id } : {}),
              title,
              description,
            },
          },
        })
        const newChapter = data?.putChapter

        setSubmitting(false)

        closeDialog()

        if (!chapter && newChapter) {
          const path = toPath({
            page: 'userEditTopicsTopicChapter',
            userName,
            topicId,
            chapterId: newChapter.id,
          })
          router.push(path.href)
        }

        // TODO: refresh chapter
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach((code) => {
          setFieldError('description', messages[code])
        })
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={
          <Translate zh_hant="章節名稱" zh_hans="章节名称" en="Chapter Title" />
        }
        type="text"
        name="title"
        required
        placeholder={translate({
          zh_hant: '輸入章節名稱',
          zh_hans: '输入章节名称',
          en: 'Enter chapter title',
          lang,
        })}
        hint={
          <Translate
            zh_hant="20 字以內"
            zh_hans="20 字以内"
            en="Max 20 characters."
          />
        }
        value={values.title}
        error={touched.title && errors.title}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Textarea
        label={
          <Translate
            zh_hant="章節描述"
            zh_hans="章节描述"
            en="Chapter Description"
          />
        }
        name="description"
        required
        placeholder={translate({
          zh_hant: '輸入章節描述',
          zh_hans: '输入章节描述',
          en: 'Enter chapter description',
          lang,
        })}
        hint={<Translate id="hintDescription" />}
        value={values.description}
        error={touched.description && errors.description}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      text={<Translate id={chapter ? 'save' : 'create'} />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={chapter ? 'editChapter' : 'createChapter'}
        closeDialog={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default PutChapterDialogContent
