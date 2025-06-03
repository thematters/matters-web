import router from 'next/router'
import { useEffect, useState } from 'react'
import { useConnect } from 'wagmi'

import {
  BREAKPOINTS,
  CLOSE_ACTIVE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
  TEST_ID,
} from '~/common/enums'
import { analytics, appendTarget, WalletType } from '~/common/utils'
import {
  AuthFeedType,
  Dialog,
  EmailLoginForm,
  EmailSignUpForm,
  SelectAuthMethodForm,
  useDialogSwitch,
  useEventListener,
  useMediaQuery,
  useStep,
  VerificationLinkSent,
  WalletAuthForm,
} from '~/components'

type Step =
  | 'select-login-method'
  // wallet
  | 'wallet-connect'
  // email
  | 'email-login'
  | 'email-sign-up-init'
  | 'email-verification-sent'

const BaseUniversalAuthDialog = () => {
  const { currStep, forward } = useStep<Step>('select-login-method')
  const [email, setEmail] = useState('')
  const [hasUnavailable, setHasUnavailable] = useState(false)
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  const [firstRender, setFirstRender] = useState(true)

  const { connectors } = useConnect()
  const injectedConnector = connectors.find((c) => c.id === 'injected')
  const [authFeedType, setAuthFeedType] = useState<AuthFeedType>('normal')

  const [injectedReady, setInjectedReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const provider = await injectedConnector?.getProvider()
      setInjectedReady(!!provider)
    })()
  }, [injectedConnector])

  useEffect(() => {
    if (injectedConnector && injectedReady && firstRender) {
      setAuthFeedType('wallet')
    }

    setFirstRender(false)
  }, [])

  const [walletType, setWalletType] = useState<WalletType>('MetaMask')

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)

  const closeDialog = () => {
    analytics.trackEvent('authenticate', {
      step:
        currStep === 'email-verification-sent'
          ? 'leaveVerificationSent'
          : 'leave',
    })
    baseCloseDialog()
  }

  const openDialog = () => {
    forward('select-login-method')
    baseOpenDialog()
  }

  useEventListener(CLOSE_ACTIVE_DIALOG, closeDialog)
  useEventListener(
    OPEN_UNIVERSAL_AUTH_DIALOG,
    (payload: { trigger?: string }) => {
      const trigger = payload?.trigger
      analytics.trackEvent('authenticate', {
        step: 'engage',
        ...(trigger ? { trigger } : {}),
      })

      if (isSmUp) {
        openDialog()
        return
      }
      const { href } = appendTarget(PATHS.LOGIN, true)
      router.push(href)
    }
  )

  return (
    <Dialog
      isOpen={show}
      onDismiss={closeDialog}
      testId={TEST_ID.DIALOG_AUTH}
      scrollable
    >
      {currStep === 'select-login-method' && (
        <SelectAuthMethodForm
          purpose="dialog"
          gotoWalletConnect={(type: WalletType) => {
            setWalletType(type)
            forward('wallet-connect')
          }}
          gotoEmailLogin={() => forward('email-login')}
          gotoEmailSignup={() => forward('email-sign-up-init')}
          closeDialog={closeDialog}
          authFeedType={authFeedType}
          setAuthFeedType={setAuthFeedType}
          checkWallet={false}
          hasUnavailable={hasUnavailable}
        />
      )}

      {/* Wallet */}
      {currStep === 'wallet-connect' && (
        <WalletAuthForm.Connect
          type="login"
          purpose="dialog"
          walletType={walletType}
          closeDialog={closeDialog}
          back={() => forward('select-login-method')}
          gotoSignInTab={() => {
            setAuthFeedType('normal')
            forward('select-login-method')
          }}
          setUnavailable={() => {
            setHasUnavailable(true)
          }}
        />
      )}

      {/* Email */}
      {currStep === 'email-login' && (
        <EmailLoginForm
          purpose="dialog"
          closeDialog={closeDialog}
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
          purpose="dialog"
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
          closeDialog={closeDialog}
          back={() => forward('select-login-method')}
        />
      )}
      {currStep === 'email-verification-sent' && (
        <VerificationLinkSent
          type="register"
          purpose="dialog"
          closeDialog={closeDialog}
          email={email}
        />
      )}
    </Dialog>
  )
}

const UniversalAuthDialog = () => {
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(
      OPEN_UNIVERSAL_AUTH_DIALOG,
      (payload: { trigger?: string }) => {
        const trigger = payload?.trigger
        analytics.trackEvent('authenticate', {
          step: 'engage',
          ...(trigger ? { trigger } : {}),
        })

        if (isSmUp) {
          openDialog()
          return
        }
        const { href } = appendTarget(PATHS.LOGIN, true)
        router.push(href)
      }
    )
    return null
  }

  return (
    <Dialog.Lazy mounted={<BaseUniversalAuthDialog />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

export default UniversalAuthDialog
