import React from 'react'

import { Head, Layout, ResponsiveWrapper, Spacer } from '~/components'

import AccountSettings from './Account'
import UISettings from './UI'
import WalletSettings from './Wallet'

const Settings = () => {
  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="settings" />} />
      <Head title={{ id: 'settings' }} />

      <ResponsiveWrapper>
        <UISettings />
        <AccountSettings />
        <WalletSettings />
      </ResponsiveWrapper>

      <Spacer size="xxxloose" />
    </Layout.Main>
  )
}

export default Settings
