import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import Link from 'next/link'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Layout,
  SendCodeButton,
  Translate
} from '~/components'
import { useMutation } from '~/components/GQL'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'

import {
  ANALYTICS_EVENTS,
  CLOSE_ACTIVE_DIALOG,
  OPEN_LOGIN_DIALOG,
  PATHS
} from '~/common/enums'
import {
  analytics,
  appendTarget,
  parseFormSubmitErrors,
  translate,
  validateCode,
  validateEmail,
  validatePassword,
  validateToS,
  validateUserName
} from '~/common/utils'

import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'
import { UserRegister } from './__generated__/UserRegister'

interface FormProps {
  defaultEmail?: string
  purpose: 'dialog' | 'page'
  submitCallback?: (params: any) => void
  closeDialog?: () => void
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
  <Form.List spacing="xloose">
    <Form.List.Item
      title={<Translate zh_hant="已有帳號？" zh_hans="已有帐号？" />}
      rightText={<Translate id="login" />}
      onClick={() => {
        window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
        window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
      }}
    />
  </Form.List>
)

const LoginRedirectionButton = () => (
  <Form.List spacing="xloose">
    <Form.List.Item
      title={<Translate zh_hant="已有帳號？" zh_hans="已有帐号？" />}
      rightText={<Translate id="login" />}
      {...appendTarget(PATHS.AUTH_LOGIN)}
    />
  </Form.List>
)

export const SignUpInitForm: React.FC<FormProps> = ({
  defaultEmail = '',
  purpose,
  submitCallback,
  closeDialog
}) => {
  const [confirm] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)
  const [register] = useMutation<UserRegister>(USER_REGISTER)
  const { lang } = useContext(LanguageContext)
  const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'
  const formId = 'sign-up-init-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid
  } = useFormik<FormValues>({
    initialValues: {
      email: defaultEmail,
      code: '',
      userName: '',
      password: '',
      tos: true
    },
    validate: ({ email, code, userName, password, tos }) =>
      _pickBy({
        email: validateEmail(email, lang, { allowPlusSign: false }),
        code: validateCode(code, lang),
        userName: validatePassword(password, lang),
        password: validateUserName(userName, lang),
        tos: validateToS(tos, lang)
      }),
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
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach(c => {
          if (c.includes('USER_EMAIL_')) {
            setFieldError('email', messages[c])
          } else if (c.indexOf('CODE_') >= 0) {
            setFieldError('code', messages[c])
          } else if (c.indexOf('USER_PASSWORD_') >= 0) {
            setFieldError('password', messages[c])
          } else {
            setFieldError('userName', messages[c])
          }
        })

        setSubmitting(false)
      }
    }
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<Translate id="email" />}
        type="email"
        name="email"
        required
        placeholder={translate({
          id: 'enterEmail',
          lang
        })}
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Input
        label={<Translate id="verificationCode" />}
        type="text"
        name="code"
        required
        placeholder={translate({
          id: 'enterVerificationCode',
          lang
        })}
        value={values.code}
        error={touched.code && errors.code}
        onBlur={handleBlur}
        onChange={handleChange}
        extraButton={
          <SendCodeButton
            email={values.email}
            type="register"
            disabled={!!errors.email}
          />
        }
      />

      <Form.Input
        label="Matters ID"
        type="text"
        name="userName"
        required
        value={values.userName}
        error={touched.userName && errors.userName}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={translate({
          zh_hant: '你的站內身份識別，允許修改一次',
          zh_hans: '你的站内身份识别，允许修改一次',
          lang
        })}
        hint={translate({
          id: 'hintUserName',
          lang
        })}
      />

      <Form.Input
        label={<Translate id="password" />}
        type="password"
        name="password"
        required
        placeholder={translate({
          id: 'enterPassword',
          lang
        })}
        value={values.password}
        error={touched.password && errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        hint={<Translate id="hintPassword" />}
      />

      <Form.CheckBox
        name="tos"
        checked={values.tos}
        error={touched.tos && errors.tos}
        onChange={handleChange}
        hint={
          <>
            <Translate zh_hant="我已閱讀並同意" zh_hans="我已阅读并同意" />

            <Link {...PATHS.MISC_TOS}>
              <a className="u-link-green" target="_blank">
                &nbsp;
                <Translate
                  zh_hant="Matters 用戶協議和隱私政策"
                  zh_hans="Matters 用户协议和隐私政策"
                />
              </a>
            </Link>
          </>
        }
        required
      />

      {isInDialog && <LoginDialogButton />}
      {isInPage && <LoginRedirectionButton />}
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
              <Layout.Header.Title id="register" />
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
          title="register"
          close={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  )
}
