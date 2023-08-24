import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  AuthFeedType,
  AuthNormalFeed,
  AuthTabs,
  AuthWalletFeed,
  Dialog,
} from '~/components'

interface FormProps {
  gotoWalletConnect: () => void
  gotoEmailLogin: () => void
  gotoEmailSignup: () => void
  closeDialog?: () => void
  type?: AuthFeedType
}

export const SelectAuthMethodForm: React.FC<FormProps> = ({
  gotoWalletConnect,
  gotoEmailLogin,
  gotoEmailSignup,
  closeDialog,
  type = 'normal',
}) => {
  const [authTypeFeed, setAuthTypeFeed] = useState<AuthFeedType>(type)
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
      {isWallet && <AuthWalletFeed submitCallback={gotoWalletConnect} />}
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
