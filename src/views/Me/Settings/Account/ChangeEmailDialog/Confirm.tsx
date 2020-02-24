import { useFormik } from 'formik'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  SendCodeButton,
  Translate
} from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'

import { TEXT } from '~/common/enums'
import {
  hasFormError,
  translate,
  validateCode,
  validateEmail
} from '~/common/utils'

import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'
import { ChangeEmail } from './__generated__/ChangeEmail'

interface FormProps {
  oldData: { email: string; codeId: string }
  submitCallback: () => void
  closeDialog: () => void
}

interface FormValues {
  email: string
  code: string
}

const CHANGE_EMAIL = gql`
  mutation ChangeEmail($input: ChangeEmailInput!) {
    changeEmail(input: $input) {
      id
      info {
        email
      }
    }
  }
`

const Confirm: React.FC<FormProps> = ({
  oldData,
  submitCallback,
  closeDialog
}) => {
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const [changeEmail] = useMutation<ChangeEmail>(CHANGE_EMAIL)
  const { lang } = useContext(LanguageContext)

  const formId = 'change-email-confirm-form'

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
      email: '',
      code: ''
    },
    validate: ({ email, code }) => {
      return {
        email: validateEmail(email, lang, { allowPlusSign: false }),
        code: validateCode(code, lang)
      }
    },
    onSubmit: async ({ email, code }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await confirmCode({
          variables: { input: { email, type: 'email_reset_confirm', code } }
        })
        const confirmVerificationCode = data?.confirmVerificationCode
        const params = {
          variables: {
            input: {
              oldEmail: oldData.email,
              oldEmailCodeId: oldData.codeId,
              newEmail: email,
              newEmailCodeId: confirmVerificationCode
            }
          }
        }

        await changeEmail(params)

        if (submitCallback) {
          submitCallback()
        }
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })

        if (errorCode.indexOf('CODE_') >= 0) {
          setFieldError('code', errorMessage)
        } else {
          setFieldError('email', errorMessage)
        }
      }

      setSubmitting(false)
    }
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={
          <Translate
            zh_hant={TEXT.zh_hant.email}
            zh_hans={TEXT.zh_hans.email}
          />
        }
        type="email"
        name="email"
        required
        placeholder={translate({
          zh_hant: TEXT.zh_hant.enterNewEmail,
          zh_hans: TEXT.zh_hans.enterNewEmail,
          lang
        })}
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Input
        label={
          <Translate
            zh_hant={TEXT.zh_hant.verificationCode}
            zh_hans={TEXT.zh_hans.verificationCode}
          />
        }
        type="text"
        name="code"
        autoComplete="off"
        required
        placeholder={translate({
          zh_hant: TEXT.zh_hant.enterVerificationCode,
          zh_hans: TEXT.zh_hans.enterVerificationCode,
          lang
        })}
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
        extraButton={
          <SendCodeButton
            email={values.email}
            type="email_reset_confirm"
            disabled={!!errors.email}
          />
        }
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!hasFormError(errors) || isSubmitting}
      text={
        <Translate
          zh_hant={TEXT.zh_hant.confirm}
          zh_hans={TEXT.zh_hans.confirm}
        />
      }
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <Translate
            zh_hant={TEXT.zh_hant.changeEmail}
            zh_hans={TEXT.zh_hans.changeEmail}
          />
        }
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content spacing={[0, 0]}>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Confirm
