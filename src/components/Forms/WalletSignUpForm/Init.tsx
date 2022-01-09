import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import Link from 'next/link'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  LanguageSwitch,
  Layout,
  // ReCaptchaContext,
  Translate,
  useMutation,
} from '~/components'

import {
  // CLOSE_ACTIVE_DIALOG, OPEN_LOGIN_DIALOG,
  PATHS,
  STORAGE_KEY_AUTH_TOKEN,
} from '~/common/enums'
import {
  // appendTarget,
  // parseFormSubmitErrors,
  storage,
  translate,
  // validateDisplayName,
  // validateEmail,
  validateToS,
} from '~/common/utils'

import styles from './styles.css'

// import { SendVerificationCode } from '~/components/GQL/mutations/__generated__/SendVerificationCode'
import { GenerateSigningMessage } from './__generated__/GenerateSigningMessage'
import { WalletLogin } from './__generated__/WalletLogin'

const isStaticBuild = process.env.NEXT_PUBLIC_BUILD_TYPE === 'static'

interface FormProps {
  purpose: 'dialog' | 'page'
  // submitCallback: () => void
  submitCallback?: (ethAddress: string) => void
  closeDialog?: () => void
}

interface FormValues {
  // displayName: string
  // email: string
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

const WALLET_SIGNUP_MESSAGE = gql`
  mutation WalletLogin($input: WalletLoginInput!) {
    walletLogin(input: $input) {
      token
      auth
    }
  }
`

const Init: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const { lang } = useContext(LanguageContext)
  // const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'
  const formId = 'wallet-sign-up-init-form'

  const [generateSigningMessage] = useMutation<GenerateSigningMessage>(
    GENERATE_SIGNING_MESSAGE,
    undefined,
    {
      showToast: false,
    }
  )
  const [walletSignup] = useMutation<WalletLogin>(
    WALLET_SIGNUP_MESSAGE,
    undefined,
    {
      showToast: false,
    }
  )

  const { account, library } = useWeb3React<ethers.providers.Web3Provider>()
  // const [signing, setSigning] = useState(false)

  // const address = account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ''

  // const { token, refreshToken } = useContext(ReCaptchaContext)

  /* const handleChange = (params) => {
    console.log('handleChange:', params)
  } */

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik<FormValues>({
    initialValues: {
      address: account ?? '',
      tos: false,
    },
    validate: ({ address, tos }) =>
      _pickBy({
        // displayName: validateDisplayName(displayName, lang),
        // email: validateEmail(email, lang, { allowPlusSign: false }),
        tos: validateToS(tos, lang),
        // code: validateCode(code, lang),
      }),
    onSubmit: async ({ address }, { setFieldError, setSubmitting }) => {
      try {
        if (!library || !account) {
          setFieldError('address', 'eth-address-not-correct')
          return
        }

        const { data } = await generateSigningMessage({
          variables: { address },
        })

        const signingMessage = data?.generateSigningMessage
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

        const result = await walletSignup({
          variables: {
            input: {
              ethAddress: address,
              nonce: signingMessage.nonce,
              signedMessage: signingMessage.signingMessage,
              signature,
            },
          },
        })

        console.log('wallet-signup-result:', result)

        const token = result.data?.walletLogin.token
        if (isStaticBuild && token) {
          storage.set(STORAGE_KEY_AUTH_TOKEN, token)
        }

        if (submitCallback && data && result.data?.walletLogin) {
          submitCallback(address)
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
      <Form.Input
        label={
          <Translate
            en="Wallet Account"
            zh_hant="Wallet Account"
            zh_hans="Wallet Account"
          />
        }
        type="text"
        name="ethAddress"
        required
        placeholder={translate({
          // zh_hant: '你的站內暱稱，之後可以修改',
          // zh_hans: '你的站内暱称，之后可以修改',
          en: 'Your Wallet',
          zh_hant: 'Your Wallet',
          zh_hans: 'Your Wallet',
          lang,
        })}
        // value={values.displayName}
        value={values.address}
        error={touched.address && errors.address}
        onBlur={handleBlur}
        onChange={handleChange}
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

      {/* isInDialog && <LoginDialogButton /> */}
      {/* isInPage && <LoginRedirectionButton /> */}
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

export default Init
