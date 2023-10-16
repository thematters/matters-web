import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useConnect } from 'wagmi'

import { WalletType } from '~/common/utils'
import {
  AuthFeedType,
  AuthNormalFeed,
  AuthTabs,
  AuthWalletFeed,
  DialogBeta,
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
  const injectedConnector = connectors.find((c) => c.id === 'metaMask')

  useEffect(() => {
    if (injectedConnector?.ready && checkWallet) {
      setAuthFeedType('wallet')
    }
  }, [injectedConnector?.ready])

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
      <DialogBeta.Content noMaxHeight={true}>{InnerForm}</DialogBeta.Content>

      {isInDialog && (
        <DialogBeta.Footer
          smUpBtns={
            <DialogBeta.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Close" />}
              onClick={closeDialog}
            />
          }
        />
      )}
    </>
  )
}
