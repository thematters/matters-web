import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useConnect } from 'wagmi'

import { UNIVERSAL_AUTH_SOURCE } from '~/common/enums'
import { Dialog, LanguageSwitch, Layout } from '~/components'

import AuthTabs, { AuthType } from './AuthTabs'
import NormalFeed from './NormalFeed'
import styles from './styles.module.css'
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
  const isInPage = purpose === 'page'
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

      {isNormal && <NormalFeed gotoEmailSignup={gotoEmailSignup} />}
      {isWallet && <WalletFeed />}
    </>
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header left={<Layout.Header.Title id="authEntries" />} />

        <Layout.Main.Spacing>{InnerForm}</Layout.Main.Spacing>

        <footer className={styles.footer}>
          <LanguageSwitch />
        </footer>
      </>
    )
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
