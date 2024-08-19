import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import { PATHS } from '~/common/enums'
import { analytics, redirectToTarget, WalletType } from '~/common/utils'
import {
  AuthFeedType,
  EmailLoginForm,
  EmailSignUpForm,
  Head,
  LanguageSwitch,
  SelectAuthMethodForm,
  useRoute,
  useStep,
  VerificationLinkSent,
  ViewerContext,
  WalletAuthForm,
} from '~/components'

import styles from './styles.module.css'

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
  const { router, isInPath } = useRoute()

  const isInSignup = isInPath('SIGNUP')

  const { currStep, forward } = useStep<Step>(
    isInSignup ? 'email-sign-up-init' : 'select-login-method'
  )
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

    redirectToTarget({ fallback: 'homepage' })
  }, [viewer.id])

  useEffect(() => {
    setFirstRender(false)
  }, [])

  useEffect(() => {
    const track = (url: string) => {
      const as = window?.history?.state?.as
      if (url === as || url === PATHS.HOME) {
        analytics.trackEvent('authenticate', {
          step:
            currStep === 'email-verification-sent'
              ? 'leaveVerificationSent'
              : 'leave',
        })
      }
    }
    router.events.on('routeChangeStart', track)
    return () => {
      router.events.off('routeChangeStart', track)
    }
  }, [currStep])

  return (
    <>
      <Head />

      <section className={styles.wrapper}>
        <section className={containerClasses}>
          {currStep === 'select-login-method' && (
            <>
              <SelectAuthMethodForm
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
            <WalletAuthForm.Connect
              type="login"
              purpose="page"
              walletType={walletType}
              back={() => forward('select-login-method')}
              gotoSignInTab={() => {
                setAuthFeedType('normal')
                forward('select-login-method')
              }}
            />
          )}

          {/* Email */}
          {currStep === 'email-login' && (
            <EmailLoginForm
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
            <EmailSignUpForm.Init
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
