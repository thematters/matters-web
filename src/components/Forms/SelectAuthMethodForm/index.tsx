import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useConnect } from 'wagmi'

import { WalletType } from '~/common/utils'
import {
  AuthFeedType,
  AuthNormalFeed,
  AuthTabs,
  AuthWalletFeed,
  Dialog,
} from '~/components'

interface FormProps {
  purpose: 'dialog' | 'page'
  checkWallet: boolean
  gotoWalletConnect: (type: WalletType) => void
  gotoEmailLogin: () => void
  gotoEmailSignup: () => void

  authFeedType: AuthFeedType
  setAuthFeedType: (type: AuthFeedType) => void

  hasUnavailable?: boolean
  closeDialog?: () => void
}

export const SelectAuthMethodForm: React.FC<FormProps> = ({
  purpose,
  gotoWalletConnect,
  gotoEmailLogin,
  gotoEmailSignup,
  closeDialog,
  authFeedType = 'normal',
  setAuthFeedType,
  checkWallet,
  hasUnavailable,
}) => {
  const isInDialog = purpose === 'dialog'
  const isNormal = authFeedType === 'normal'
  const isWallet = authFeedType === 'wallet'

  const { connectors } = useConnect()
  const injectedConnector = connectors.find((c) => c.id === 'injected')

  const [injectedReady, setInjectedReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const provider = await injectedConnector?.getProvider()
      setInjectedReady(!!provider)
    })()
  }, [injectedConnector])

  useEffect(() => {
    if (injectedConnector && injectedReady && checkWallet) {
      setAuthFeedType('wallet')
    }
  }, [injectedConnector, injectedReady, checkWallet])

  const InnerForm = (
    <>
      <AuthTabs
        type={authFeedType}
        setType={setAuthFeedType}
        purpose={purpose}
      />

      {isNormal && (
        <AuthNormalFeed
          gotoEmailSignup={gotoEmailSignup}
          gotoEmailLogin={gotoEmailLogin}
        />
      )}
      {isWallet && (
        <AuthWalletFeed
          submitCallback={gotoWalletConnect}
          hasUnavailable={hasUnavailable}
        />
      )}
    </>
  )

  return (
    <>
      <Dialog.Content noMaxHeight>{InnerForm}</Dialog.Content>

      {isInDialog && (
        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
              onClick={closeDialog}
            />
          }
        />
      )}
    </>
  )
}
