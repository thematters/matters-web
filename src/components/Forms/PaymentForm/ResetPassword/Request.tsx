import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Translate,
  VerificationSendCodeButton,
} from '~/components'
import { useMutation } from '~/components/GQL'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'

import {
  parseFormSubmitErrors,
  translate,
  validateCode,
  validateEmail,
} from '~/common/utils'

import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'

interface FormProps {
  defaultEmail: string
  submitCallback?: (params: any) => void
}

interface FormValues {
  email: string
  code: string
}

const Request: React.FC<FormProps> = ({
  defaultEmail = '',
  submitCallback,
}) => {
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const { lang } = useContext(LanguageContext)

  const formId = `payment-password-reset-request-form`

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
      email: defaultEmail,
      code: '',
    },
    validate: ({ email, code }) =>
      _pickBy({
        email: validateEmail(email, lang, { allowPlusSign: true }),
        code: validateCode(code, lang),
      }),
    onSubmit: async ({ email, code }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await confirmCode({
          variables: { input: { email, type: 'payment_password_reset', code } },
        })
        const confirmVerificationCode = data?.confirmVerificationCode

        setSubmitting(false)

        if (submitCallback && confirmVerificationCode) {
          submitCallback({ email, codeId: confirmVerificationCode })
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach((c) => {
          if (c.includes('CODE_')) {
            setFieldError('code', messages[c])
          } else {
            setFieldError('email', messages[c])
          }
        })
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<Translate id="email" />}
        type="email"
        name="email"
        required
        placeholder={translate({
          id: 'enterEmail',
          lang,
        })}
        value={values.email}
        error={touched.email && errors.email}
        disabled={!!defaultEmail}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Input
        label={<Translate id="verificationCode" />}
        type="text"
        name="code"
        required
        placeholder={translate({ id: 'enterVerificationCode', lang })}
        value={values.code}
        error={touched.code && errors.code}
        onBlur={handleBlur}
        onChange={handleChange}
        extraButton={
          <VerificationSendCodeButton
            email={values.email}
            type="payment_password_reset"
            disabled={!!errors.email}
          />
        }
        autoFocus
      />
    </Form>
  )

  return (
    <>
      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          form={formId}
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          <Translate id="nextStep" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Request
