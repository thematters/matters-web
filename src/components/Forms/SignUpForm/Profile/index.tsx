import { useFormik } from 'formik'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  PageHeader,
  Translate
} from '~/components'
import { useMutation } from '~/components/GQL'

import {
  hasFormError,
  translate,
  validateAvatar,
  validateDescription,
  validateDisplayName
} from '~/common/utils'

import AvatarUploadField from './AvatarUploadField'

import { UpdateUserInfoProfileInit } from './__generated__/UpdateUserInfoProfileInit'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  closeDialog?: () => void
}

interface FormValues {
  avatar: null | string
  displayName: string
  description: string
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfoProfileInit($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      avatar
      info {
        description
      }
    }
  }
`

export const SignUpProfileForm: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog
}) => {
  const [update] = useMutation<UpdateUserInfoProfileInit>(UPDATE_USER_INFO)
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'
  const formId = 'signup-profile-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  } = useFormik<FormValues>({
    initialValues: {
      avatar: null,
      displayName: '',
      description: ''
    },
    validate: ({ avatar, displayName, description }) => {
      return {
        avatar: validateAvatar(avatar, lang),
        displayName: validateDisplayName(displayName, lang),
        description: validateDescription(description, lang)
      }
    },
    onSubmit: async (
      { avatar, displayName, description },
      { props, setSubmitting }: any
    ) => {
      try {
        await update({
          variables: {
            input: {
              displayName,
              description,
              ...(avatar ? { avatar } : {})
            }
          }
        })
      } catch (e) {
        // do not block the next step since register is successfully
        console.error(e)
      }

      if (submitCallback) {
        submitCallback()
      }

      setSubmitting(false)
    }
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <AvatarUploadField
        onUpload={assetId => {
          setFieldValue('avatar', assetId)
        }}
      />

      <Form.Input
        label={<Translate id="displayName" />}
        type="text"
        name="displayName"
        required
        placeholder={translate({
          id: 'enterDisplayName',
          lang
        })}
        value={values.displayName}
        error={touched.displayName && errors.displayName}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Textarea
        label={<Translate id="userProfile" />}
        name="description"
        required
        placeholder={translate({
          zh_hant: '介紹你自己，獲得更多社區關注',
          zh_hans: '介绍你自己，获得更多社区关注',
          lang
        })}
        hint={<Translate id="descriptionHint" />}
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
      disabled={!hasFormError(errors) || isSubmitting}
      onClick={handleSubmit}
      text={<Translate id="nextStep" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <PageHeader title={<Translate id="userProfile" />} hasNoBorder>
          {SubmitButton}
        </PageHeader>

        {InnerForm}
      </>
    )
  }
  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title={<Translate id="userProfile" />}
          close={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  )
}
