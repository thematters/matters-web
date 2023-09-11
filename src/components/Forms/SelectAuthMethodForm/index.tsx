import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

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
  gotoWalletConnect: (type: WalletType) => void
  gotoEmailLogin: () => void
  gotoEmailSignup: () => void
  closeDialog?: () => void
  type?: AuthFeedType
}

export const SelectAuthMethodForm: React.FC<FormProps> = ({
  purpose,
  gotoWalletConnect,
  gotoEmailLogin,
  gotoEmailSignup,
  closeDialog,
  type = 'normal',
}) => {
  const isInPage = purpose === 'page'
  const [authTypeFeed, setAuthTypeFeed] = useState<AuthFeedType>(type)
  const isNormal = authTypeFeed === 'normal'
  const isWallet = authTypeFeed === 'wallet'

  const InnerForm = (
    <>
      <AuthTabs
        type={authTypeFeed}
        setType={setAuthTypeFeed}
        purpose={purpose}
      />

      {isNormal && (
        <AuthNormalFeed
          gotoEmailSignup={gotoEmailSignup}
          gotoEmailLogin={gotoEmailLogin}
        />
      )}
      {isWallet && <AuthWalletFeed submitCallback={gotoWalletConnect} />}
    </>
  )

  if (isInPage) {
    return <>{InnerForm}</>
  }

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
