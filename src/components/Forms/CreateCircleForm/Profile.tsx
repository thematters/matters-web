import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import CIRCLE_COVER from '@/public/static/images/circle-cover.svg'
import { ADD_TOAST, ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'
import {
  parseFormSubmitErrors,
  toPath,
  translate,
  validateCircleDisplayName,
  validateDescription,
} from '~/common/utils'
import {
  AvatarUploader,
  CoverUploader,
  Dialog,
  Form,
  LanguageContext,
  Layout,
  Translate,
  useMutation,
} from '~/components'
import PUT_CIRCLE from '~/components/GQL/mutations/putCircle'
import { PutCircleMutation } from '~/gql/graphql'

import styles from './styles.css'

interface FormProps {
  circle: Pick<
    PutCircleMutation['putCircle'],
    'id' | 'avatar' | 'cover' | 'displayName' | 'description' | '__typename'
  >
  type: 'edit' | 'create'
  purpose: 'dialog' | 'page'
  closeDialog?: () => void
}

interface FormValues {
  avatar: string | null
  cover: string | null
  displayName: string
  description: string
}

/**
 * To identify `cover` is changed since it may be `null`
 */
const UNCHANGED_FIELD = 'UNCHANGED_FIELD'

const Init: React.FC<FormProps> = ({ circle, type, purpose, closeDialog }) => {
  const router = useRouter()
  const [update] = useMutation<PutCircleMutation>(PUT_CIRCLE, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'

  const isCreate = type === 'create'
  const formId = 'edit-circle-profile-form'
  const titleId = isCreate ? 'circleCreation' : 'basicProfile'

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
      displayName: circle.displayName || '',
      description: circle.description || '',
    },
    validate: ({ displayName, description }) =>
      _pickBy({
        displayName: !isCreate
          ? validateCircleDisplayName(displayName, lang)
          : undefined,
        description: validateDescription(description, lang),
      }),
    onSubmit: async (
      { avatar, cover, displayName, description },
      { setSubmitting, setFieldError }
    ) => {
      try {
        const { data } = await update({
          variables: {
            input: {
              id: circle.id,
              ...(avatar !== UNCHANGED_FIELD ? { avatar } : {}),
              ...(cover !== UNCHANGED_FIELD ? { cover } : {}),
              ...(!isCreate ? { displayName } : {}),
              description,
            },
          },
        })

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate id={isCreate ? 'circleCreated' : 'circleEdited'} />
              ),
            },
          })
        )

        if (data?.putCircle) {
          const path = toPath({ page: 'circleDetail', circle: data.putCircle })
          router.push(path.href)
        }

        setSubmitting(false)

        if (closeDialog) {
          closeDialog()
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
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

        <p className="hint">
          <Translate id="recommendedCoverSize" />
        </p>
      </section>

      <section className="avatar-field">
        <AvatarUploader
          type="circle"
          circle={circle}
          onUpload={(assetId) => setFieldValue('avatar', assetId)}
          entityId={circle.id}
        />
      </section>

      {!isCreate && (
        <Form.Input
          label={
            <Translate
              zh_hant="圍爐名稱"
              zh_hans="围炉名称"
              en="Name of the Circle"
            />
          }
          type="text"
          name="displayName"
          required
          placeholder={translate({
            zh_hant: '給圍爐取一個吸引人的名字吧',
            zh_hans: '给围炉取一个吸引人的名字吧',
            lang,
          })}
          value={values.displayName}
          error={touched.displayName && errors.displayName}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      )}

      <Form.Textarea
        label={
          <Translate
            zh_hant="圍爐描述"
            zh_hans="围炉描述"
            en="Description of the Circle"
          />
        }
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
              <Layout.Header.Title id={titleId} />
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
          title={titleId}
          closeDialog={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Init
