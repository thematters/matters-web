import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
// import Script from 'next/script'
import { useContext, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  parseFormSubmitErrors,
  signupCallbackUrl,
  validateEmail,
} from '~/common/utils'
import { WalletType } from '~/common/utils'
import {
  AuthFeedType,
  AuthTabs,
  AuthWalletFeed,
  DialogBeta,
  Form,
  IconLeft20,
  LanguageContext,
  Media,
  ReCaptchaContext,
  TextIcon,
  Turnstile,
  // TURNSTILE_DEFAULT_SCRIPT_ID,
  TurnstileInstance,
  useMutation,
  ViewerContext,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
// import { UserGroup } from '~/gql/graphql'
import { SendVerificationCodeMutation } from '~/gql/graphql'

import styles from './styles.module.css'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: (email: string) => void
  gotoWalletConnect: (type: WalletType) => void
  closeDialog?: () => void

  authFeedType: AuthFeedType
  setAuthFeedType: (type: AuthFeedType) => void

  back: () => void
}

interface FormValues {
  email: string
}

const Init: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  gotoWalletConnect,
  closeDialog,
  authFeedType,
  setAuthFeedType,
  back,
}) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const formId = 'email-sign-up-init-form'

  const isInPage = purpose === 'page'

  const isNormal = authFeedType === 'normal'
  const isWallet = authFeedType === 'wallet'
  const { token: reCaptchaToken, refreshToken } = useContext(ReCaptchaContext)
  const turnstileRef = useRef<TurnstileInstance>(null)
  const [turnstileToken, setTurnstileToken] = useState<string>()

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
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
    },
    validateOnBlur: false,
    validateOnChange: true, // enable for signup form
    validate: ({ email }) =>
      _pickBy({
        email: validateEmail(email, lang, { allowPlusSign: false }),
      }),
    onSubmit: async ({ email }, { setFieldError, setSubmitting }) => {
      try {
        const redirectUrl = signupCallbackUrl(email)
        await sendCode({
          variables: {
            input: {
              email,
              type: 'register',
              token:
                // (viewer.info.group === UserGroup.A && turnstileToken) ||
                // turnstileRef.current?.getResponse() || // fallback to ReCaptchaContext token
                turnstileToken
                  ? `${reCaptchaToken} ${turnstileToken}`
                  : reCaptchaToken,
              redirectUrl,
              language: lang,
            },
          },
        })

        setSubmitting(false)
        submitCallback(email)
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any)
        setFieldError('email', intl.formatMessage(messages[codes[0]]))

        refreshToken?.()
        turnstileRef.current?.reset()
      }
    },
  })

  // useEffect(() => { console.log('turnstileToken changed to:', turnstileToken); }, [turnstileRef, turnstileToken])

  const siteKey = process.env
    .NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY as string
  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        options={{
          action: 'register',
          cData: `user-group-${viewer.info.group}`,
          // refreshExpired: 'manual',
          size: 'invisible',
        }}
        // injectScript={false}

        scriptOptions={{
          compat: 'recaptcha',
          appendTo: 'body',
        }}
        onSuccess={(token) => {
          setTurnstileToken(token)
          // console.log('setTurnstileToken:', token)
        }}
      />
      <Form.Input
        label={<FormattedMessage defaultMessage="Email" />}
        type="email"
        name="email"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Email',
        })}
        hintSize="sm"
        hintAlign="center"
        hintSpace="baseLoose"
        value={values.email}
        error={touched.email && errors.email}
        // FIXME: handleBlur will cause the component to re-render
        // onBlur={handleBlur}
        onChange={handleChange}
        spacingBottom="base"
        autoFocus
      />
    </Form>
  )

  const SubmitButton = (
    <DialogBeta.TextButton
      type="submit"
      form={formId}
      disabled={
        values.email === '' || errors.email !== undefined || isSubmitting
      }
      text={
        <FormattedMessage
          defaultMessage="Continue"
          description="src/components/Forms/EmailSignUpForm/Init.tsx"
        />
      }
      loading={isSubmitting}
    />
  )

  return (
    <>
      <DialogBeta.Header
        title={<FormattedMessage defaultMessage="Sign Up" />}
        hasSmUpTitle={false}
        leftBtn={
          <DialogBeta.TextButton
            text={<FormattedMessage defaultMessage="Back" />}
            color="greyDarker"
            onClick={back}
          />
        }
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <DialogBeta.Content>
        <Media at="sm">{InnerForm}</Media>
        <Media greaterThan="sm">
          <AuthTabs
            purpose={purpose}
            type={authFeedType}
            setType={setAuthFeedType}
            normalText={<FormattedMessage defaultMessage="Sign Up" />}
          />
          {isNormal && <>{InnerForm}</>}
          {isWallet && <AuthWalletFeed submitCallback={gotoWalletConnect} />}
        </Media>
      </DialogBeta.Content>

      {isNormal && (
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
                onClick={back}
              />

              {SubmitButton}
            </section>
          }
        />
      )}
      {isWallet && !isInPage && (
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
    </>
  )
}

export default Init
