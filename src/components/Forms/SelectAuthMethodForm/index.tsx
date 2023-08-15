import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useConnect } from 'wagmi'

import { UNIVERSAL_AUTH_SOURCE } from '~/common/enums'
import { AuthTabs, AuthType, Dialog } from '~/components'

import NormalFeed from './NormalFeed'
import WalletFeed from './WalletFeed'

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

  const [type, setAuthType] = useState<AuthType>(
    injectedConnector?.ready ? 'wallet' : 'normal'
  )
  const isNormal = type === 'normal'
  const isWallet = type === 'wallet'

  const InnerForm = (
    <>
      <AuthTabs type={type} setAuthType={setAuthType} />

      {isNormal && (
        <NormalFeed
          gotoEmailSignup={gotoEmailSignup}
          gotoEmailLogin={gotoEmailLogin}
        />
      )}
      {isWallet && <WalletFeed />}
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
