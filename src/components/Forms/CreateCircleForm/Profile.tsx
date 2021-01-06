import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  AvatarUploader,
  CoverUploader,
  Dialog,
  Form,
  LanguageContext,
  Layout,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'
import PUT_CIRCLE from '~/components/GQL/mutations/putCircle'

import {
  parseFormSubmitErrors,
  routerPush,
  toPath,
  translate,
  validateDescription,
} from '~/common/utils'

import CIRCLE_COVER from '@/public/static/images/circle-cover.svg'
import { ADD_TOAST, ASSET_TYPE, ENTITY_TYPE } from '@/src/common/enums'

import styles from './styles.css'

import {
  PutCircle,
  PutCircle_putCircle,
} from '~/components/GQL/mutations/__generated__/PutCircle'

interface FormProps {
  circle: PutCircle_putCircle
  purpose: 'dialog' | 'page'
  closeDialog?: () => void
}

interface FormValues {
  avatar: string | null
  cover: string | null
  description: string
}

/**
 * To identify `cover` is changed since it may be `null`
 */
const UNCHANGED_FIELD = 'UNCHANGED_FIELD'

const Init: React.FC<FormProps> = ({ circle, purpose, closeDialog }) => {
  const [update] = useMutation<PutCircle>(PUT_CIRCLE)
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'
  const formId = 'edit-circle-profile-form'

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
      avatar: UNCHANGED_FIELD,
      cover: UNCHANGED_FIELD,
      description: circle.description || '',
    },
    validate: ({ description }) =>
      _pickBy({
        description: validateDescription(description, lang),
      }),
    onSubmit: async (
      { avatar, cover, description },
      { setSubmitting, setFieldError }
    ) => {
      try {
        const { data } = await update({
          variables: {
            input: {
              ...(avatar !== UNCHANGED_FIELD ? { avatar } : {}),
              ...(cover !== UNCHANGED_FIELD ? { cover } : {}),
              description,
            },
          },
        })

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <Translate id="successCreateCircle" />,
            },
          })
        )

        if (data?.putCircle) {
          const path = toPath({ page: 'circleDetail', circle: data.putCircle })
          routerPush(path.href)
        }

        setSubmitting(false)

        if (closeDialog) {
          closeDialog()
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('description', messages[codes[0]])
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <section className="cover-field">
        <CoverUploader
          type="circle"
          assetType={ASSET_TYPE.circleCover}
          cover={circle.cover}
          fallbackCover={CIRCLE_COVER}
          inEditor
          onUpload={(assetId) => setFieldValue('cover', assetId)}
          entityType={ENTITY_TYPE.user}
          entityId={circle.id}
        />
      </section>

      <section className="avatar-field">
        <header>
          <p className="label">
            <Translate
              zh_hant="上傳縮圖頭像和封面照"
              zh_hans="上传缩图头像和封面照"
            />
          </p>
          <p className="msg">
            <Translate
              zh_hant="建議封面尺寸超過 688 x 360 像素"
              zh_hans="建议封面尺寸超过 688 x 360 像素"
            />
          </p>
        </header>

        <AvatarUploader
          type="circle"
          circle={circle}
          onUpload={(assetId) => setFieldValue('avatar', assetId)}
          entityId={circle.id}
        />
      </section>

      <Form.Textarea
        label={<Translate zh_hant="圍爐描述" zh_hans="围炉描述" />}
        name="description"
        required
        placeholder={translate({
          zh_hant: '說說圍爐的有趣之處，吸引支持者加入',
          zh_hans: '说说围炉的有趣之处，吸引支持者加入',
          lang,
        })}
        hint={<Translate id="hintDescription" />}
        value={values.description}
        error={touched.description && errors.description}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <style jsx>{styles}</style>
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      text={<Translate id="done" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton />}
          right={
            <>
              <Layout.Header.Title id="circleCreation" />
              {SubmitButton}
            </>
          }
        />
        {InnerForm}
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="circleCreation"
          close={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Init
