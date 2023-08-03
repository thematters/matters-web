import React from 'react'

import { Head, Layout, Spacer } from '~/components'

import AccountSettings from './Account'
import UISettings from './UI'
import WalletSettings from './Wallet'

const Settings = () => {
  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="settings" />} />
      <Head title={{ id: 'settings' }} />

      <Layout.Main.Spacing>
        <UISettings />
        <AccountSettings />
        <WalletSettings />
      </Layout.Main.Spacing>

      <Spacer size="xxxloose" />
    </Layout.Main>
  )
}

export default Settings
