import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import Link from 'next/link'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  LoginDialog,
  SendCodeButton,
  Translate
} from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'

import { ANALYTICS_EVENTS, PATHS, TEXT } from '~/common/enums'
import {
  analytics,
  appendTarget,
  translate,
  validateCode,
  validateEmail,
  validatePassword,
  validateToS,
  validateUserName
} from '~/common/utils'

import styles from './styles.css'

import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'
import { UserRegister } from './__generated__/UserRegister'

/**
 * This component is designed for sign up form with builtin mutation.
 *
 * Usage:
 *
 * ```jsx
 *   <SignUpInitForm
 *     defaultEmail={''}
 *     submitCallback={()=> {}}
 *   />
 * ```
 *
 */
interface FormProps {
  defaultEmail?: string
  purpose: 'dialog' | 'page'
  submitCallback?: (params: any) => void
}

interface FormValues {
  email: string
  code: string
  userName: string
  password: string
  tos: boolean
}

const USER_REGISTER = gql`
  mutation UserRegister($input: UserRegisterInput!) {
    userRegister(input: $input) {
      auth
    }
  }
`

const LoginDialogButton = () => (
  <LoginDialog>
    {({ open }) => (
      <Dialog.Footer.Button
        onClick={open}
        bgColor="grey-lighter"
        textColor="black"
      >
        <Translate zh_hant="已有帳號？" zh_hans="已有帐号？" />
      </Dialog.Footer.Button>
    )}
  </LoginDialog>
)

const LoginRedirectionButton = () => (
  <Dialog.Footer.Button
    {...appendTarget(PATHS.AUTH_LOGIN)}
    bgColor="grey-lighter"
    textColor="black"
  >
    <Translate zh_hant="已有帳號？" zh_hans="已有帐号？" />
  </Dialog.Footer.Button>
)

export const SignUpInitForm: React.FC<FormProps> = formProps => {
  const [confirm] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const [register] = useMutation<UserRegister>(USER_REGISTER)
  const { lang } = useContext(LanguageContext)
  const { defaultEmail = '', purpose, submitCallback } = formProps
  const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  } = useFormik<FormValues>({
    initialValues: {
      email: defaultEmail,
      code: '',
      userName: '',
      password: '',
      tos: true
    },
    validate: ({ email, code, userName, password, tos }) => {
      const isInvalidEmail = validateEmail(email, lang, {
        allowPlusSign: false
      })
      const isInvalidCodeId = validateCode(code, lang)
      const isInvalidPassword = validatePassword(password, lang)
      const isInvalidUserName = validateUserName(userName, lang)
      const isInvalidToS = validateToS(tos, lang)
      return {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidCodeId ? { code: isInvalidCodeId } : {}),
        ...(isInvalidUserName ? { userName: isInvalidUserName } : {}),
        ...(isInvalidPassword ? { password: isInvalidPassword } : {}),
        ...(isInvalidToS ? { tos: isInvalidToS } : {})
      }
    },
    onSubmit: async (
      { email, code, userName, password },
      { setFieldError, setSubmitting }
    ) => {
      try {
        const { data } = await confirm({
          variables: { input: { email, code, type: 'register' } }
        })
        const codeId = data?.confirmVerificationCode

        await register({
          variables: {
            input: { email, codeId, userName, displayName: userName, password }
          }
        })

        analytics.identifyUser()
        analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_SUCCESS)

        if (submitCallback) {
          submitCallback({ email, codeId, password })
        }
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })

        if (errorCode.indexOf('CODE_') >= 0) {
          setFieldError('code', errorMessage)
        } else if (errorCode.indexOf('USER_EMAIL_') >= 0) {
          setFieldError('email', errorMessage)
        } else if (errorCode.indexOf('USER_PASSWORD_') >= 0) {
          setFieldError('password', errorMessage)
        } else {
          setFieldError('userName', errorMessage)
        }
        setSubmitting(false)
      }
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <Dialog.Content spacing={['xxxloose', 'xloose']}>
        <Form.Input
          type="email"
          field="email"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.email,
            zh_hans: TEXT.zh_hans.email,
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <Form.Input
          type="text"
          field="code"
          autoComplete="off"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.verificationCode,
            zh_hans: TEXT.zh_hans.verificationCode,
            lang
          })}
          floatElement={
            <SendCodeButton email={values.email} lang={lang} type="register" />
          }
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <Form.Input
          type="text"
          field="userName"
          autoComplete="off"
          placeholder={translate({
            zh_hant: 'Matters ID',
            zh_hans: 'Matters ID',
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          hint={translate({
            zh_hant: TEXT.zh_hant.userNameHint,
            zh_hans: TEXT.zh_hans.userNameHint,
            lang
          })}
        />
        <Form.Input
          type="password"
          field="password"
          autoComplete="off"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.password,
            zh_hans: TEXT.zh_hans.password,
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          hint={translate({
            zh_hant: TEXT.zh_hant.passwordHint,
            zh_hans: TEXT.zh_hans.passwordHint,
            lang
          })}
        />
        <div className="tos">
          <Form.CheckBox
            field="tos"
            values={values}
            errors={errors}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          >
            <>
              <Translate zh_hant="我已閱讀並同意" zh_hans="我已阅读并同意" />

              <Link {...PATHS.MISC_TOS}>
                <a className="u-link-green" target="_blank">
                  {' '}
                  <Translate
                    zh_hant="Matters 用戶協議和隱私政策"
                    zh_hans="Matters 用户协议和隐私政策"
                  />
                </a>
              </Link>
            </>
          </Form.CheckBox>
        </div>
      </Dialog.Content>

      <Dialog.Footer>
        {isInDialog && <LoginDialogButton />}
        {isInPage && <LoginRedirectionButton />}

        <Dialog.Footer.Button
          type="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
        >
          <Translate
            zh_hant={TEXT.zh_hant.nextStep}
            zh_hans={TEXT.zh_hans.nextStep}
          />
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </form>
  )
}
