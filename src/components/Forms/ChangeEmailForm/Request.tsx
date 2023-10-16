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
  Layout,
  Translate,
  useMutation,
  VerificationSendCodeButton,
} from '~/components'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'
import { ConfirmVerificationCodeMutation } from '~/gql/graphql'

interface FormProps {
  defaultEmail: string
  purpose: 'dialog' | 'page'
  submitCallback?: (codeId: string) => void
  closeDialog?: () => void
}

interface FormValues {
  email: string
  code: string
}

const Request: React.FC<FormProps> = ({
  defaultEmail = '',
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const intl = useIntl()
  const [confirmCode] =
    useMutation<ConfirmVerificationCodeMutation>(CONFIRM_CODE)
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'
  const formId = 'change-email-request-form'

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
          variables: { input: { email, type: 'email_reset', code } },
        })
        const confirmVerificationCode = data?.confirmVerificationCode

        setSubmitting(false)

        if (submitCallback && confirmVerificationCode) {
          submitCallback(confirmVerificationCode)
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
        disabled
        required
        value={values.email}
        error={touched.email && errors.email}
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
            type="email_reset"
            disabled={!!errors.email}
          />
        }
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<FormattedMessage defaultMessage="Next Step" id="8cv9D4" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.Title id="changeEmail" />}
          right={
            <>
              <span />
              <Layout.Header.RightButton
                type="submit"
                form={formId}
                disabled={isSubmitting}
                text={
                  <FormattedMessage defaultMessage="Next Step" id="8cv9D4" />
                }
                loading={isSubmitting}
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
        title="changeEmail"
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

export default Request
