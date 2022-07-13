import { useLazyQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { useAccount, useSignMessage } from 'wagmi'

import {
  Dialog,
  Form,
  LanguageContext,
  Layout,
  Spacer,
  Translate,
  useMutation,
  VerificationSendCodeButton,
  ViewerContext,
} from '~/components'
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode'

import { ADD_TOAST, PATHS, STORAGE_KEY_AUTH_TOKEN } from '~/common/enums'
import {
  analytics,
  maskAddress,
  parseFormSubmitErrors,
  redirectToTarget,
  storage,
  translate,
  validateCode,
  validateEmail,
  validateToS,
  WALLET_ERROR_MESSAGES,
} from '~/common/utils'

import { ETH_ADDRESS_USER, GENERATE_SIGNING_MESSAGE, WALLET_LOGIN } from './gql'
import styles from './styles.css'

import { AuthResultType } from '@/__generated__/globalTypes'
import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode'
import { ETHAddressUser } from './__generated__/ETHAddressUser'
import { GenerateSigningMessage } from './__generated__/GenerateSigningMessage'
import { WalletLogin } from './__generated__/WalletLogin'

const isStaticBuild = process.env.NEXT_PUBLIC_BUILD_TYPE === 'static'

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

const Intro = () => {
  return (
    <Dialog.Message align="left">
      <p>
        <Translate
          zh_hant="提醒：重要訊息將透過郵件通知，請填入信箱完成設定。"
          zh_hans="提醒：重要讯息将透过邮件通知，請填入邮箱完成设定。"
          en="Important information will be notified by email. So filling in your email address will be required. "
        />
        <b>
          <Translate
            zh_hant="信箱將不作為登入使用，僅作為聯繫渠道。"
            zh_hans="邮箱将不作为登入使用，仅作为联系渠道。"
            en="As a reminder, the email address will not be used as a login but only as a contact channel. "
          />
          <Translate
            zh_hant="Matters 不會透過任何渠道詢問你的錢包私鑰。"
            zh_hans="Matters 不会透过任何渠道询问你的钱包私钥。"
            en="Also, Matters will never ask for your wallet mnemonic through any channel."
          />
        </b>
      </p>
    </Dialog.Message>
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
  const formId = 'wallet-auth-connect-form'
  const fieldMsgId = 'wallet-auth-connect-msg'

  const [generateSigningMessage] = useMutation<GenerateSigningMessage>(
    GENERATE_SIGNING_MESSAGE,
    undefined,
    { showToast: false }
  )
  const [walletLogin] = useMutation<WalletLogin>(WALLET_LOGIN, undefined, {
    showToast: false,
  })
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE)

  const [queryEthAddressUser, { data, loading }] =
    useLazyQuery<ETHAddressUser>(ETH_ADDRESS_USER)

  const { data: accountData } = useAccount()
  const account = accountData?.address
  const { signMessageAsync } = useSignMessage()

  // sign up if eth address didn't bind with a user
  const isSignUp = !!(data && account && !data?.user?.id && !viewer.isAuthed)

  useEffect(() => {
    if (!account && back) {
      back()
    }

    setFieldValue('address', account || '')

    queryEthAddressUser({ variables: { ethAddress: account } })
  }, [account])

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

        analytics.identifyUser()

        const token = loginData?.walletLogin.token
        if (isStaticBuild && token) {
          storage.set(STORAGE_KEY_AUTH_TOKEN, token)
        }

        if (loginData?.walletLogin.type === AuthResultType.Login) {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'green',
                content: <Translate id="successLogin" />,
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

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.List
        groupName={
          <Translate
            zh_hans="连接加密钱包"
            zh_hant="連接加密錢包"
            en="Connect Wallet"
          />
        }
      >
        <Form.List.Item title={maskAddress(values.address)} />
      </Form.List>

      <section className="msg">
        <Form.Field.Footer
          fieldMsgId={fieldMsgId}
          hint={
            !errors.address ? (
              <Translate
                zh_hans="若要变更地址，请直接操作钱包切換"
                zh_hant="若要變更地址，請直接操作錢包切換"
                en="To change, switch it directly on your wallet"
              />
            ) : undefined
          }
          error={errors.address}
        />

        <style jsx>{styles}</style>
      </section>

      {isSignUp && (
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
          hint={
            <Translate
              zh_hant="信箱將不作為登入使用，僅作為聯繫渠道"
              zh_hans="邮箱将不作为登入使用，仅作为联系渠道"
              en="Email will not be used as a login but only as a contact channel."
            />
          }
        />
      )}

      {isSignUp && (
        <Form.Input
          label={<Translate id="verificationCode" />}
          type="text"
          name="code"
          required
          placeholder={translate({ id: 'enterVerificationCode', lang })}
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

      {!isSignUp && <Spacer size="loose" />}

      {isSignUp && (
        <Form.CheckBox
          name="tos"
          checked={values.tos}
          error={touched.tos && errors.tos}
          onChange={handleChange}
          hint={
            <>
              <Translate
                zh_hant="我已閱讀並同意"
                zh_hans="我已阅读并同意"
                en="I have read and agree to"
              />

              <Link href={PATHS.TOS}>
                <a className="u-link-green" target="_blank">
                  &nbsp;
                  <Translate
                    zh_hant="Matters 用戶協議和隱私政策"
                    zh_hans="Matters 用户协议和隐私政策"
                    en="Terms and Privacy Policy"
                  />
                </a>
              </Link>
            </>
          }
          required
        />
      )}
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={isSubmitting || loading || !account}
      text={<Translate id="nextStep" />}
      loading={isSubmitting || loading}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton onClick={back} />}
          right={
            <>
              <Layout.Header.Title id="authEntries" />
              {SubmitButton}
            </>
          }
        />

        {InnerForm}

        {isSignUp && <Intro />}
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="authEntries"
          leftButton={back ? <Dialog.Header.BackButton onClick={back} /> : null}
          closeDialog={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>
        {InnerForm}

        {isSignUp && <Intro />}
      </Dialog.Content>
    </>
  )
}

export default Connect
