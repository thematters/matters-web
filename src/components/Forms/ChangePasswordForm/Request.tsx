import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import { Dialog, Form, LanguageContext, Layout, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import SEND_CODE from '~/components/GQL/mutations/sendCode'

import { parseFormSubmitErrors, translate, validateEmail } from '~/common/utils'

import { SendVerificationCode } from '~/components/GQL/mutations/__generated__/SendVerificationCode'

interface FormProps {
  defaultEmail?: string
  type: 'forget' | 'change'
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
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
}) => {
  const { lang } = useContext(LanguageContext)

  const isForget = type === 'forget'
  const isInPage = purpose === 'page'
  const formId = `password-change-request-form`
  const titleId = isForget ? 'resetPassword' : 'changePassword'
  const redirectPath = isForget ? '/forget' : '/me/settings/change-password'

  const [sendCode] = useMutation<SendVerificationCode>(SEND_CODE)

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
    },
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

        submitCallback()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('email', messages[codes[0]])
      }

      setSubmitting(false)
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
          id: isForget ? 'enterRegisteredEmail' : 'enterEmail',
          lang,
        })}
        value={values.email}
        error={touched.email && errors.email}
        disabled={!!defaultEmail}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      text={<Translate id="nextStep" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton />}
          right={
            <>
              <Layout.Header.Title id={titleId} />
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
          close={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Request
