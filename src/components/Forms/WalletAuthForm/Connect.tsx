import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  LanguageSwitch,
  Layout,
  TextIcon,
  Translate,
  useMutation,
  withIcon,
} from '~/components'

import { ADD_TOAST, PATHS, STORAGE_KEY_AUTH_TOKEN } from '~/common/enums'
import {
  analytics,
  chainName,
  maskAddress,
  redirectToTarget,
  storage,
  validateToS,
} from '~/common/utils'

import { ReactComponent as IconIndicator } from '@/public/static/icons/indicator.svg'

import { GENERATE_SIGNING_MESSAGE, WALLET_LOGIN } from './gql'
import styles from './styles.css'

import { AuthResultType } from '@/__generated__/globalTypes'
import { GenerateSigningMessage } from './__generated__/GenerateSigningMessage'
import { WalletLogin } from './__generated__/WalletLogin'

const isStaticBuild = process.env.NEXT_PUBLIC_BUILD_TYPE === 'static'

interface FormProps {
  purpose: 'dialog' | 'page'
  // submitCallback: () => void
  submitCallback?: (ethAddress: string, type: AuthResultType) => void
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

  const [generateSigningMessage] = useMutation<GenerateSigningMessage>(
    GENERATE_SIGNING_MESSAGE,
    undefined,
    { showToast: false }
  )
  const [walletLogin] = useMutation<WalletLogin>(WALLET_LOGIN, undefined, {
    showToast: false,
  })

  const { account, deactivate, library } =
    useWeb3React<ethers.providers.Web3Provider>()

  const [chainId, setChainId] = useState(0)
  const updateChainId = async () => {
    const id = (await library?.getNetwork())?.chainId

    if (!id) return

    setChainId(id)
  }
  useEffect(() => {
    if (!library) return

    updateChainId()
  }, [library])

  useEffect(() => {
    setFieldValue('address', account)
  }, [account])

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      address: '',
      tos: true,
    },
    validate: ({ tos }) =>
      _pickBy({
        tos: validateToS(tos, lang),
      }),
    onSubmit: async ({ address }, { setFieldError, setSubmitting }) => {
      try {
        if (!library || !account) {
          // TODO: error message
          setFieldError('address', 'eth-address-not-correct')
          setSubmitting(false)
          return
        }

        const { data: signingMessageData } = await generateSigningMessage({
          variables: { address },
        })

        const signingMessage = signingMessageData?.generateSigningMessage
        if (!signingMessage) {
          // TODO: error message
          setFieldError('address', 'signingMessage error')
          setSubmitting(false)
          return
        }

        const signer = library.getSigner()

        let signature = ''
        try {
          signature = await signer.signMessage(signingMessage.signingMessage)
        } catch (err) {
          // TODO: error message
          setFieldError('address', err)
          setSubmitting(false)
          return
        }

        const { data } = await walletLogin({
          variables: {
            input: {
              ethAddress: address,
              nonce: signingMessage.nonce,
              signedMessage: signingMessage.signingMessage,
              signature,
            },
          },
        })

        if (!data) {
          // TODO: error message
          setFieldError('address', 'eth-address-not-correct')
          setSubmitting(false)
          return
        }

        // TODO: only for login/signup
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <Translate id="successLogin" />,
            },
          })
        )
        analytics.identifyUser()

        const token = data.walletLogin.token
        if (isStaticBuild && token) {
          storage.set(STORAGE_KEY_AUTH_TOKEN, token)
        }

        if (data.walletLogin.type === AuthResultType.Login) {
          redirectToTarget({
            fallback: isInPage ? 'homepage' : 'current',
          })
        } else if (submitCallback) {
          submitCallback(address, data.walletLogin.type)
        }
      } catch (err) {
        // TODO: error message
        console.error('ERROR:', err)
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
        <Form.List.Item
          title={maskAddress(account || '')}
          subtitle={
            <TextIcon
              icon={withIcon(IconIndicator)({ size: 'xxs', color: 'green' })}
              spacing="xxtight"
            >
              {chainName[chainId]}
            </TextIcon>
          }
          right={
            <div className={styles.change}>
              <div role="button" onClick={deactivate}>
                <TextIcon size="xs">
                  <Translate zh_hant="變更" zh_hans="变更" en="Edit" />
                </TextIcon>
              </div>
            </div>
          }
          // TODO: disabled={!!error}
        />
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
      disabled={!isValid || isSubmitting}
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
              <Layout.Header.Title id="register" />
              {SubmitButton}
            </>
          }
        />

        {InnerForm}

        <footer>
          <LanguageSwitch />
          <style jsx>{styles}</style>
        </footer>
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
