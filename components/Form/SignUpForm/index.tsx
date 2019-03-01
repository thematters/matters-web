import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import Link from 'next/link'
import { FC, useContext } from 'react'
import { Mutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import { LanguageContext } from '~/components/Language'

import { PATHS } from '~/common/enums'
import {
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
 *   <Form.SignUpForm
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

const SignUpForm: FC<Props> = ({
  defaultEmail = '',
  extraClass = [],
  purpose,
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

  const validateEmail = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (!isValidEmail(value)) {
      result = { zh_hant: '電子信箱格式有誤', zh_hans: '邮箱格式有误' }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validateCode = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validateDisplayName = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (!isValidDisplayName(value)) {
      result = {
        zh_hant: '請輸入 2 至 20 個字元，僅支持中英文及數字',
        zh_hans: '请输入 2 至 20 个字符，仅支持中英文及数字'
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validatePassword = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (!isValidPassword(value)) {
      result = {
        zh_hant: '不少於 8 位，必須包含數字和大小寫字母',
        zh_hans: '不少于 8 位，必须包含数字和大小写字母'
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
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (comparedValue !== value) {
      result = { zh_hant: '密碼不一致', zh_hans: '密码不一致' }
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
    setFieldValue
  }: {
    [key: string]: any
  }) => {
    const formClass = classNames('form', ...extraClass)

    const emailPlaceholder = translate({
      zh_hant: '請輸入電子信箱',
      zh_hans: '请输入邮箱',
      lang
    })

    const codePlaceholder = translate({
      zh_hant: '驗證碼',
      zh_hans: '验证码',
      lang
    })

    const displayNamePlaceholder = translate({
      zh_hant: '姓名',
      zh_hans: '姓名',
      lang
    })

    const passwordPlaceholder = translate({
      zh_hant: '請輸入密碼',
      zh_hans: '请输入密码',
      lang
    })

    const comparedPlaceholder = translate({
      zh_hant: '請再次輸入密碼',
      zh_hans: '请再次输入密码',
      lang
    })

    const signUpText = translate({
      zh_hant: '註冊',
      zh_hans: '注册',
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
            style={{ marginTop: '0.6rem', paddingRight: '6rem' }}
            floatElement={
              <Form.SendCodeButton
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
            style={{ marginTop: '0.6rem' }}
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
            style={{ marginTop: '0.6rem' }}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <Form.Input
            type="password"
            field="comparedPassword"
            placeholder={comparedPlaceholder}
            style={{ marginTop: '0.6rem' }}
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
                <Link href={PATHS.MISC_TOS.href} as={PATHS.MISC_TOS.as}>
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
              style={{ width: 80 }}
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

    handleSubmit: (values, { props, setSubmitting }: any) => {
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
          }
        })
        .catch((result: any) => {
          // TODO: Handle error
        })
        .finally(() => {
          setSubmitting(false)
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

export default SignUpForm
