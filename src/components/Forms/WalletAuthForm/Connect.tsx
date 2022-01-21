import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import Link from 'next/link'
import { useContext, useEffect } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Layout,
  Translate,
  useMutation,
} from '~/components'

import {
  ADD_TOAST,
  PATHS,
  STORAGE_KEY_AUTH_TOKEN,
  WalletErrorType,
} from '~/common/enums'
import {
  analytics,
  getWalletErrorMessage,
  maskAddress,
  parseFormSubmitErrors,
  redirectToTarget,
  storage,
  validateToS,
} from '~/common/utils'

import { GENERATE_SIGNING_MESSAGE, WALLET_LOGIN } from './gql'

import { AuthResultType } from '@/__generated__/globalTypes'
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
}

const Connect: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
  back,
}) => {
  const { lang } = useContext(LanguageContext)
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

  const { account, library } = useWeb3React<ethers.providers.Web3Provider>()

  useEffect(() => {
    if (!account && back) {
      back()
    }

    setFieldValue('address', account || '')
  }, [account])

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      address: account || '',
      tos: true,
    },
    validate: ({ tos }) =>
      _pickBy({
        tos: validateToS(tos, lang),
      }),
    onSubmit: async ({ address }, { setFieldError, setSubmitting }) => {
      try {
        if (!library || !address) {
          setFieldError(
            'address',
            getWalletErrorMessage({
              type: WalletErrorType.invalidAddress,
              lang,
            })
          )
          setSubmitting(false)
          return
        }

        const { data: signingMessageData } = await generateSigningMessage({
          variables: { address },
        })

        const signingMessage = signingMessageData?.generateSigningMessage
        if (!signingMessage) {
          setFieldError(
            'address',
            getWalletErrorMessage({
              type: WalletErrorType.unknown,
              lang,
            })
          )
          setSubmitting(false)
          return
        }

        const signer = library.getSigner()

        let signature = ''
        try {
          signature = await signer.signMessage(signingMessage.signingMessage)
        } catch (err) {
          setFieldError(
            'address',
            getWalletErrorMessage({
              type: WalletErrorType.userRejectedSignMessage,
              lang,
            })
          )
          setSubmitting(false)
          return
        }

        const { data: loginData } = await walletLogin({
          variables: {
            input: {
              ethAddress: address,
              nonce: signingMessage.nonce,
              signedMessage: signingMessage.signingMessage,
              signature,
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
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('address', messages[codes[0]])
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
        hint={
          <Translate
            zh_hans="若要变更地址，请直接操作钱包切換"
            zh_hant="若要變更地址，請直接操作錢包切換"
            en="To change, switch it directly on your wallet"
          />
        }
      >
        <Form.List.Item title={maskAddress(values.address)} />

        {errors.address && (
          <Form.Field.Footer fieldMsgId={fieldMsgId} error={errors.address} />
        )}
      </Form.List>

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
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={isSubmitting || !account}
      text={<Translate id="nextStep" />}
      loading={isSubmitting}
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

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Connect
