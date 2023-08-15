import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useConnect } from 'wagmi'

import { UNIVERSAL_AUTH_SOURCE } from '~/common/enums'
import {
  AuthFeedType,
  AuthNormalFeed,
  AuthTabs,
  AuthWalletFeed,
  Dialog,
} from '~/components'

interface FormProps {
  purpose: 'dialog' | 'page'
  source: UNIVERSAL_AUTH_SOURCE
  gotoWalletAuth: () => void
  gotoEmailLogin: () => void
  gotoEmailSignup: () => void
  closeDialog?: () => void
}

export const SelectAuthMethodForm: React.FC<FormProps> = ({
  purpose,
  source,
  gotoWalletAuth,
  gotoEmailLogin,
  gotoEmailSignup,
  closeDialog,
}) => {
  const { connectors } = useConnect()
  const injectedConnector = connectors.find((c) => c.id === 'metaMask')

  const [authTypeFeed, setAuthTypeFeed] = useState<AuthFeedType>(
    injectedConnector?.ready ? 'wallet' : 'normal'
  )
  const isNormal = authTypeFeed === 'normal'
  const isWallet = authTypeFeed === 'wallet'

  const InnerForm = (
    <>
      <AuthTabs type={authTypeFeed} setType={setAuthTypeFeed} />

      {isNormal && (
        <AuthNormalFeed
          gotoEmailSignup={gotoEmailSignup}
          gotoEmailLogin={gotoEmailLogin}
        />
      )}
      {isWallet && <AuthWalletFeed />}
    </>
  )

  return (
    <>
      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            color="greyDarker"
            text={<FormattedMessage defaultMessage="Close" />}
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}
