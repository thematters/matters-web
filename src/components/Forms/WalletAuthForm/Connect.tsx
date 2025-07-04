import { ApolloError } from '@apollo/client'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import baseToast from 'react-hot-toast'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'

import IconLeft from '@/public/static/icons/24px/left.svg'
import IconMetaMask from '@/public/static/icons/24px/metamask.svg'
import IconWalletConnect from '@/public/static/icons/24px/walletconnect.svg'
import {
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  ERROR_CODES,
  REFERRAL_QUERY_REFERRAL_KEY,
  REFERRAL_STORAGE_REFERRAL_CODE,
  WALLET_ERROR_MESSAGES,
} from '~/common/enums'
import {
  parseFormSubmitErrors,
  setCookies,
  storage,
  truncate,
  WalletType,
} from '~/common/utils'
import {
  AuthFeedType,
  AuthTabs,
  Dialog,
  Icon,
  LanguageContext,
  Media,
  Spinner,
  TextIcon,
  toast,
  useMutation,
  useRoute,
} from '~/components'
import { GENERATE_SIGNING_MESSAGE } from '~/components/GQL/mutations/generateSigningMessage'
import {
  ADD_WALLET_LOGIN,
  WALLET_LOGIN,
} from '~/components/GQL/mutations/walletLogin'
import {
  AddWalletLoginMutation,
  AuthResultType,
  GenerateSigningMessageMutation,
  WalletLoginMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

interface FormProps {
  type: 'login' | 'connect'
  purpose: 'dialog' | 'page'
  walletType?: WalletType
  submitCallback?: (type?: AuthResultType) => void
  closeDialog?: () => void
  back?: () => void
  gotoSignInTab?: () => void
  setHasWalletExist?: () => void
  setUnavailable?: () => void
}

interface FormValues {
  address: string
}

const Connect: React.FC<FormProps> = ({
  type,
  purpose,
  walletType,
  submitCallback,
  closeDialog,
  back,
  gotoSignInTab,
  setHasWalletExist,
  setUnavailable,
}) => {
  const isInDialog = purpose === 'dialog'

  const intl = useIntl()
  const { lang } = useContext(LanguageContext)
  const isLogin = type === 'login'
  const isConnect = type === 'connect'

  const { getQuery } = useRoute()
  const referralCode =
    getQuery(REFERRAL_QUERY_REFERRAL_KEY) ||
    storage.get<{ referralCode: string }>(REFERRAL_STORAGE_REFERRAL_CODE)
      ?.referralCode ||
    undefined

  const [authTypeFeed] = useState<AuthFeedType>('wallet')

  const isMetamask = walletType === 'MetaMask'
  const isWalletConnect = walletType === 'WalletConnect'

  const [generateSigningMessage] = useMutation<GenerateSigningMessageMutation>(
    GENERATE_SIGNING_MESSAGE,
    undefined,
    { showToast: false }
  )
  const [walletLogin, { client }] = useMutation<WalletLoginMutation>(
    WALLET_LOGIN,
    {
      onCompleted: () => {
        client?.resetStore()
        baseToast.dismiss()
      },
    },
    {
      showToast: false,
    }
  )

  const [addWalletLogin] = useMutation<AddWalletLoginMutation>(
    ADD_WALLET_LOGIN,
    undefined,
    {
      showToast: false,
    }
  )

  const { disconnect, disconnectAsync } = useDisconnect()
  const { address: account } = useAccount()
  const { signMessageAsync } = useSignMessage()

  useEffect(() => {
    if (!account && back) {
      back()
    }

    setFieldValue('address', account || '')

    handleSubmit()
  }, [account])

  // disconnect before go back to previous step
  const onBack = async () => {
    await disconnectAsync()

    if (back) {
      back()
    }
  }

  const onCloseDialog = () => {
    disconnect()
    if (closeDialog) {
      closeDialog()
    }
  }

  const { values, handleSubmit, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      address: account || '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ address }, { setFieldError, setSubmitting }) => {
      try {
        if (!address) {
          setFieldError('address', WALLET_ERROR_MESSAGES[lang].invalidAddress)
          setSubmitting(false)
          return
        }

        // get signing message
        const { data: signingMessageData } = await generateSigningMessage({
          variables: { input: { address, purpose: type } },
        })

        const signingMessage = signingMessageData?.generateSigningMessage
        if (!signingMessage) {
          setFieldError('address', WALLET_ERROR_MESSAGES[lang].unknown)
          onBack()
          setSubmitting(false)
          return
        }

        // let user sign the message
        let signature = ''
        try {
          signature = await signMessageAsync({
            message: signingMessage.signingMessage,
          })
        } catch {
          setFieldError(
            'address',
            WALLET_ERROR_MESSAGES[lang].userRejectedSignMessage
          )
          onBack()
          setSubmitting(false)
          return
        }

        const variables = {
          input: {
            ethAddress: address,
            nonce: signingMessage.nonce,
            signedMessage: signingMessage.signingMessage,
            signature,
          },
        }

        if (isLogin) {
          // confirm auth
          const { data: loginData } = await walletLogin({
            variables: {
              input: {
                ...variables.input,
                language: lang,
                // referralCode,
                ...(referralCode ? { referralCode } : null),
              },
            },
          })

          if (isLocal || process.env.NEXT_PUBLIC_VERCEL) {
            const token = loginData?.walletLogin.token || ''
            const language =
              loginData?.walletLogin.user?.settings.language || ''
            const group = loginData?.walletLogin.user?.info.group || ''
            setCookies({
              [COOKIE_LANGUAGE]: language,
              [COOKIE_USER_GROUP]: group,
              [COOKIE_TOKEN_NAME]: token,
            })
          }

          if (
            loginData?.walletLogin.type === AuthResultType.Login ||
            loginData?.walletLogin.type === AuthResultType.Signup
          ) {
            closeDialog?.()
          } else if (submitCallback) {
            submitCallback(loginData?.walletLogin.type)
          }
        }

        if (isConnect) {
          await addWalletLogin({ variables })

          toast.info({
            message: (
              <FormattedMessage
                defaultMessage="Wallet connected"
                id="KlJEP9"
                description="src/components/Forms/WalletAuthForm/Connect.tsx"
              />
            ),
          })

          if (submitCallback) {
            submitCallback()
          } else if (closeDialog) {
            closeDialog()
          }
        }
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error as ApolloError)
        codes.forEach((code) => {
          if (code.includes('CODE_')) {
            setFieldError('code', intl.formatMessage(messages[code]))
          } else if (code.includes(ERROR_CODES.CRYPTO_WALLET_EXISTS)) {
            disconnect()
            if (setHasWalletExist) {
              setHasWalletExist()
            }
          } else if (code.includes(ERROR_CODES.FORBIDDEN_BY_STATE)) {
            disconnect()
            if (setUnavailable) {
              setUnavailable()
            }
          } else {
            disconnect()
            setFieldError('address', intl.formatMessage(messages[code]))
          }
        })
      }

      setSubmitting(false)
    },
  })

  return (
    <>
      {isLogin && (
        <Dialog.Header
          title={<>{isMetamask ? 'MetaMask' : 'WalletConnect'}</>}
          hasSmUpTitle={false}
          leftBtn={
            back ? (
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
                onClick={onBack}
                color="greyDarker"
              />
            ) : null
          }
          closeDialog={onCloseDialog}
        />
      )}

      <Dialog.Content>
        {isLogin && (
          <Media greaterThan="sm">
            <AuthTabs
              purpose={purpose}
              type={authTypeFeed}
              setType={(type) => {
                if (type === 'normal') {
                  disconnect()
                  if (gotoSignInTab) {
                    gotoSignInTab()
                  }
                }
              }}
            />
          </Media>
        )}
        <section className={styles.walletInfo}>
          <span className={styles.icon}>
            {isMetamask && <Icon icon={IconMetaMask} size={22} />}
            {isWalletConnect && <Icon icon={IconWalletConnect} size={22} />}
          </span>
          <span className={styles.address}>{truncate(values.address)}</span>
        </section>
        <section className={styles.loadingInfo}>
          <span>
            <Spinner color="grey" size={22} />
          </span>
          <span>
            <FormattedMessage
              defaultMessage="Please sign message in your wallet"
              id="WDZndZ"
              description="src/components/Forms/WalletAuthForm/Connect.tsx"
            />
          </span>
        </section>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <section className={styles.footerSmUpBtns}>
            <Dialog.TextButton
              text={
                <TextIcon icon={<Icon icon={IconLeft} size={20} />} spacing={2}>
                  <FormattedMessage
                    defaultMessage="Switch wallet"
                    id="HkozYU"
                    description="src/components/Forms/WalletAuthForm/Connect.tsx"
                  />
                </TextIcon>
              }
              color="greyDarker"
              onClick={onBack}
            />

            {isInDialog && (
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                color="greyDarker"
                onClick={onCloseDialog}
              />
            )}
          </section>
        }
      />
    </>
  )
}

export default Connect
