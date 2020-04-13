import { Layout } from '~/components'

import AccountSettings from './Account'
import UISettings from './UI'
import WalletSettings from './Wallet'

const Settings = () => {
  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="settings" />}
      />

      <UISettings />
      <AccountSettings />
      <WalletSettings />
    </Layout.Main>
  )
}

export default Settings
