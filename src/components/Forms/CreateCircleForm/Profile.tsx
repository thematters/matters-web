import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useRouter } from 'next/router'
import { useId, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IMAGE_CIRCLE_COVER from '@/public/static/images/circle-cover.svg?url'
import {
  ASSET_TYPE,
  ENTITY_TYPE,
  MAX_CIRCLE_DISPLAY_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
} from '~/common/enums'
import {
  parseFormSubmitErrors,
  toPath,
  validateCircleDisplayName,
  validateDescription,
} from '~/common/utils'
import {
  AvatarUploader,
  CoverUploader,
  Dialog,
  Form,
  Layout,
  toast,
  useMutation,
} from '~/components'
import PUT_CIRCLE from '~/components/GQL/mutations/putCircle'
import { PutCircleMutation } from '~/gql/graphql'

import styles from './styles.module.css'

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
  const isInPage = purpose === 'page'
  const isCreate = type === 'create'
  const formId = useId()
  const intl = useIntl()

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
      avatar: UNCHANGED_FIELD,
      cover: UNCHANGED_FIELD,
      displayName: circle.displayName || '',
      description: circle.description || '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ displayName, description }) =>
      _pickBy({
        displayName: !isCreate
          ? validateCircleDisplayName(displayName, intl)
          : undefined,
        description: validateDescription(description, intl),
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

        toast.success({
          message: isCreate ? (
            <FormattedMessage
              defaultMessage="Circle successfully created"
              id="KLQ1/z"
              description="src/components/Forms/CreateCircleForm/Profile.tsx"
            />
          ) : (
            <FormattedMessage defaultMessage="Saved" id="fsB/4p" />
          ),
        })

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

        const [messages, codes] = parseFormSubmitErrors(error as any)
        setFieldError('description', intl.formatMessage(messages[codes[0]]))
      }
    },
  })

  const [avatarLoading, setAvatarLoading] = useState(false)
  const [coverLoading, setCoverLoading] = useState(false)
  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <section className={styles.coverField}>
        <CoverUploader
          type="circle"
          assetType={ASSET_TYPE.circleCover}
          cover={circle.cover}
          fallbackCover={IMAGE_CIRCLE_COVER}
          inEditor
          onUploaded={(assetId) => setFieldValue('cover', assetId)}
          onUploadStart={() => setCoverLoading(true)}
          onUploadEnd={() => setCoverLoading(false)}
          onReset={() => setFieldValue('cover', null)}
          entityType={ENTITY_TYPE.user}
          entityId={circle.id}
        />

        <p className={styles.hint}>
          <FormattedMessage
            defaultMessage="Recommended size: 1600px x 900px"
            id="rfz/fN"
          />
        </p>
      </section>

      <section className={styles.avatarField}>
        <AvatarUploader
          type="circle"
          circle={circle}
          onUploaded={(assetId) => setFieldValue('avatar', assetId)}
          onUploadStart={() => setAvatarLoading(true)}
          onUploadEnd={() => setAvatarLoading(false)}
          entityId={circle.id}
        />
      </section>

      {!isCreate && (
        <Form.Input
          label={<FormattedMessage defaultMessage="Circle Name" id="q9oMKE" />}
          hasLabel
          type="text"
          name="displayName"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Enter the name of your Circle',
            id: 'wXzTZ0',
          })}
          value={values.displayName}
          hint={`${values.displayName.length}/${MAX_CIRCLE_DISPLAY_NAME_LENGTH}`}
          error={touched.displayName && errors.displayName}
          hintAlign={
            touched.displayName && errors.displayName ? 'left' : 'right'
          }
          maxLength={MAX_CIRCLE_DISPLAY_NAME_LENGTH}
          onBlur={handleBlur}
          onChange={handleChange}
          spacingBottom="base"
        />
      )}

      <Form.Textarea
        label={
          <FormattedMessage
            defaultMessage="Circle Description"
            id="m/Wg7b"
            description="src/components/Forms/CreateCircleForm/Profile.tsx"
          />
        }
        hasLabel
        name="description"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Describe more about your Circle',
          id: 'QUqfbW',
          description: 'src/components/Forms/CreateCircleForm/Profile.tsx',
        })}
        value={values.description}
        hint={`${values.description.length}/${MAX_DESCRIPTION_LENGTH}`}
        error={touched.description && errors.description}
        hintAlign={touched.description && errors.description ? 'left' : 'right'}
        maxLength={MAX_DESCRIPTION_LENGTH}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting || coverLoading || avatarLoading}
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      loading={isSubmitting || coverLoading || avatarLoading}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={
            <Layout.Header.Title>
              {isCreate ? (
                <FormattedMessage defaultMessage="Create Circle" id="ESn43O" />
              ) : (
                <FormattedMessage defaultMessage="Edit Circle" id="H8hiL/" />
              )}
            </Layout.Header.Title>
          }
          right={
            <>
              <span />
              <Layout.Header.RightButton
                type="submit"
                form={formId}
                disabled={isSubmitting || coverLoading}
                text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
                loading={isSubmitting || coverLoading}
              />
            </>
          }
        />

        <Layout.Main.Spacing>{InnerForm}</Layout.Main.Spacing>
      </>
    )
  }

  return (
    <>
      <Dialog.Header
        title={
          isCreate ? (
            <FormattedMessage defaultMessage="Create Circle" id="ESn43O" />
          ) : (
            <FormattedMessage defaultMessage="Profile" id="itPgxd" />
          )
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

export default Init
