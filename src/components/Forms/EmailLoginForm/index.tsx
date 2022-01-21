import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  LanguageSwitch,
  Layout,
  Translate,
  useMutation,
} from '~/components'

import { ADD_TOAST, STORAGE_KEY_AUTH_TOKEN } from '~/common/enums'
import {
  analytics,
  // clearPersistCache,
  parseFormSubmitErrors,
  redirectToTarget,
  storage,
  translate,
  validateEmail,
  validatePassword,
} from '~/common/utils'

import {
  EmailSignUpDialogButton,
  PasswordResetDialogButton,
  PasswordResetRedirectButton,
} from './Buttons'
import styles from './styles.css'

import { UserLogin } from './__generated__/UserLogin'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  gotoResetPassword?: () => void
  gotoEmailSignUp?: () => void
  closeDialog?: () => void
  back?: () => void
}

interface FormValues {
  email: string
  password: ''
}

const isStaticBuild = process.env.NEXT_PUBLIC_BUILD_TYPE === 'static'

export const USER_LOGIN = gql`
  mutation UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      auth
      token
    }
  }
`

export const EmailLoginForm: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  gotoEmailSignUp,
  gotoResetPassword,
  closeDialog,
  back,
}) => {
  const [login] = useMutation<UserLogin>(USER_LOGIN, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)

  const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'
  const formId = 'email-login-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: ({ email, password }) =>
      _pickBy({
        email: validateEmail(email, lang, { allowPlusSign: true }),
        password: validatePassword(password, lang),
      }),
    onSubmit: async ({ email, password }, { setFieldError, setSubmitting }) => {
      try {
        const result = await login({
          variables: { input: { email, password } },
        })

        if (submitCallback) {
          submitCallback()
        }

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <Translate id="successLogin" />,
            },
          })
        )
        analytics.identifyUser()

        const token = result.data?.userLogin.token

        // security discussion see: https://github.com/apollographql/apollo-feature-requests/issues/149
        if (isStaticBuild && token) {
          storage.set(STORAGE_KEY_AUTH_TOKEN, token)
        }

        setSubmitting(false)
        redirectToTarget({
          fallback: !!isInPage ? 'homepage' : 'current',
        })
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach((code) => {
          if (code.includes('USER_EMAIL_')) {
            setFieldError('email', messages[code])
          } else if (code.indexOf('USER_PASSWORD_') >= 0) {
            setFieldError('password', messages[code])
          } else {
            setFieldError('email', messages[code])
          }
        })
        setSubmitting(false)
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
        placeholder={translate({ id: 'enterEmail', lang })}
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Input
        label={<Translate id="password" />}
        type="password"
        name="password"
        required
        placeholder={translate({ id: 'enterPassword', lang })}
        value={values.password}
        error={touched.password && errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        extraButton={
          <>
            {isInDialog && gotoResetPassword && (
              <PasswordResetDialogButton
                gotoResetPassword={gotoResetPassword}
              />
            )}
            {isInPage && <PasswordResetRedirectButton />}
          </>
        }
      />

      {gotoEmailSignUp && (
        <EmailSignUpDialogButton gotoEmailSignUp={gotoEmailSignUp} />
      )}
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      text={<Translate id="confirm" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton onClick={back} />}
          right={
            <>
              <Layout.Header.Title id="login" />
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
          title="login"
          leftButton={back ? <Dialog.Header.BackButton onClick={back} /> : null}
          closeDialog={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}
