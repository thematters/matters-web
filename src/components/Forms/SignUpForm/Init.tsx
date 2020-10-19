import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import Link from 'next/link'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Layout,
  ReCaptchaContext,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'
import SEND_CODE from '~/components/GQL/mutations/sendCode'

import { CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG, PATHS } from '~/common/enums'
import {
  appendTarget,
  parseFormSubmitErrors,
  translate,
  validateDisplayName,
  validateEmail,
  validateToS,
} from '~/common/utils'

import { SendVerificationCode } from '~/components/GQL/mutations/__generated__/SendVerificationCode'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
}

interface FormValues {
  displayName: string
  email: string
  tos: boolean
}

const LoginDialogButton = () => (
  <Form.List spacing="xloose">
    <Form.List.Item
      title={<Translate zh_hant="已有帳戶？" zh_hans="已有帐户？" />}
      rightText={<Translate id="login" />}
      rightTextColor="green"
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
      title={<Translate zh_hant="已有帳戶？" zh_hans="已有帐户？" />}
      rightText={<Translate id="login" />}
      rightTextColor="green"
      {...appendTarget(PATHS.LOGIN)}
    />
  </Form.List>
)

const Init: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const { lang } = useContext(LanguageContext)
  const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'
  const formId = 'sign-up-init-form'

  const { token, refreshToken } = useContext(ReCaptchaContext)
  const [sendCode] = useMutation<SendVerificationCode>(SEND_CODE)

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik<FormValues>({
    initialValues: {
      displayName: '',
      email: '',
      tos: true,
    },
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
        await sendCode({
          variables: { input: { email, type: 'register', token, redirectUrl } },
        })

        submitCallback()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('email', messages[codes[0]])

        if (refreshToken) {
          refreshToken()
        }
      }

      setSubmitting(false)
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<Translate id="displayName" />}
        type="text"
        name="displayName"
        required
        placeholder={translate({
          zh_hant: '你的站內暱稱，之後可以修改',
          zh_hans: '你的站内暱称，之后可以修改',
          lang,
        })}
        value={values.displayName}
        error={touched.displayName && errors.displayName}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Input
        label={<Translate id="email" />}
        type="email"
        name="email"
        required
        placeholder={translate({
          id: 'enterEmail',
          lang,
        })}
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
        autoFocus
      />

      <Form.CheckBox
        name="tos"
        checked={values.tos}
        error={touched.tos && errors.tos}
        onChange={handleChange}
        hint={
          <>
            <Translate zh_hant="我已閱讀並同意" zh_hans="我已阅读并同意" />

            <Link href={PATHS.TOS}>
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

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Init
