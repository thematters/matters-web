import classNames from 'classnames'
import { useFormik } from 'formik'
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
  redirectToTarget,
  translate,
  validateEmail
} from '~/common/utils'

import styles from './styles.css'

import { UserLogin } from './__generated__/UserLogin'

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

const LoginForm: React.FC<FormProps> = ({
  extraClass = [],
  purpose,
  submitCallback,
  scrollLock
}) => {
  const [login] = useMutation<UserLogin>(USER_LOGIN)
  const { lang } = useContext(LanguageContext)
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
      email: '',
      password: ''
    },
    validate: ({ email }) => {
      const isInvalidEmail = validateEmail(email, lang, { allowPlusSign: true })

      return {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {})
      }
    },
    onSubmit: async ({ email, password }, { setErrors, setSubmitting }) => {
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
  })

  const formClass = classNames('form', ...extraClass)
  const isInModal = purpose === 'modal'
  const isInPage = purpose === 'page'

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <Modal.Content scrollLock={scrollLock}>
        <Form.Input
          type="email"
          field="email"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterEmail,
            zh_hans: TEXT.zh_hans.enterEmail,
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <Form.Input
          type="password"
          field="password"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterPassword,
            zh_hans: TEXT.zh_hans.enterPassword,
            lang
          })}
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

export default LoginForm
