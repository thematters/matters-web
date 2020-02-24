import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  PageHeader,
  Translate
} from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'
import {
  translate,
  validateComparedPassword,
  validatePassword
} from '~/common/utils'

import { ResetPassword } from './__generated__/ResetPassword'

interface FormProps {
  codeId: string
  type: 'forget' | 'change'
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  closeDialog?: () => void
}

interface FormValues {
  password: string
  comparedPassword: string
}

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`

export const PasswordChangeConfirmForm: React.FC<FormProps> = ({
  codeId,
  type,
  purpose,
  submitCallback,
  closeDialog
}) => {
  const [reset] = useMutation<ResetPassword>(RESET_PASSWORD)
  const { lang } = useContext(LanguageContext)

  const isForget = type === 'forget'
  const isInPage = purpose === 'page'
  const formId = 'password-change-confirm-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
      comparedPassword: ''
    },
    validate: ({ password, comparedPassword }) => {
      return {
        password: validatePassword(password, lang),
        comparedPassword: validateComparedPassword(
          password,
          comparedPassword,
          lang
        )
      }
    },
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await reset({
          variables: { input: { password, codeId } }
        })
        const resetPassword = data?.resetPassword

        if (submitCallback && resetPassword) {
          submitCallback()
        }
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })
        setFieldError('password', errorMessage)
      }

      setSubmitting(false)
    }
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={
          <Translate
            zh_hant={TEXT.zh_hant.password}
            zh_hans={TEXT.zh_hans.password}
          />
        }
        type="password"
        name="password"
        required
        placeholder={translate({
          zh_hant: TEXT.zh_hant.enterPassword,
          zh_hans: TEXT.zh_hans.enterPassword,
          lang
        })}
        value={values.password}
        error={touched.password && errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Input
        label={
          <Translate
            zh_hant={TEXT.zh_hant.newPassword}
            zh_hans={TEXT.zh_hans.newPassword}
          />
        }
        type="password"
        name="comparedPassword"
        required
        placeholder={translate({
          zh_hant: TEXT.zh_hant.enterPasswordAgain,
          zh_hans: TEXT.zh_hans.enterPasswordAgain,
          lang
        })}
        value={values.comparedPassword}
        error={touched.comparedPassword && errors.comparedPassword}
        hint={
          <Translate
            zh_hant={TEXT.zh_hant.passwordHint}
            zh_hans={TEXT.zh_hans.passwordHint}
          />
        }
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!_isEmpty(errors) || isSubmitting}
      text={
        <Translate
          zh_hant={TEXT.zh_hant.confirm}
          zh_hans={TEXT.zh_hans.confirm}
        />
      }
      loading={isSubmitting}
    />
  )

  const Title = isForget ? (
    <Translate
      zh_hant={TEXT.zh_hant.resetPassword}
      zh_hans={TEXT.zh_hans.resetPassword}
    />
  ) : (
    <Translate
      zh_hant={TEXT.zh_hant.changePassword}
      zh_hans={TEXT.zh_hans.changePassword}
    />
  )

  if (isInPage) {
    return (
      <>
        <PageHeader title={Title} hasNoBorder>
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
          title={Title}
          close={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content spacing={[0, 0]}>{InnerForm}</Dialog.Content>
    </>
  )
}
