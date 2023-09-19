import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import { PATHS } from '~/common/enums'
import { WalletType } from '~/common/utils'
import {
  AuthFeedType,
  Head,
  LanguageSwitch,
  ReCaptchaProvider,
  Spinner,
  useRoute,
  useStep,
  VerificationLinkSent,
  ViewerContext,
} from '~/components'

import styles from './styles.module.css'

const DynamicSelectAuthMethodForm = dynamic<any>(
  () =>
    import('~/components/Forms/SelectAuthMethodForm').then(
      (mod) => mod.SelectAuthMethodForm
    ),
  { ssr: true }
)

const DynamicEmailLoginForm = dynamic<any>(
  () =>
    import('~/components/Forms/EmailLoginForm').then(
      (mod) => mod.EmailLoginForm
    ),
  { ssr: false, loading: Spinner }
)
const DynamicEmailSignUpFormInit = dynamic(
  () => import('~/components/Forms/EmailSignUpForm/Init'),
  { ssr: false, loading: Spinner }
)

const DynamicWalletAuthFormConnect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Connect'),
  { ssr: false, loading: Spinner }
)

type Step =
  | 'select-login-method'
  // wallet
  | 'wallet-connect'
  // email
  | 'email-login'
  | 'email-sign-up-init'
  | 'email-verification-sent'

const UniversalAuth = () => {
  const viewer = useContext(ViewerContext)
  const { router } = useRoute()

  const { currStep, forward } = useStep<Step>('select-login-method')
  const [email, setEmail] = useState('')

  const [firstRender, setFirstRender] = useState(true)
  const [authFeedType, setAuthFeedType] = useState<AuthFeedType>('normal')

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.containerSpace]: currStep !== 'email-verification-sent',
  })

  const [walletType, setWalletType] = useState<WalletType>('MetaMask')

  useEffect(() => {
    if (!viewer.id) return

    router.push(PATHS.HOME)
  }, [viewer.id])

  useEffect(() => {
    setFirstRender(false)
  }, [])

  return (
    <>
      <Head />
      <section className={styles.wrapper}>
        <section className={containerClasses}>
          {currStep === 'select-login-method' && (
            <>
              <DynamicSelectAuthMethodForm
                purpose="page"
                gotoWalletConnect={(type: WalletType) => {
                  setWalletType(type)
                  forward('wallet-connect')
                }}
                gotoEmailLogin={() => forward('email-login')}
                gotoEmailSignup={() => forward('email-sign-up-init')}
                authFeedType={authFeedType}
                setAuthFeedType={setAuthFeedType}
                checkWallet={firstRender}
              />
              <section className={styles.footer}>
                <LanguageSwitch />
              </section>
            </>
          )}

          {/* Wallet */}
          {currStep === 'wallet-connect' && (
            <ReCaptchaProvider>
              <DynamicWalletAuthFormConnect
                type="login"
                purpose="page"
                walletType={walletType}
                back={() => forward('select-login-method')}
                gotoSignInTab={() => {
                  setAuthFeedType('normal')
                  forward('select-login-method')
                }}
              />
            </ReCaptchaProvider>
          )}

          {/* Email */}
          {currStep === 'email-login' && (
            <DynamicEmailLoginForm
              purpose="page"
              gotoEmailSignup={() => forward('email-sign-up-init')}
              gotoWalletConnect={(type: WalletType) => {
                setWalletType(type)
                forward('wallet-connect')
              }}
              authFeedType={authFeedType}
              setAuthFeedType={setAuthFeedType}
              back={() => forward('select-login-method')}
            />
          )}

          {currStep === 'email-sign-up-init' && (
            <ReCaptchaProvider>
              <DynamicEmailSignUpFormInit
                purpose="page"
                submitCallback={(email: string) => {
                  setEmail(email)
                  forward('email-verification-sent')
                }}
                gotoWalletConnect={(type) => {
                  setWalletType(type)
                  forward('wallet-connect')
                }}
                authFeedType={authFeedType}
                setAuthFeedType={setAuthFeedType}
                back={() => forward('select-login-method')}
              />
            </ReCaptchaProvider>
          )}
          {currStep === 'email-verification-sent' && (
            <VerificationLinkSent
              type="register"
              purpose="page"
              email={email}
            />
          )}
        </section>
      </section>
    </>
  )
}

export default UniversalAuth
