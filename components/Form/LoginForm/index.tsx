import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { FC, useContext } from 'react'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import { getErrorCodes, Mutation } from '~/components/GQL'
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
  isValidEmail,
  redirectToTarget,
  translate
} from '~/common/utils'

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
interface Props {
  extraClass?: string[]
  purpose: 'modal' | 'page'
  submitCallback?: () => void
  scrollLock?: boolean
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
      href={PATHS.AUTH_FORGET.href}
      as={PATHS.AUTH_FORGET.as}
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
  <Modal.FooterButton is="link" {...PATHS.AUTH_SIGNUP} bgColor="white">
    <Translate zh_hant="沒有帳號？" zh_hans="沒有帐号？" />
  </Modal.FooterButton>
)

const LoginForm: FC<Props> = ({
  extraClass = [],
  purpose,
  submitCallback,
  scrollLock
}) => {
  const { lang } = useContext(LanguageContext)
  const isInModal = purpose === 'modal'
  const isInPage = purpose === 'page'

  const validateEmail = (value: string, language: string) => {
    let result: any

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
      return translate({ ...result, lang: language })
    }
  }

  const validatePassword = (value: string, language: string) => {
    let result: any

    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const BaseForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  }: {
    [key: string]: any
  }) => {
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

    const loginText = translate({
      zh_hant: TEXT.zh_hant.login,
      zh_hans: TEXT.zh_hans.login,
      lang
    })

    return (
      <>
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
            >
              {loginText}
            </Modal.FooterButton>
          </div>
        </form>
        <style jsx>{styles}</style>
      </>
    )
  }

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      email: '',
      password: ''
    }),

    validate: ({ email, password }) => {
      const isInvalidEmail = validateEmail(email, lang)
      const isInvalidPassword = validatePassword(password, lang)
      const errors = {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidPassword ? { password: isInvalidPassword } : {})
      }
      return errors
    },

    handleSubmit: (values, { props, setErrors, setSubmitting }: any) => {
      const { email, password } = values
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }
      submitAction({ variables: { input: { email, password } } })
        .then(async (result: any) => {
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
            defaultTarget: !!isInPage ? 'homepage' : 'current'
          })
        })
        .catch((error: any) => {
          const errorCodes = getErrorCodes(error)

          if (errorCodes.indexOf(ERROR_CODES.USER_EMAIL_NOT_FOUND) >= 0) {
            setErrors({
              email: translate({
                zh_hant: TEXT.zh_hant.error.USER_EMAIL_NOT_FOUND,
                zh_hans: TEXT.zh_hans.error.USER_EMAIL_NOT_FOUND,
                lang
              })
            })
          } else if (
            errorCodes.indexOf(ERROR_CODES.USER_PASSWORD_INVALID) >= 0
          ) {
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
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(BaseForm)

  return (
    <>
      <Mutation mutation={USER_LOGIN}>
        {login => <MainForm submitAction={login} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}

export default LoginForm
