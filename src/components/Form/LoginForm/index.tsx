import classNames from 'classnames'
import { FormikProps, withFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import { getErrorCodes, useMutation } from '~/components/GQL'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { ModalSwitch } from '~/components/ModalManager'

import {
  ADD_TOAST,
  ANALYTICS_EVENTS,
  ERROR_CODES,
  PATHS,
  TEXT
} from '~/common/enums'
import {
  analytics,
  // clearPersistCache,
  appendTarget,
  isValidEmail,
  redirectToTarget,
  translate
} from '~/common/utils'

import { UserLogin } from './__generated__/UserLogin'
import styles from './styles.css'

/**
 * This component is designed for Login form with builtin mutation.
 *
 * Usage:
 *
 * ```jsx
 *   <LoginForm
 *     extraClass={[]}
 *     purpose="modal"
 *     submitCallback={()=> {}}
 *   />
 * ```
 *
 */
interface FormProps {
  extraClass?: string[]
  purpose: 'modal' | 'page'
  submitCallback?: () => void
  scrollLock?: boolean
}

interface FormValues {
  email: string
  password: ''
}

export const USER_LOGIN = gql`
  mutation UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      auth
    }
  }
`

const PasswordResetRedirectButton = () => (
  <>
    <Button
      is="link"
      bgColor="transparent"
      className="u-link-green"
      spacing="none"
      {...appendTarget(PATHS.AUTH_FORGET)}
    >
      <Translate
        zh_hant={TEXT.zh_hant.forgetPassword}
        zh_hans={TEXT.zh_hans.forgetPassword}
      />
      ？
    </Button>

    <style jsx>{styles}</style>
  </>
)

const PasswordResetModalSwitch = () => (
  <ModalSwitch modalId="passwordResetModal">
    {(open: any) => (
      <Button
        is="button"
        bgColor="transparent"
        className="u-link-green"
        spacing="none"
        onClick={open}
      >
        <Translate
          zh_hant={TEXT.zh_hant.forgetPassword}
          zh_hans={TEXT.zh_hans.forgetPassword}
        />
        ？
      </Button>
    )}
  </ModalSwitch>
)

const SignUpModalSwitch = () => (
  <ModalSwitch modalId="signUpModal">
    {(open: any) => (
      <Modal.FooterButton onClick={open} bgColor="white">
        <Translate zh_hant="沒有帳號？" zh_hans="沒有帐号？" />
      </Modal.FooterButton>
    )}
  </ModalSwitch>
)

const SignUpRedirection = () => (
  <Modal.FooterButton
    is="link"
    {...appendTarget(PATHS.AUTH_SIGNUP)}
    bgColor="white"
  >
    <Translate zh_hant="沒有帳號？" zh_hans="沒有帐号？" />
  </Modal.FooterButton>
)

const LoginForm: React.FC<FormProps> = formProps => {
  const [login] = useMutation<UserLogin>(USER_LOGIN)
  const { lang } = useContext(LanguageContext)
  const { extraClass = [], purpose, submitCallback, scrollLock } = formProps
  const isInModal = purpose === 'modal'
  const isInPage = purpose === 'page'

  const validateEmail = (value: string) => {
    let result

    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (!isValidEmail(value)) {
      result = {
        zh_hant: TEXT.zh_hant.invalidEmail,
        zh_hans: TEXT.zh_hans.invalidEmail
      }
    }
    if (result) {
      return translate({ ...result, lang })
    }
  }
  const validatePassword = (value: string) => {
    let result

    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    }

    if (result) {
      return translate({ ...result, lang })
    }
  }

  const InnerForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  }: FormikProps<FormValues>) => {
    const formClass = classNames('form', ...extraClass)
    const emailPlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterEmail,
      zh_hans: TEXT.zh_hans.enterEmail,
      lang
    })
    const passwordPlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterPassword,
      zh_hans: TEXT.zh_hans.enterPassword,
      lang
    })

    return (
      <form className={formClass} onSubmit={handleSubmit}>
        <Modal.Content scrollLock={scrollLock}>
          <Form.Input
            type="email"
            field="email"
            placeholder={emailPlaceholder}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <Form.Input
            type="password"
            field="password"
            placeholder={passwordPlaceholder}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          {isInModal && <PasswordResetModalSwitch />}
          {isInPage && <PasswordResetRedirectButton />}
        </Modal.Content>

        <div className="buttons">
          {isInModal && <SignUpModalSwitch />}
          {isInPage && <SignUpRedirection />}

          <Modal.FooterButton
            htmlType="submit"
            disabled={!_isEmpty(errors) || isSubmitting}
            loading={isSubmitting}
          >
            <Translate
              zh_hant={TEXT.zh_hant.login}
              zh_hans={TEXT.zh_hans.login}
            />
          </Modal.FooterButton>
        </div>

        <style jsx>{styles}</style>
      </form>
    )
  }

  const MainForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({
      email: '',
      password: ''
    }),

    validate: ({ email, password }) => {
      const isInvalidEmail = validateEmail(email)
      const isInvalidPassword = validatePassword(password)
      const errors = {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidPassword ? { password: isInvalidPassword } : {})
      }
      return errors
    },

    handleSubmit: async (values, { setErrors, setSubmitting }) => {
      const { email, password } = values

      try {
        await login({ variables: { input: { email, password } } })

        if (submitCallback) {
          submitCallback()
        }

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate
                  zh_hant={TEXT.zh_hant.loginSuccess}
                  zh_hans={TEXT.zh_hans.loginSuccess}
                />
              )
            }
          })
        )
        analytics.identifyUser()
        analytics.trackEvent(ANALYTICS_EVENTS.LOG_IN)

        // await clearPersistCache()

        redirectToTarget({
          fallback: !!isInPage ? 'homepage' : 'current'
        })
      } catch (error) {
        const errorCodes = getErrorCodes(error)

        if (errorCodes.indexOf(ERROR_CODES.USER_EMAIL_NOT_FOUND) >= 0) {
          setErrors({
            email: translate({
              zh_hant: TEXT.zh_hant.error.USER_EMAIL_NOT_FOUND,
              zh_hans: TEXT.zh_hans.error.USER_EMAIL_NOT_FOUND,
              lang
            })
          })
        } else if (errorCodes.indexOf(ERROR_CODES.USER_PASSWORD_INVALID) >= 0) {
          setErrors({
            password: translate({
              zh_hant: TEXT.zh_hant.error.USER_PASSWORD_INVALID,
              zh_hans: TEXT.zh_hans.error.USER_PASSWORD_INVALID,
              lang
            })
          })
        } else {
          setErrors({
            email: translate({
              zh_hant: TEXT.zh_hant.error.UNKNOWN_ERROR,
              zh_hans: TEXT.zh_hans.error.UNKNOWN_ERROR,
              lang
            })
          })
        }

        analytics.trackEvent(ANALYTICS_EVENTS.LOG_IN_FAILED, {
          email,
          error
        })
      }

      setSubmitting(false)
    }
  })(InnerForm)

  return <MainForm {...formProps} />
}

export default LoginForm
