import classNames from 'classnames'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext, useId } from 'react'

import {
  parseFormSubmitErrors,
  translate,
  validateComparedPassword,
  validatePassword,
} from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  Layout,
  Translate,
  useMutation,
} from '~/components'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'
import {
  ConfirmVerificationCodeMutation,
  ResetPasswordMutation,
} from '~/gql/graphql'

import styles from '../styles.module.css'

interface FormProps {
  email: string
  code: string
  type: 'forget' | 'change'
  purpose: 'dialog' | 'page'
  submitCallback: () => void
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

const Confirm: React.FC<FormProps> = ({
  email,
  code,
  type,
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const [confirm] = useMutation<ConfirmVerificationCodeMutation>(
    CONFIRM_CODE,
    undefined,
    { showToast: false }
  )
  const [reset] = useMutation<ResetPasswordMutation>(
    RESET_PASSWORD,
    undefined,
    {
      showToast: false,
    }
  )
  const { lang } = useContext(LanguageContext)

  const isForget = type === 'forget'
  const isInPage = purpose === 'page'
  const formId = useId()
  const titleId = isForget ? 'resetPassword' : 'changePassword'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
      comparedPassword: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ password, comparedPassword }) =>
      _pickBy({
        password: validatePassword(password, lang),
        comparedPassword: validateComparedPassword(
          password,
          comparedPassword,
          lang
        ),
      }),
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        // verify email
        let codeId = ''
        const { data } = await confirm({
          variables: { input: { email, type: 'password_reset', code } },
        })

        codeId = data?.confirmVerificationCode || ''

        // finish password resetting
        await reset({
          variables: { input: { password, codeId } },
        })

        setSubmitting(false)

        if (submitCallback) {
          submitCallback()
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        setFieldError('password', messages[codes[0]])
      }
    },
  })

  const containerClasses = classNames({ container: !!isInPage })

  const InnerForm = (
    <section className={containerClasses}>
      <Form id={formId} onSubmit={handleSubmit}>
        <Form.Input
          label={<Translate id="newPassword" />}
          type="password"
          name="password"
          required
          placeholder={translate({ id: 'enterNewPassword', lang })}
          value={values.password}
          error={touched.password && errors.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <Form.Input
          label={<Translate id="newPassword" />}
          type="password"
          name="comparedPassword"
          required
          placeholder={translate({ id: 'enterNewPasswordAgain', lang })}
          value={values.comparedPassword}
          error={touched.comparedPassword && errors.comparedPassword}
          hint={<Translate id="hintPassword" />}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Form>
    </section>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<Translate id="confirm" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.Title id={titleId} />}
          right={
            <>
              <span />
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

export default Confirm
