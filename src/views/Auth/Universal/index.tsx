import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { useConnect } from 'wagmi'

import { PATHS } from '~/common/enums'
import { WalletType } from '~/common/utils'
import {
  AuthFeedType,
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
  { ssr: false, loading: Spinner }
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
  // const { currStep, forward } = useStep<Step>('email-verification-sent')
  const [email, setEmail] = useState('')

  const { connectors } = useConnect()
  const injectedConnector = connectors.find((c) => c.id === 'metaMask')
  const [authTypeFeed, setAuthTypeFeed] = useState<AuthFeedType>(
    injectedConnector?.ready ? 'wallet' : 'normal'
  )

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.containerSpace]: currStep !== 'email-verification-sent',
  })

  const [walletType, setWalletType] = useState<WalletType>('MetaMask')

  useEffect(() => {
    if (!viewer.id) return

    router.push(PATHS.HOME)
  }, [viewer.id])

  return (
    <section className={styles.wrapper}>
      {currStep === 'select-login-method' && (
        <section className={containerClasses}>
          <DynamicSelectAuthMethodForm
            purpose="page"
            gotoWalletConnect={(type: WalletType) => {
              setWalletType(type)
              forward('wallet-connect')
            }}
            gotoEmailLogin={() => forward('email-login')}
            gotoEmailSignup={() => forward('email-sign-up-init')}
            type={authTypeFeed}
          />
          <section className={styles.footer}>
            <LanguageSwitch />
          </section>
        </section>
      )}

      {/* Wallet */}
      {currStep === 'wallet-connect' && (
        <section className={containerClasses}>
          <ReCaptchaProvider>
            <DynamicWalletAuthFormConnect
              type="login"
              purpose="page"
              walletType={walletType}
              back={() => forward('select-login-method')}
              gotoSignInTab={() => {
                setAuthTypeFeed('normal')
                forward('select-login-method')
              }}
            />
          </ReCaptchaProvider>
        </section>
      )}

      {/* Email */}
      {currStep === 'email-login' && (
        <section className={containerClasses}>
          <DynamicEmailLoginForm
            purpose="page"
            gotoEmailSignup={() => forward('email-sign-up-init')}
            back={() => forward('select-login-method')}
          />
        </section>
      )}

      {currStep === 'email-sign-up-init' && (
        <ReCaptchaProvider>
          <section className={containerClasses}>
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
              gotoEmailLogin={() => forward('email-login')}
              back={() => forward('select-login-method')}
            />
          </section>
        </ReCaptchaProvider>
      )}
      {currStep === 'email-verification-sent' && (
        <section className={containerClasses}>
          <VerificationLinkSent purpose="page" email={email} />
        </section>
      )}
    </section>
  )
}

export default UniversalAuth
