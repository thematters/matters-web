import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  ERROR_CODES,
  SEND_CODE_COUNTDOWN,
} from '~/common/enums'
import {
  analytics,
  parseFormSubmitErrors,
  redirectToTarget,
  setCookies,
  validateEmail,
  // validatePassword,
} from '~/common/utils'
import {
  AuthFeedType,
  AuthNormalFeed,
  AuthTabs,
  AuthWalletFeed,
  Dialog,
  Form,
  IconLeft20,
  LanguageContext,
  Media,
  TextIcon,
  useCountdown,
  // toast,
  useMutation,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import { EmailLoginMutation, SendVerificationCodeMutation } from '~/gql/graphql'

import Field from '../../Form/Field'
import OtherOptions from './OtherOptions'
import styles from './styles.module.css'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  gotoResetPassword?: () => void
  gotoEmailSignup: () => void
  gotoWalletConnect: () => void
  closeDialog: () => void
  back?: () => void
}

interface FormValues {
  email: string
  password: ''
}

export const EMAIL_LOGIN = gql`
  mutation EmailLogin($input: EmailLoginInput!) {
    emailLogin(input: $input) {
      auth
      token
      user {
        id
        settings {
          language
        }
        info {
          group
        }
      }
    }
  }
`

export const EmailLoginForm: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  gotoResetPassword,
  gotoWalletConnect,
  gotoEmailSignup,
  closeDialog,
  back,
}) => {
  const [login] = useMutation<EmailLoginMutation>(EMAIL_LOGIN, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)

  const isInPage = purpose === 'page'
  const formId = 'email-login-form'

  const [authTypeFeed, setAuthTypeFeed] = useState<AuthFeedType>('normal')
  const isNormal = authTypeFeed === 'normal'
  const isWallet = authTypeFeed === 'wallet'

  const [isSelectMethod, setIsSelectMethod] = useState(false)
  const [errorCode, setErrorCode] = useState<ERROR_CODES | null>(null)
  const [hasSendCode, setHasSendCode] = useState(false)
  const { countdown, setCountdown } = useCountdown(0)

  const passwordRef = useRef<HTMLInputElement>(null)

  const [sendCode] = useMutation<SendVerificationCodeMutation>(
    SEND_CODE,
    undefined,
    {
      showToast: false,
    }
  )

  const intl = useIntl()
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldError,
    setFieldValue,
    setErrors,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ email, password }) =>
      _pickBy({
        email: validateEmail(email, lang, { allowPlusSign: true }),
        // password: validatePassword(password, lang),
      }),
    onSubmit: async ({ email, password }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await login({
          variables: { input: { email, passwordOrCode: password } },
        })

        const token = data?.emailLogin.token || ''
        const language = data?.emailLogin.user?.settings.language || ''
        const group = data?.emailLogin.user?.info.group || ''
        setCookies({
          [COOKIE_LANGUAGE]: language,
          [COOKIE_USER_GROUP]: group,
          ...(isProd ? {} : { [COOKIE_TOKEN_NAME]: token }),
        })

        if (submitCallback) {
          submitCallback()
        }

        // toast.success({
        //   message: <FormattedMessage defaultMessage="Logged in successfully" />,
        // })

        analytics.identifyUser()

        setSubmitting(false)
        redirectToTarget({
          fallback: !!isInPage ? 'homepage' : 'current',
        })
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error as any)
        setErrorCode(codes[0])
        setFieldError('email', '')

        codes.forEach((code) => {
          if (code.includes(ERROR_CODES.CODE_EXPIRED)) {
            setFieldError(
              'password',
              intl.formatMessage({
                defaultMessage:
                  'This login code has expired, please try to resend',
              })
            )
          } else {
            setFieldError('password', intl.formatMessage(messages[code]))
          }
        })
        setSubmitting(false)
      }
    },
  })

  const sendLoginCode = async () => {
    const error = validateEmail(values.email, lang, { allowPlusSign: true })
    if (error) {
      setFieldError('email', error)
      return
    }

    const redirectUrl = `${
      window.location.origin
    }/login?email=${encodeURIComponent(values.email)}`

    await sendCode({
      variables: {
        input: { email: values.email, type: 'email_otp', redirectUrl },
      },
    })
    setCountdown(SEND_CODE_COUNTDOWN)
    setHasSendCode(true)

    // clear
    setErrors({})
    setFieldValue('password', '')
    setErrorCode(null)

    if (passwordRef.current) {
      passwordRef.current.focus()
    }
  }

  const fieldMsgId = `field-msg-sign-in`

  const InnerForm = (
    <>
      <Form id={formId} onSubmit={handleSubmit}>
        <Form.Input
          label={<FormattedMessage defaultMessage="Email" />}
          type="email"
          name="email"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Email',
          })}
          value={values.email}
          error={errors.email}
          onBlur={handleBlur}
          onChange={handleChange}
          spacingBottom="baseLoose"
          hasFooter={false}
          autoFocus
        />

        <Form.Input
          ref={passwordRef}
          label={<FormattedMessage defaultMessage="Password" />}
          type="password"
          name="password"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Password',
          })}
          value={values.password}
          error={touched.password && errors.password}
          onBlur={handleBlur}
          onChange={handleChange}
          spacingBottom="baseLoose"
          hasFooter={false}
          rightButton={
            <>
              {hasSendCode && countdown > 0 && (
                <span className={styles.resendButton}>
                  {countdown}&nbsp;
                  <FormattedMessage
                    defaultMessage="Resend"
                    description="src/components/Forms/EmailLoginForm/index.tsx"
                  />
                </span>
              )}
              {(hasSendCode || errorCode === ERROR_CODES.CODE_EXPIRED) &&
                countdown === 0 && (
                  <button
                    className={styles.resendButton}
                    onClick={(e) => {
                      e.preventDefault()
                      sendLoginCode()
                    }}
                  >
                    <FormattedMessage
                      defaultMessage="Resend"
                      description="src/components/Forms/EmailLoginForm/index.tsx"
                    />
                  </button>
                )}
            </>
          }
        />

        {(!!errors.email || !!errors.password) && (
          <>
            <Field.Footer
              fieldMsgId={fieldMsgId}
              error={errors.email || errors.password}
              hintSize="sm"
              hintAlign="center"
              hintSpace="baseLoose"
            />
          </>
        )}

        {errorCode !== ERROR_CODES.CODE_EXPIRED &&
          !(hasSendCode && errorCode === ERROR_CODES.CODE_INVALID) && (
            <OtherOptions
              isInPage={isInPage}
              sendLoginCode={sendLoginCode}
              hasSendCode={hasSendCode}
            />
          )}
      </Form>
    </>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={!values.email || !values.password || isSubmitting}
      text={<FormattedMessage defaultMessage="Confirm" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      {!isSelectMethod && (
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Sign In" />}
          hasSmUpTitle={false}
          leftBtn={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" />}
              color="greyDarker"
              onClick={() => {
                setIsSelectMethod(true)
              }}
            />
          }
          closeDialog={closeDialog}
          rightBtn={SubmitButton}
        />
      )}

      <Dialog.Content>
        <Media at="sm">
          {isSelectMethod && (
            <AuthTabs type={authTypeFeed} setType={setAuthTypeFeed} />
          )}
        </Media>
        <Media greaterThan="sm">
          <AuthTabs type={authTypeFeed} setType={setAuthTypeFeed} />
        </Media>
        {isNormal && !isSelectMethod && <>{InnerForm}</>}
        {isNormal && isSelectMethod && (
          <AuthNormalFeed
            gotoEmailLogin={() => setIsSelectMethod(false)}
            gotoEmailSignup={gotoEmailSignup}
          />
        )}
        {isWallet && <AuthWalletFeed submitCallback={gotoWalletConnect} />}
      </Dialog.Content>

      {isNormal && !isSelectMethod && (
        <Dialog.Footer
          smUpSpaceBetween
          smUpBtns={
            <>
              <Dialog.TextButton
                text={
                  <TextIcon icon={<IconLeft20 size="mdS" />} spacing="xxxtight">
                    <FormattedMessage defaultMessage="Back" />
                  </TextIcon>
                }
                color="greyDarker"
                onClick={() => {
                  setIsSelectMethod(true)
                }}
              />

              {SubmitButton}
            </>
          }
        />
      )}
      {((isNormal && isSelectMethod) || isWallet) && (
        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Close" />}
              onClick={closeDialog}
            />
          }
        />
      )}
    </>
  )
}
