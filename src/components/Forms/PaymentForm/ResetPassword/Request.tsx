import { ApolloError } from '@apollo/client'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ERROR_CODES, SEND_CODE_COUNTDOWN } from '~/common/enums'
import {
  parseFormSubmitErrors,
  validateCode,
  validateEmail,
} from '~/common/utils'
import {
  Button,
  Dialog,
  Form,
  ResendCodeButton,
  useCountdown,
  useMutation,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'
import {
  ConfirmVerificationCodeMutation,
  SendVerificationCodeMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface FormProps {
  defaultEmail: string
  submitCallback?: (params: { email: string; codeId: string }) => void
  closeDialog?: () => void
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
  const intl = useIntl()

  const [send, { loading: sendingCode }] =
    useMutation<SendVerificationCodeMutation>(SEND_CODE)
  const [sent, setSent] = useState(false)

  const { countdown, setCountdown } = useCountdown(0)

  const [confirmCode] = useMutation<ConfirmVerificationCodeMutation>(
    CONFIRM_CODE,
    undefined,
    { showToast: false }
  )

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
        email: validateEmail(email, intl, { allowPlusSign: true }),
        code: validateCode(code, intl),
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

        const [messages, codes] = parseFormSubmitErrors(error as ApolloError)
        codes.forEach((code) => {
          if (code.includes('CODE_')) {
            let m = intl.formatMessage(messages[code])
            if (code === ERROR_CODES.CODE_INVALID) {
              m = intl.formatMessage({
                defaultMessage: 'Incorrect verification code',
                id: 'R410ei',
                description: 'CODE_INVALID',
              })
            } else if (code === ERROR_CODES.CODE_EXPIRED) {
              m = intl.formatMessage({
                defaultMessage: 'Verification code has expired, please resend.',
                id: 'v5MunN',
                description: 'CODE_EXPIRED',
              })
            }
            setFieldError('code', m)
          } else {
            setFieldError('email', intl.formatMessage(messages[code]))
          }
        })
      }
    },
  })

  const sendCode = async () => {
    // reCaptcha check is disabled for now
    await send({
      variables: {
        input: { email: values.email, type: 'payment_password_reset' },
      },
    })

    setCountdown(SEND_CODE_COUNTDOWN)
    setSent(true)
  }

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        hasLabel
        type="email"
        name="email"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Email',
          description:
            'src/components/Forms/PaymentForm/ResetPassword/Request.tsx',
          id: 'rdxgu4',
        })}
        value={values.email}
        error={touched.email && errors.email}
        disabled={!!defaultEmail}
        onBlur={handleBlur}
        onChange={handleChange}
        spacingBottom="base"
      />

      <Form.Input
        hasLabel
        type="text"
        name="code"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Enter verification code',
          id: 'NSyuEP',
        })}
        hintAlign="center"
        value={values.code}
        error={touched.code && errors.code}
        onBlur={handleBlur}
        onChange={handleChange}
        rightButton={
          <ResendCodeButton
            showCountDown={sent}
            showResendButton={sent}
            disabled={sendingCode || countdown !== 0}
            sendCode={sendCode}
            countdown={countdown}
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
      disabled={isSubmitting || values.code === '' || values.email === ''}
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

      <Dialog.Content>
        <section>{InnerForm}</section>

        <section className={styles.footer}>
          {sent && (
            <section className={styles.sent}>
              <FormattedMessage
                defaultMessage="Verification code has been sent via email and is valid for 20 minutes."
                id="utMaM0"
                description="src/components/Forms/Verification/SendCodeButton/index.tsx"
              />
            </section>
          )}
          {!sent && (
            <Button
              disabled={!values.email || countdown !== 0}
              onClick={sendCode}
              textColor="green"
              textActiveColor="greenDark"
            >
              <FormattedMessage
                defaultMessage="Send the verification code"
                description="src/components/Forms/Verification/SendCodeButton/index.tsx"
                id="ksvOGO"
              />
            </Button>
          )}
        </section>
      </Dialog.Content>

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
