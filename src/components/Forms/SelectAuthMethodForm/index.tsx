import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useConnect } from 'wagmi'

import {
  AuthFeedType,
  AuthNormalFeed,
  AuthTabs,
  AuthWalletFeed,
  Dialog,
} from '~/components'

interface FormProps {
  gotoWalletAuth: () => void
  gotoEmailLogin: () => void
  gotoEmailSignup: () => void
  closeDialog?: () => void
}

export const SelectAuthMethodForm: React.FC<FormProps> = ({
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
