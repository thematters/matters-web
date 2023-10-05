import { useFormik } from 'formik'
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
  signinCallbackUrl,
  validateEmail,
  // validatePassword,
} from '~/common/utils'
import {
  AuthFeedType,
  AuthNormalFeed,
  AuthTabs,
  AuthWalletFeed,
  DialogBeta,
  Form,
  IconLeft20,
  LanguageContext,
  LanguageSwitch,
  Media,
  TextIcon,
  useCountdown,
  // toast,
  useMutation,
} from '~/components'
import { EMAIL_LOGIN } from '~/components/GQL/mutations/emailLogin'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import { EmailLoginMutation, SendVerificationCodeMutation } from '~/gql/graphql'

import Field from '../../Form/Field'
import OtherOptions from './OtherOptions'
import styles from './styles.module.css'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  gotoEmailSignup: () => void
  gotoWalletConnect: () => void

  authFeedType: AuthFeedType
  setAuthFeedType: (type: AuthFeedType) => void

  closeDialog: () => void
  back?: () => void
}

interface FormValues {
  email: string
  password: ''
}

export const EmailLoginForm: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  gotoWalletConnect,
  gotoEmailSignup,
  closeDialog,
  authFeedType,
  setAuthFeedType,
  back,
}) => {
  const [login] = useMutation<EmailLoginMutation>(EMAIL_LOGIN, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)

  const isInPage = purpose === 'page'
  const formId = 'email-login-form'

  const isNormal = authFeedType === 'normal'
  const isWallet = authFeedType === 'wallet'

  const [isSelectMethod, setIsSelectMethod] = useState(false)
  const [errorCode, setErrorCode] = useState<ERROR_CODES | null>(null)
  const [hasSendCode, setHasSendCode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    // handleBlur,
    handleChange,
    handleSubmit,
    setFieldError,
    setFieldValue,
    setErrors,
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
    onSubmit: async ({ email, password }, { setFieldError }) => {
      try {
        setIsSubmitting(true)
        const { data } = await login({
          variables: {
            input: { email, passwordOrCode: password, language: lang },
          },
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

        redirectToTarget({
          fallback: !!isInPage ? 'homepage' : 'current',
        })
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error as any)
        setErrorCode(codes[0])
        setFieldError('email', '')

        codes.forEach((code) => {
          // catch errors if try to login to a unregistered account with
          // a wrong verification code
          if (
            code.includes(ERROR_CODES.CODE_INVALID) ||
            code.includes(ERROR_CODES.CODE_INACTIVE)
          ) {
            const m = intl.formatMessage({
              defaultMessage: 'Incorrect email or password',
              description: 'src/components/Forms/EmailLoginForm/index.tsx',
            })
            setFieldError('password', m)
          }
          // catch error if try to login to a unregistered account with
          // an expired passpharse
          else if (code.includes(ERROR_CODES.CODE_EXPIRED)) {
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
        setIsSubmitting(false)
      }
    },
  })

  const sendLoginCode = async () => {
    const error = validateEmail(values.email, lang, { allowPlusSign: true })
    if (error) {
      setFieldError('email', error)
      return
    }

    const redirectUrl = signinCallbackUrl(values.email)

    await sendCode({
      variables: {
        input: {
          email: values.email,
          type: 'email_otp',
          redirectUrl,
          language: lang,
        },
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
          // FIXME: handleBlur will cause the component to re-render
          // onBlur={handleBlur}
          onChange={handleChange}
          spacingBottom="baseLoose"
          hasFooter={false}
          autoFocus={false}
        />

        <Form.Input
          // ref={passwordRef}
          label={<FormattedMessage defaultMessage="Password" />}
          type="password"
          name="password"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Password',
          })}
          value={values.password}
          error={touched.password && errors.password}
          // FIXME: handleBlur will cause the component to re-render
          // onBlur={handleBlur}
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
    <DialogBeta.TextButton
      type="submit"
      form={formId}
      disabled={!values.email || !values.password || isSubmitting}
      text={
        <FormattedMessage
          defaultMessage="Sign in"
          description="src/components/Forms/EmailLoginForm/index.tsx"
        />
      }
      loading={isSubmitting}
      // onClick={() => {
      //   setIsSubmitting(true)
      // }}
    />
  )

  return (
    <>
      {!isSelectMethod && (
        <DialogBeta.Header
          title={<FormattedMessage defaultMessage="Sign In" />}
          hasSmUpTitle={false}
          leftBtn={
            <DialogBeta.TextButton
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

      <DialogBeta.Content noMaxHeight={isInPage}>
        <Media at="sm">
          {isSelectMethod && (
            <AuthTabs
              type={authFeedType}
              setType={setAuthFeedType}
              purpose={purpose}
            />
          )}
        </Media>
        <Media greaterThan="sm">
          <AuthTabs
            type={authFeedType}
            setType={setAuthFeedType}
            purpose={purpose}
          />
        </Media>
        {isNormal && !isSelectMethod && <>{InnerForm}</>}
        {isNormal && isSelectMethod && (
          <AuthNormalFeed
            gotoEmailLogin={() => setIsSelectMethod(false)}
            gotoEmailSignup={gotoEmailSignup}
          />
        )}
        {isWallet && <AuthWalletFeed submitCallback={gotoWalletConnect} />}
      </DialogBeta.Content>

      {isNormal && !isSelectMethod && (
        <DialogBeta.Footer
          smUpBtns={
            <section className={styles.footerBtns}>
              <DialogBeta.TextButton
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
            </section>
          }
        />
      )}
      {((isNormal && isSelectMethod) || isWallet) && !isInPage && (
        <DialogBeta.Footer
          smUpBtns={
            <DialogBeta.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Close" />}
              onClick={closeDialog}
            />
          }
        />
      )}
      {isSelectMethod && isInPage && (
        <section className={styles.footer}>
          <LanguageSwitch />
        </section>
      )}
    </>
  )
}
