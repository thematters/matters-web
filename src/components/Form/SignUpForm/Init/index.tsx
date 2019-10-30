import classNames from 'classnames'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import Link from 'next/link'
import { useContext } from 'react'

import { Form } from '~/components/Form'
import SendCodeButton from '~/components/Form/Button/SendCode'
import { getErrorCodes, useMutation } from '~/components/GQL'
import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { ModalSwitch } from '~/components/ModalManager'

import { ANALYTICS_EVENTS, PATHS, TEXT } from '~/common/enums'
import {
  analytics,
  appendTarget,
  isValidEmail,
  isValidPassword,
  isValidUserName,
  translate
} from '~/common/utils'

import { UserRegister } from './__generated__/UserRegister'
import styles from './styles.css'

/**
 * This component is designed for sign up form with builtin mutation.
 *
 * Usage:
 *
 * ```jsx
 *   <SignUpInitForm
 *     defaultEmail={''}
 *     extraClass={[]}
 *     purpose="modal"
 *     submitCallback={()=> {}}
 *   />
 * ```
 *
 */
interface FormProps {
  defaultEmail?: string
  extraClass?: string[]
  purpose: 'modal' | 'page'
  submitCallback?: (params: any) => void
  scrollLock?: boolean
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

const validateEmail = (value: string, lang: Language) => {
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
const validateCode = (value: string, lang: Language) => {
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
const validateUserName = (value: string, lang: Language) => {
  let result

  if (!value) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  } else if (!isValidUserName(value)) {
    result = {
      zh_hant: TEXT.zh_hant.userNameHint,
      zh_hans: TEXT.zh_hans.userNameHint
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}
const validatePassword = (value: string, lang: Language) => {
  let result

  if (!value) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  } else if (!isValidPassword(value)) {
    result = {
      zh_hant: TEXT.zh_hant.passwordHint,
      zh_hans: TEXT.zh_hans.passwordHint
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}
const validateToS = (value: boolean, lang: Language) => {
  let result

  if (value === false) {
    result = { zh_hant: '請勾選', zh_hans: '请勾选' }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}

const LoginModalSwitch = () => (
  <ModalSwitch modalId="loginModal">
    {(open: any) => (
      <Modal.FooterButton onClick={open} bgColor="white">
        <Translate zh_hant="已有帳號？" zh_hans="已有帐号？" />
      </Modal.FooterButton>
    )}
  </ModalSwitch>
)

const LoginRedirection = () => (
  <Modal.FooterButton
    is="link"
    {...appendTarget(PATHS.AUTH_LOGIN)}
    bgColor="white"
  >
    <Translate zh_hant="已有帳號？" zh_hans="已有帐号？" />
  </Modal.FooterButton>
)

export const SignUpInitForm: React.FC<FormProps> = formProps => {
  const [confirm] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const [register] = useMutation<UserRegister>(USER_REGISTER)
  const { lang } = useContext(LanguageContext)
  const {
    defaultEmail = '',
    extraClass = [],
    purpose,
    submitCallback,
    scrollLock
  } = formProps
  const isInModal = purpose === 'modal'
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
      const isInvalidEmail = validateEmail(email, lang)
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
        const codeId = data && data.confirmVerificationCode

        await register({
          variables: {
            input: { email, codeId, userName, displayName: userName, password }
          }
        })

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
        setFieldError('code', errorMessage)
      }

      setSubmitting(false)
      analytics.identifyUser()
      analytics.trackEvent(ANALYTICS_EVENTS.SIGNUP_SUCCESS)
    }
  })

  const formClass = classNames('form', ...extraClass)

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <Modal.Content scrollLock={scrollLock}>
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
            <span>
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
            </span>
          </Form.CheckBox>
        </div>
      </Modal.Content>

      <div className="buttons">
        {isInModal && <LoginModalSwitch />}
        {isInPage && <LoginRedirection />}

        <Modal.FooterButton
          htmlType="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
        >
          <Translate
            zh_hant={TEXT.zh_hant.nextStep}
            zh_hans={TEXT.zh_hans.nextStep}
          />
        </Modal.FooterButton>
      </div>

      <style jsx>{styles}</style>
    </form>
  )
}
