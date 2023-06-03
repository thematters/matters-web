import { useLazyQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import Link from 'next/link'
import { useContext, useEffect, useId } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'

import {
  ADD_TOAST,
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  PATHS,
} from '~/common/enums'
import {
  analytics,
  maskAddress,
  parseFormSubmitErrors,
  redirectToTarget,
  setCookies,
  validateCode,
  validateEmail,
  validateToS,
  WALLET_ERROR_MESSAGES,
} from '~/common/utils'
import {
  Dialog,
  Form,
  IconInfo16,
  LanguageContext,
  Layout,
  TextIcon,
  useMutation,
  VerificationSendCodeButton,
  ViewerContext,
} from '~/components'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'
import {
  AuthResultType,
  ConfirmVerificationCodeMutation,
  EthAddressUserQuery,
  GenerateSigningMessageMutation,
  WalletLoginMutation,
} from '~/gql/graphql'

import { ETH_ADDRESS_USER, GENERATE_SIGNING_MESSAGE, WALLET_LOGIN } from './gql'
import styles from './styles.module.css'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback?: (type?: AuthResultType) => void
  closeDialog?: () => void
  back?: () => void
}

interface FormValues {
  address: string
  tos: boolean
  email: string
  code: string
}

const ImportantNotice = ({ isInDialog }: { isInDialog: boolean }) => {
  const containeClasses = classNames({
    [styles.notice]: true,
    [styles.inDialog]: !!isInDialog,
  })
  return (
    <section className={containeClasses}>
      <h4>
        <FormattedMessage
          defaultMessage="As a reminder, the email address will not be used as a login but only as a contact channel."
          description="src/components/Forms/WalletAuthForm/Connect.tsx"
        />
      </h4>

      <p>
        <b>
          <FormattedMessage
            defaultMessage="Matters will never ask for your wallet mnemonic through any channel. "
            description="src/components/Forms/WalletAuthForm/Connect.tsx"
          />
        </b>
        <FormattedMessage
          defaultMessage="Important information will be notified by email. So filling in your email address will be required."
          description="src/components/Forms/WalletAuthForm/Connect.tsx"
        />
      </p>
    </section>
  )
}

const Connect: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
  back,
}) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)
  const isInPage = purpose === 'page'
  const isInDialog = purpose === 'dialog'
  const formId = useId()
  const fieldMsgId = useId()

  const [generateSigningMessage] = useMutation<GenerateSigningMessageMutation>(
    GENERATE_SIGNING_MESSAGE,
    undefined,
    { showToast: false }
  )
  const [walletLogin] = useMutation<WalletLoginMutation>(
    WALLET_LOGIN,
    undefined,
    {
      showToast: false,
    }
  )
  const [confirmCode] =
    useMutation<ConfirmVerificationCodeMutation>(CONFIRM_CODE)

  const [queryEthAddressUser, { data, loading }] =
    useLazyQuery<EthAddressUserQuery>(ETH_ADDRESS_USER)

  const { disconnect } = useDisconnect()
  const { address: account } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const intl = useIntl()
  // sign up if eth address didn't bind with a user
  const isSignUp = !!(data && account && !data?.user?.id && !viewer.isAuthed)

  useEffect(() => {
    if (!account && back) {
      back()
    }

    setFieldValue('address', account || '')

    queryEthAddressUser({ variables: { ethAddress: account } })
  }, [account])

  // disconnect before go back to previous step
  const onBack = () => {
    disconnect()

    if (back) {
      back()
    }
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      address: account || '',
      tos: true,
      email: '',
      code: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ tos, email, code }) =>
      _pickBy({
        tos: isSignUp ? validateToS(tos, lang) : undefined,
        email: isSignUp
          ? validateEmail(email, lang, { allowPlusSign: false })
          : undefined,
        code: isSignUp ? validateCode(code, lang) : undefined,
      }),
    onSubmit: async (
      { address, email, code },
      { setFieldError, setSubmitting }
    ) => {
      try {
        if (!address) {
          setFieldError('address', WALLET_ERROR_MESSAGES[lang].invalidAddress)
          setSubmitting(false)
          return
        }

        // get signing message
        const { data: signingMessageData } = await generateSigningMessage({
          variables: { input: { address } },
        })

        const signingMessage = signingMessageData?.generateSigningMessage
        if (!signingMessage) {
          setFieldError('address', WALLET_ERROR_MESSAGES[lang].unknown)
          setSubmitting(false)
          return
        }

        // let user sign the message
        let signature = ''
        try {
          signature = await signMessageAsync({
            message: signingMessage.signingMessage,
          })
        } catch (err) {
          setFieldError(
            'address',
            WALLET_ERROR_MESSAGES[lang].userRejectedSignMessage
          )
          setSubmitting(false)
          return
        }

        // verifiy email (sign up only)
        let codeId = ''
        if (isSignUp && email && code) {
          const { data: confirmCodeData } = await confirmCode({
            variables: { input: { email, type: 'register', code } },
          })
          codeId = confirmCodeData?.confirmVerificationCode || ''
        }

        // confirm auth
        const { data: loginData } = await walletLogin({
          variables: {
            input: {
              ethAddress: address,
              nonce: signingMessage.nonce,
              signedMessage: signingMessage.signingMessage,
              signature,
              ...(email ? { email } : {}),
              ...(codeId ? { codeId } : {}),
            },
          },
        })

        const token = loginData?.walletLogin.token || ''
        const language = loginData?.walletLogin.user?.settings.language || ''
        const group = loginData?.walletLogin.user?.info.group || ''
        setCookies({
          [COOKIE_LANGUAGE]: language,
          [COOKIE_USER_GROUP]: group,
          ...(isProd ? {} : { [COOKIE_TOKEN_NAME]: token }),
        })

        analytics.identifyUser()

        if (loginData?.walletLogin.type === AuthResultType.Login) {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'green',
                content: (
                  <FormattedMessage
                    defaultMessage="Logged in successfully"
                    description=""
                  />
                ),
              },
            })
          )
          redirectToTarget({
            fallback: isInPage ? 'homepage' : 'current',
          })
        } else if (submitCallback) {
          submitCallback(loginData?.walletLogin.type)
        }
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        codes.forEach((c) => {
          if (c.includes('CODE_')) {
            setFieldError('code', messages[c])
          } else {
            setFieldError('address', messages[c])
          }
        })
      }

      setSubmitting(false)
    },
  })

  const msgClasses = classNames({
    [styles['connect-msg']]: true,
    [styles.isInDialog]: isInDialog,
  })

  const subtitleClasses = classNames({
    [styles.subtitle]: true,
    [styles.isInDialog]: isInDialog,
  })

  const containerClasses = classNames({ [styles.container]: !!isInPage })

  const InnerForm = (
    <section className={containerClasses}>
      <Form id={formId} onSubmit={handleSubmit}>
        <Form.List
          groupName={
            <FormattedMessage defaultMessage="Connect Wallet" description="" />
          }
          spacingX={isInPage ? 0 : 'base'}
        >
          <Form.List.Item title={maskAddress(values.address)} />
        </Form.List>

        <section className={msgClasses}>
          <Form.Field.Footer
            fieldMsgId={fieldMsgId}
            hint={
              !errors.address ? (
                <FormattedMessage
                  defaultMessage="To change, switch it directly on your wallet"
                  description=""
                />
              ) : undefined
            }
            error={errors.address}
          />
        </section>

        {isSignUp && (
          <div className={styles['divider']}>
            <hr />
          </div>
        )}

        {isSignUp && (
          <h3 className={subtitleClasses}>
            <FormattedMessage
              defaultMessage="Contact Channel"
              description="src/components/Forms/WalletAuthForm/Connect.tsx"
            />
          </h3>
        )}

        {isSignUp && (
          <Form.Input
            label={<FormattedMessage defaultMessage="Email" description="" />}
            type="email"
            name="email"
            required
            placeholder={intl.formatMessage({
              defaultMessage: 'Enter Email',
              description: '',
            })}
            extraButton={
              <TextIcon
                icon={<IconInfo16 color="gold" />}
                color="gold"
                size="sm"
                weight="md"
                spacing="xxtight"
              >
                <FormattedMessage
                  defaultMessage="Not for login"
                  description="src/components/Forms/WalletAuthForm/Connect.tsx"
                />
              </TextIcon>
            }
            value={values.email}
            error={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            hint={
              <FormattedMessage
                defaultMessage="Email will not be used as a login but only as a contact channel."
                description=""
              />
            }
          />
        )}

        {isSignUp && (
          <Form.Input
            label={
              <FormattedMessage
                defaultMessage="Verification Code"
                description="src/components/Forms/WalletAuthForm/Connect.tsx"
              />
            }
            type="text"
            name="code"
            required
            placeholder={intl.formatMessage({
              defaultMessage: 'Enter verification code',
              description: 'src/components/Forms/WalletAuthForm/Connect.tsx',
            })}
            hint={intl.formatMessage({
              defaultMessage: 'Code will expire after 20 minutes',
              description: '',
            })}
            value={values.code}
            error={touched.code && errors.code}
            onBlur={handleBlur}
            onChange={handleChange}
            extraButton={
              <VerificationSendCodeButton
                email={values.email}
                type="register"
                disabled={!!errors.email}
              />
            }
          />
        )}

        {isSignUp && (
          <Form.CheckBox
            name="tos"
            checked={values.tos}
            error={touched.tos && errors.tos}
            onChange={handleChange}
            hint={
              <>
                <FormattedMessage
                  defaultMessage="I have read and agree to"
                  description=""
                />
                <Link href={PATHS.TOS} legacyBehavior>
                  <a className="u-link-green" target="_blank">
                    &nbsp;
                    <FormattedMessage
                      defaultMessage="Terms and Privacy Policy"
                      description=""
                    />
                  </a>
                </Link>
              </>
            }
            required
          />
        )}

        {isSignUp && <ImportantNotice isInDialog={isInDialog} />}
      </Form>
    </section>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={isSubmitting || loading || !account}
      text={<FormattedMessage defaultMessage="Next" description="" />}
      loading={isSubmitting || loading}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          right={
            <>
              <Layout.Header.Title id="authEntries" />
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
          title="authEntries"
          leftButton={
            back ? <Dialog.Header.BackButton onClick={onBack} /> : null
          }
          closeDialog={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Connect
