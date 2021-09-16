import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import {
  CoverUploader,
  Dialog,
  Form,
  LanguageContext,
  Translate,
  useMutation,
  useRoute,
} from '~/components'

import { ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'
import {
  parseFormSubmitErrors,
  toPath,
  translate,
  validateDescription,
  validateTopicTitle,
} from '~/common/utils'

import IMAGE_COVER from '@/public/static/images/tag-cover.png'

import { PUT_TOPIC } from './gql'

import { PutTopic } from './__generated__/PutTopic'
import { PutTopicDialogTopic } from './__generated__/PutTopicDialogTopic'

interface FormProps {
  topic?: PutTopicDialogTopic
  closeDialog: () => void
}

interface FormValues {
  cover: string | null
  title: string
  description: string
}

/**
 * To identify `cover` is changed since it may be `null`
 */
const UNCHANGED_FIELD = 'UNCHANGED_FIELD'

const PutTopicDialogContent: React.FC<FormProps> = ({
  topic: initTopic,
  closeDialog,
}) => {
  const router = useRouter()
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const [topic, setTopic] = useState(initTopic)
  const [putTopic] = useMutation<PutTopic>(PUT_TOPIC, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)

  const formId = 'put-topic-form'
  const isCreate = !initTopic
  const isCreateStep1 = isCreate && !topic
  const isCreateStep2 = isCreate && topic

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
      cover: UNCHANGED_FIELD,
      title: topic?.title || '',
      description: topic?.description || '',
    },
    validate: ({ title, description }) =>
      _pickBy({
        title: validateTopicTitle(title, lang),
        description: validateDescription(description, lang),
      }),
    onSubmit: async (
      { cover, title, description },
      { setSubmitting, setFieldError }
    ) => {
      try {
        const { data } = await putTopic({
          variables: {
            input: {
              ...(cover !== UNCHANGED_FIELD ? { cover } : {}),
              title,
              description,
            },
          },
        })
        const newTopic = data?.putTopic

        setSubmitting(false)

        // close dialog if topic is edited or creation is finished
        if (isCreateStep2 && !isCreate) {
          closeDialog()
        }

        // Set topic to continue next step of topic creation
        if (isCreateStep1) {
          setTopic(newTopic)
        }

        // redirect to detail page if topic creation is finished
        if (isCreateStep2 && newTopic) {
          const path = toPath({
            page: 'userEditTopicsTopic',
            userName,
            topicId: newTopic.id,
          })
          router.push(path.href)
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach((code) => {
          if (code === 'DISPLAYNAME_INVALID') {
            setFieldError(
              'displayName',
              translate({ id: 'hintDisplayName', lang })
            )
          } else {
            setFieldError('description', messages[code])
          }
        })
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      {(isCreateStep2 || !isCreate) && topic && (
        <section className="cover-field">
          <CoverUploader
            assetType={ASSET_TYPE.topicCover}
            cover={topic.cover}
            fallbackCover={IMAGE_COVER.src}
            entityType={ENTITY_TYPE.topic}
            entityId={topic.id}
            inEditor
            type="topic"
            onUpload={(assetId) => setFieldValue('cover', assetId)}
          />
        </section>
      )}

      <Form.Input
        label={
          <Translate zh_hant="主題名稱" zh_hans="主题名称" en="Topic Title" />
        }
        type="text"
        name="title"
        required
        placeholder={translate({
          zh_hant: '輸入主題名稱',
          zh_hans: '输入主题名称',
          en: 'Enter topic title',
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
            zh_hant="主題描述"
            zh_hans="主题描述"
            en="Topic Description"
          />
        }
        name="description"
        required
        placeholder={translate({
          zh_hant: '輸入主題描述',
          zh_hans: '输入主题描述',
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
      text={<Translate id={topic ? 'save' : 'create'} />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={topic ? 'editTopic' : 'createTopic'}
        closeDialog={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default PutTopicDialogContent
