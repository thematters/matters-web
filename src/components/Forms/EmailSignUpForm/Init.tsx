import classNames from 'classnames'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import Link from 'next/link'
import { useContext, useId } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { PATHS } from '~/common/enums'
import {
  parseFormSubmitErrors,
  validateDisplayName,
  validateEmail,
  validateToS,
} from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  LanguageSwitch,
  Layout,
  //  ReCaptchaContext,
  useMutation,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import { SendVerificationCodeMutation } from '~/gql/graphql'

import { EmailLoginButton } from './Buttons'
import styles from './styles.css'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  gotoEmailLogin: () => void
  closeDialog?: () => void
  back?: () => void
}

interface FormValues {
  displayName: string
  email: string
  tos: boolean
}

const Init: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  gotoEmailLogin,
  closeDialog,
  back,
}) => {
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'
  const formId = useId()

  // const { token, refreshToken } = useContext(ReCaptchaContext)
  const [sendCode] = useMutation<SendVerificationCodeMutation>(
    SEND_CODE,
    undefined,
    {
      showToast: false,
    }
  )
  const intl = useIntl()
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
      displayName: '',
      email: '',
      tos: true,
    },
    validateOnBlur: false,
    validateOnChange: true, // enable for signup form
    validate: ({ displayName, email, tos }) =>
      _pickBy({
        displayName: validateDisplayName(displayName, lang),
        email: validateEmail(email, lang, { allowPlusSign: false }),
        tos: validateToS(tos, lang),
      }),
    onSubmit: async (
      { displayName, email },
      { setFieldError, setSubmitting }
    ) => {
      const redirectUrl = `${
        window.location.origin
      }/signup?email=${encodeURIComponent(
        email
      )}&displayName=${encodeURIComponent(displayName)}`

      try {
        // reCaptcha check is disabled for now
        await sendCode({
          variables: {
            input: { email, type: 'register', token: '', redirectUrl },
          },
        })

        setSubmitting(false)
        submitCallback()
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        setFieldError('email', messages[codes[0]])

        // if (refreshToken) {
        //   refreshToken()
        // }
      }
    },
  })

  const containerClasses = classNames({ container: true, isInPage: !!isInPage })

  const InnerForm = (
    <section className={containerClasses}>
      <Form id={formId} onSubmit={handleSubmit}>
        <Form.Input
          label={
            <FormattedMessage defaultMessage="Display Name" description="" />
          }
          type="text"
          name="displayName"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Display name, can be changed later',
            description: 'src/components/Forms/EmailSignUpForm/Init.tsx',
          })}
          value={values.displayName}
          error={touched.displayName && errors.displayName}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <Form.Input
          label={<FormattedMessage defaultMessage="Email" description="" />}
          type="email"
          name="email"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Email',
            description: '',
          })}
          value={values.email}
          error={touched.email && errors.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <Form.CheckBox
          name="tos"
          checked={values.tos}
          error={touched.tos && errors.tos}
          onChange={handleChange}
          hint={
            <>
              <FormattedMessage
                defaultMessage="I have read and agree to"
                description=""
              />
              <Link href={PATHS.TOS} legacyBehavior>
                <a className="u-link-green" target="_blank">
                  &nbsp;
                  <FormattedMessage
                    defaultMessage="Terms and Privacy Policy"
                    description=""
                  />
                </a>
              </Link>
            </>
          }
          required
        />

        <EmailLoginButton gotoEmailLogin={gotoEmailLogin} isInPage={isInPage} />
      </Form>
      <style jsx>{styles}</style>
    </section>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<FormattedMessage defaultMessage="Next" description="" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          right={
            <>
              <Layout.Header.Title id="register" />
              {SubmitButton}
            </>
          }
        />

        {InnerForm}

        <footer>
          <LanguageSwitch />
          <style jsx>{styles}</style>
        </footer>
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="register"
          leftButton={back ? <Dialog.Header.BackButton onClick={back} /> : null}
          closeDialog={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Init
