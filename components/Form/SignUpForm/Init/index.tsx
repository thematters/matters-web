import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import Link from 'next/link'
import { FC, useContext } from 'react'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import SendCodeButton from '~/components/Form/Button/SendCode'
import { getErrorCodes, Mutation } from '~/components/GQL'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext } from '~/components/Language'

import { PATHS, TEXT } from '~/common/enums'
import {
  analytics,
  clearPersistCache,
  isValidDisplayName,
  isValidEmail,
  isValidPassword,
  translate
} from '~/common/utils'

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
interface Props {
  defaultEmail?: string
  extraClass?: string[]
  purpose: 'modal' | 'page'
  submitCallback?: () => void
}

export const MUTATION_USER_REGISTER = gql`
  mutation UserRegister($input: UserRegisterInput!) {
    userRegister(input: $input) {
      auth
    }
  }
`

export const MUTATION_CONFIRM_CODE = gql`
  mutation ConfirmVerificationCode($input: ConfirmVerificationCodeInput!) {
    confirmVerificationCode(input: $input)
  }
`

export const SignUpInitForm: FC<Props> = ({
  defaultEmail = '',
  extraClass = [],
  purpose,
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

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

  const validateCode = (value: string, language: string) => {
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

  const validateDisplayName = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (!isValidDisplayName(value)) {
      result = {
        zh_hant: TEXT.zh_hant.displayNameHint,
        zh_hans: TEXT.zh_hans.displayNameHint
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
    } else if (!isValidPassword(value)) {
      result = {
        zh_hant: TEXT.zh_hant.passwordHint,
        zh_hans: TEXT.zh_hans.passwordHint
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validateComparedPassword = (
    value: string,
    comparedValue: string,
    language: string
  ) => {
    let result: any
    if (!comparedValue) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (comparedValue !== value) {
      result = {
        zh_hant: TEXT.zh_hant.passwordNotMatch,
        zh_hans: TEXT.zh_hans.passwordNotMatch
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validateToS = (value: boolean, language: string) => {
    let result: any
    if (value === false) {
      result = { zh_hant: '請勾選', zh_hans: '请勾选' }
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
    handleSubmit,
    setFieldValue,
    setFieldError
  }: {
    [key: string]: any
  }) => {
    const formClass = classNames('form', ...extraClass)

    const emailPlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterEmail,
      zh_hans: TEXT.zh_hans.enterEmail,
      lang
    })

    const codePlaceholder = translate({
      zh_hant: TEXT.zh_hant.verificationCode,
      zh_hans: TEXT.zh_hans.verificationCode,
      lang
    })

    const displayNamePlaceholder = translate({
      zh_hant: '姓名',
      zh_hans: '姓名',
      lang
    })

    const passwordPlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterPassword,
      zh_hans: TEXT.zh_hans.enterPassword,
      lang
    })

    const passwordHint = translate({
      zh_hant: TEXT.zh_hant.passwordHint,
      zh_hans: TEXT.zh_hans.passwordHint,
      lang
    })

    const comparedPlaceholder = translate({
      zh_hant: TEXT.zh_hant.enterPasswordAgain,
      zh_hans: TEXT.zh_hans.enterPasswordAgain,
      lang
    })

    const signUpText = translate({
      zh_hant: TEXT.zh_hant.register,
      zh_hans: TEXT.zh_hans.register,
      lang
    })

    const agreeText = translate({
      zh_hant: '我已閱讀並同意',
      zh_hans: '我已阅读并同意',
      lang
    })

    const tosText = translate({
      zh_hant: 'Matters 用戶協議和隱私政策',
      zh_hans: 'Matters 用户协议和隐私政策',
      lang
    })

    return (
      <>
        <form className={formClass} onSubmit={handleSubmit}>
          <Form.Input
            type="text"
            field="email"
            placeholder={emailPlaceholder}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <Form.Input
            type="text"
            field="code"
            placeholder={codePlaceholder}
            floatElement={
              <SendCodeButton
                email={values.email}
                lang={lang}
                type="register"
              />
            }
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <Form.Input
            type="text"
            field="displayName"
            placeholder={displayNamePlaceholder}
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
            hint={passwordHint}
          />
          <Form.Input
            type="password"
            field="comparedPassword"
            placeholder={comparedPlaceholder}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
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
                {agreeText}
                <Link {...PATHS.MISC_TOS}>
                  <a className="u-link-green" target="_blank">
                    {' '}
                    {tosText}
                  </a>
                </Link>
              </span>
            </Form.CheckBox>
          </div>
          <div className="buttons">
            <Button
              is="button"
              size="large"
              type="submit"
              bgColor="green"
              disabled={isSubmitting}
              style={{ minWidth: '5rem' }}
              icon={isSubmitting ? <IconSpinner /> : null}
            >
              {signUpText}
            </Button>
          </div>
        </form>
        <style jsx>{styles}</style>
      </>
    )
  }

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      email: defaultEmail,
      code: '',
      displayName: '',
      password: '',
      comparedPassword: '',
      tos: true
    }),

    validate: ({
      email,
      code,
      displayName,
      password,
      comparedPassword,
      tos
    }) => {
      const isInvalidEmail = validateEmail(email, lang)
      const isInvalidCodeId = validateCode(code, lang)
      const isInvalidDisplayName = validateDisplayName(displayName, lang)
      const isInvalidPassword = validatePassword(password, lang)
      const isInvalidComparedPassword = validateComparedPassword(
        password,
        comparedPassword,
        lang
      )
      const isInvalidToS = validateToS(tos, lang)
      const errors: { [key: string]: any } = {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidCodeId ? { code: isInvalidCodeId } : {}),
        ...(isInvalidDisplayName ? { displayName: isInvalidDisplayName } : {}),
        ...(isInvalidPassword ? { password: isInvalidPassword } : {}),
        ...(isInvalidComparedPassword
          ? { comparedPassword: isInvalidComparedPassword }
          : {}),
        ...(isInvalidToS ? { tos: isInvalidToS } : {})
      }
      return errors
    },

    handleSubmit: (values, { props, setFieldError, setSubmitting }: any) => {
      const { email, code, displayName, password } = values
      const { preSubmitAction, submitAction } = props
      if (!preSubmitAction || !submitAction) {
        return undefined
      }

      preSubmitAction({
        variables: { input: { email, code, type: 'register' } }
      })
        .then(({ data }: any) => {
          const { confirmVerificationCode: codeId } = data
          return submitAction({
            variables: { input: { email, codeId, displayName, password } }
          })
        })
        .then((result: any) => {
          if (submitCallback) {
            submitCallback()
            clearPersistCache()
          }
        })
        .catch((error: any) => {
          const errorCode = getErrorCodes(error)[0]
          const errorMessage = translate({
            zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
            zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
            lang
          })
          setFieldError('code', errorMessage)
        })
        .finally(() => {
          setSubmitting(false)
          analytics.identifyUser()
        })
    }
  })(BaseForm)

  return (
    <>
      <Mutation mutation={MUTATION_CONFIRM_CODE}>
        {confirm => (
          <Mutation mutation={MUTATION_USER_REGISTER}>
            {register => (
              <MainForm preSubmitAction={confirm} submitAction={register} />
            )}
          </Mutation>
        )}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}
