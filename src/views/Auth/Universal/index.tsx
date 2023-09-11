import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { useConnect } from 'wagmi'

import { ReactComponent as IconMatters } from '@/public/static/images/matters.svg'
import { PATHS } from '~/common/enums'
import { WalletType } from '~/common/utils'
import {
  AuthFeedType,
  LanguageSwitch,
  Spinner,
  useRoute,
  useStep,
  ViewerContext,
  withIcon,
} from '~/components'

import styles from './styles.module.css'

const DynamicSelectAuthMethodForm = dynamic<any>(
  () =>
    import('~/components/Forms/SelectAuthMethodForm').then(
      (mod) => mod.SelectAuthMethodForm
    ),
  { ssr: false, loading: Spinner }
)

// const DynamicEmailLoginForm = dynamic<any>(
//   () =>
//     import('~/components/Forms/EmailLoginForm').then(
//       (mod) => mod.EmailLoginForm
//     ),
//   { ssr: false, loading: Spinner }
// )
// const DynamicEmailSignUpFormInit = dynamic(
//   () => import('~/components/Forms/EmailSignUpForm/Init'),
//   { ssr: false, loading: Spinner }
// )

// const DynamicWalletAuthFormConnect = dynamic(
//   () => import('~/components/Forms/WalletAuthForm/Connect'),
//   { ssr: false, loading: Spinner }
// )

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
  // const [email, setEmail] = useState('')

  const { connectors } = useConnect()
  const injectedConnector = connectors.find((c) => c.id === 'metaMask')
  const [authTypeFeed] = useState<AuthFeedType>(
    injectedConnector?.ready ? 'wallet' : 'normal'
  )

  const [, setWalletType] = useState<WalletType>('MetaMask')

  useEffect(() => {
    if (!viewer.id) return

    router.push(PATHS.HOME)
  }, [viewer.id])

  return (
    <section className={styles.wrapper}>
      {currStep === 'select-login-method' && (
        <section className={styles.container}>
          <section className={styles.logo}>{withIcon(IconMatters)({})}</section>
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
    </section>
  )
}

export default UniversalAuth
