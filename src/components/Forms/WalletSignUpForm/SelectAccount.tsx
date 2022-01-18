import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
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
}

interface FormValues {
  address: string
  tos: boolean
}

const GENERATE_SIGNING_MESSAGE = gql`
  mutation GenerateSigningMessage($address: String!) {
    generateSigningMessage(address: $address) {
      nonce
      signingMessage
      createdAt
      expiredAt
    }
  }
`

const WALLET_LOGIN_MESSAGE = gql`
  mutation WalletLogin($input: WalletLoginInput!) {
    walletLogin(input: $input) {
      token
      auth
      type
    }
  }
`

const SelectAccount: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const { lang } = useContext(LanguageContext)
  // const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'
  const formId = 'wallet-sign-up-select-account-form'

  const [generateSigningMessage] = useMutation<GenerateSigningMessage>(
    GENERATE_SIGNING_MESSAGE,
    undefined,
    {
      showToast: false,
    }
  )
  const [walletLogin] = useMutation<WalletLogin>(
    WALLET_LOGIN_MESSAGE,
    undefined,
    {
      showToast: false,
    }
  )

  const { account, deactivate, library } =
    useWeb3React<ethers.providers.Web3Provider>()
  // const [signing, setSigning] = useState(false)

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
          setFieldError('address', 'eth-address-not-correct')
          return
        }

        const { data: dataSigningMessage } = await generateSigningMessage({
          variables: { address },
        })

        const signingMessage = dataSigningMessage?.generateSigningMessage
        if (!signingMessage) {
          setFieldError('address', 'signingMessage error')
          return
        }

        const signer = library.getSigner()

        let signature = ''
        try {
          signature = await signer.signMessage(signingMessage.signingMessage)
        } catch (err) {
          console.log('signing-error:', err)
          setFieldError('address', err)
          // setSigning(false)
          return
        }

        // setSubmitting(false)

        const { data: signupData } = await walletLogin({
          variables: {
            input: {
              ethAddress: address,
              nonce: signingMessage.nonce,
              signedMessage: signingMessage.signingMessage,
              signature,
            },
          },
        })

        if (!signupData) {
          setFieldError('address', 'eth-address-not-correct')
          return
        }

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <Translate id="successLogin" />,
            },
          })
        )
        analytics.identifyUser()

        const token = signupData.walletLogin.token
        if (isStaticBuild && token) {
          storage.set(STORAGE_KEY_AUTH_TOKEN, token)
        }

        if (signupData.walletLogin.type === AuthResultType.Login) {
          redirectToTarget({
            fallback: isInPage ? 'homepage' : 'current',
          })
        } else if (submitCallback && signupData.walletLogin) {
          submitCallback(address, signupData.walletLogin.type)
        }
      } catch (err) {
        console.error('ERROR:', err)
      } finally {
        setSubmitting(false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
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
        // disabled={!!error}
      />

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
          left={<Layout.Header.BackButton />}
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
          title="register"
          closeDialog={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default SelectAccount
