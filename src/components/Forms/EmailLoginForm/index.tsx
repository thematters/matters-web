import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
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
  Layout,
  Media,
  Spacer,
  TextIcon,
  // toast,
  useMutation,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import { SendVerificationCodeMutation, UserLoginMutation } from '~/gql/graphql'

import Field from '../../Form/Field'
import OtherOptions from './OtherOptions'
import styles from './styles.module.css'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  gotoResetPassword?: () => void
  gotoEmailSignup: () => void
  closeDialog: () => void
  back?: () => void
}

interface FormValues {
  email: string
  password: ''
}

export const USER_LOGIN = gql`
  mutation UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
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
  gotoEmailSignup,
  closeDialog,
  back,
}) => {
  const [login] = useMutation<UserLoginMutation>(USER_LOGIN, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)

  const isInPage = purpose === 'page'
  const formId = 'email-login-form'

  const [authTypeFeed, setAuthTypeFeed] = useState<AuthFeedType>('normal')
  const isNormal = authTypeFeed === 'normal'
  const isWallet = authTypeFeed === 'wallet'

  const [isSelectMethod, setIsSelectMethod] = useState(false)

  const [hasSendCode, setHasSendCode] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000)
  }, [countdown])

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
          variables: { input: { email, password } },
        })

        const token = data?.userLogin.token || ''
        const language = data?.userLogin.user?.settings.language || ''
        const group = data?.userLogin.user?.info.group || ''
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
        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        codes.forEach((code) => {
          if (
            code.includes('USER_EMAIL_') ||
            code.indexOf('USER_PASSWORD_') >= 0
          ) {
            setFieldError('email', messages[code])
            setFieldError('password', messages[code])
          } else {
            setFieldError('email', messages[code])
          }
        })
        setSubmitting(false)
      }
    },
  })

  console.log({ errors })

  const sendLoginCode = async () => {
    const error = validateEmail(values.email, lang, { allowPlusSign: true })
    if (error) {
      setFieldError('email', error)
      return
    }

    await sendCode({
      variables: { input: { email: values.email, type: 'email_otp' } },
    })
    setHasSendCode(true)
    setCountdown(3)
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
              {hasSendCode && countdown === 0 && (
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
            <Spacer size="baseLoose" />
          </>
        )}
      </Form>

      <OtherOptions
        isInPage={isInPage}
        sendLoginCode={sendLoginCode}
        hasSendCode={hasSendCode}
      />
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

  if (isInPage) {
    return (
      <>
        <Layout.Header
          right={
            <>
              <Layout.Header.Title id="login" />
              <Layout.Header.RightButton
                type="submit"
                form={formId}
                disabled={isSubmitting}
                text={<FormattedMessage defaultMessage="Confirm" />}
                loading={isSubmitting}
              />
            </>
          }
        />

        <Layout.Main.Spacing>{InnerForm}</Layout.Main.Spacing>
      </>
    )
  }

  return (
    <>
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

      <Dialog.Content>
        <Media at="sm">
          {!isSelectMethod && <>{InnerForm}</>}
          {/* {isSelectMethod && } */}
        </Media>
        <Media greaterThan="sm">
          <AuthTabs type={authTypeFeed} setType={setAuthTypeFeed} />
          {isNormal && !isSelectMethod && <>{InnerForm}</>}
          {isNormal && isSelectMethod && (
            <AuthNormalFeed
              gotoEmailLogin={() => setIsSelectMethod(false)}
              gotoEmailSignup={gotoEmailSignup}
            />
          )}
          {isWallet && <AuthWalletFeed />}
        </Media>
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
