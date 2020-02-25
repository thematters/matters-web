import { useFormik } from 'formik'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  SendCodeButton,
  Translate
} from '~/components'
import { useMutation } from '~/components/GQL'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'

import { TEXT } from '~/common/enums'
import {
  filterFormErrors,
  hasFormError,
  parseFormSubmitErrors,
  translate,
  validateCode,
  validateEmail
} from '~/common/utils'

import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'

interface FormProps {
  defaultEmail: string
  submitCallback?: (codeId: string) => void
  closeDialog: () => void
}

interface FormValues {
  email: string
  code: string
}

const Request: React.FC<FormProps> = ({
  defaultEmail = '',
  submitCallback,
  closeDialog
}) => {
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const { lang } = useContext(LanguageContext)
  const formId = 'change-email-request-form'

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
      email: defaultEmail,
      code: ''
    },
    validate: ({ email, code }) =>
      filterFormErrors({
        email: validateEmail(email, lang, { allowPlusSign: true }),
        code: validateCode(code, lang)
      }),
    onSubmit: async ({ email, code }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await confirmCode({
          variables: { input: { email, type: 'email_reset', code } }
        })
        const confirmVerificationCode = data?.confirmVerificationCode

        if (submitCallback && confirmVerificationCode) {
          submitCallback(confirmVerificationCode)
        }
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach(c => {
          if (c.includes('CODE_')) {
            setFieldError('code', messages[c])
          } else {
            setFieldError('email', messages[c])
          }
        })
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
        disabled
        required
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
        value={values.code}
        error={touched.code && errors.code}
        onBlur={handleBlur}
        onChange={handleChange}
        extraButton={
          <SendCodeButton
            email={values.email}
            type="email_reset"
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
          zh_hant={TEXT.zh_hant.nextStep}
          zh_hans={TEXT.zh_hans.nextStep}
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

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  )
}

export default Request
