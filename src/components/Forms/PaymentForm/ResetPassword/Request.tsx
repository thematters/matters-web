import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  parseFormSubmitErrors,
  translate,
  validateCode,
  validateEmail,
} from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  Translate,
  useMutation,
  VerificationSendCodeButton,
} from '~/components'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'
import { ConfirmVerificationCodeMutation } from '~/gql/graphql'

interface FormProps {
  defaultEmail: string
  submitCallback?: (params: any) => void
  closeDialog?: () => any
  back?: () => void
}

interface FormValues {
  email: string
  code: string
}

const Request: React.FC<FormProps> = ({
  defaultEmail = '',
  submitCallback,
  closeDialog,
  back,
}) => {
  const [confirmCode] = useMutation<ConfirmVerificationCodeMutation>(
    CONFIRM_CODE,
    undefined,
    { showToast: false }
  )

  const intl = useIntl()
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
  } = useFormik<FormValues>({
    initialValues: {
      email: defaultEmail,
      code: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
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

        const [messages, codes] = parseFormSubmitErrors(error as any)
        codes.forEach((code) => {
          if (code.includes('CODE_')) {
            setFieldError('code', intl.formatMessage(messages[code]))
          } else {
            setFieldError('email', intl.formatMessage(messages[code]))
          }
        })
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<Translate id="email" />}
        hasLabel
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
        spacingBottom="base"
      />

      <Form.Input
        label={<Translate id="verificationCode" />}
        hasLabel
        type="text"
        name="code"
        required
        placeholder={translate({ id: 'enterVerificationCode', lang })}
        hint={translate({ id: 'hintVerificationCode', lang })}
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
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      text={<FormattedMessage defaultMessage="Next Step" id="8cv9D4" />}
      type="submit"
      form={formId}
      disabled={isSubmitting}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Reset Payment Password"
            id="+OStJM"
          />
        }
        closeDialog={closeDialog}
        leftBtn={
          back ? (
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              onClick={back}
            />
          ) : undefined
        }
        rightBtn={SubmitButton}
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={
                back ? (
                  <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                ) : (
                  <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                )
              }
              color="greyDarker"
              onClick={back || closeDialog}
            />

            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default Request
