import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { parseFormSubmitErrors, validateEmail } from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  Layout,
  useMutation,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import { SendVerificationCodeMutation } from '~/gql/graphql'

interface FormProps {
  defaultEmail?: string
  type: 'forget' | 'change'
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
  back?: () => void
}

interface FormValues {
  email: string
}

const Request: React.FC<FormProps> = ({
  defaultEmail = '',
  type,
  purpose,
  submitCallback,
  closeDialog,
  back,
}) => {
  const { lang } = useContext(LanguageContext)
  const intl = useIntl()

  const isForget = type === 'forget'
  const isInPage = purpose === 'page'
  const formId = `password-change-request-form`
  const titleId = isForget ? 'resetPassword' : 'changePassword'
  const redirectPath = isForget ? '/forget' : '/me/settings/change-password'

  const [sendCode] = useMutation<SendVerificationCodeMutation>(
    SEND_CODE,
    undefined,
    {
      showToast: false,
    }
  )

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
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ email }) =>
      _pickBy({
        email: validateEmail(email, lang, { allowPlusSign: true }),
      }),
    onSubmit: async ({ email }, { setFieldError, setSubmitting }) => {
      const redirectUrl = `${
        window.location.origin
      }${redirectPath}?email=${encodeURIComponent(email)}`

      try {
        await sendCode({
          variables: { input: { email, type: 'password_reset', redirectUrl } },
        })

        setSubmitting(false)
        submitCallback()
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        setFieldError('email', messages[codes[0]])
      }
    },
  })

  // id: isForget ? 'enterRegisteredEmail' : 'enterEmail',

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<FormattedMessage defaultMessage="Email" />}
        type="email"
        name="email"
        required
        placeholder={
          isForget
            ? intl.formatMessage({
                defaultMessage: 'Enter your email',
              })
            : intl.formatMessage({
                defaultMessage: 'Email',
              })
        }
        value={values.email}
        error={touched.email && errors.email}
        disabled={!!defaultEmail}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<FormattedMessage defaultMessage="Next Step" />}
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
              <Layout.Header.RightButton
                type="submit"
                form={formId}
                disabled={isSubmitting}
                text={<FormattedMessage defaultMessage="Next Step" />}
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
        title={titleId}
        leftBtn={
          back ? (
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" />}
              onClick={back}
            />
          ) : null
        }
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={back ? 'back' : 'cancel'}
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
