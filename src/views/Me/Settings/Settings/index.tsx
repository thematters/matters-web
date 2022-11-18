import React, { useContext } from 'react'

import {
  Head,
  Layout,
  PullToRefresh,
  Spacer,
  ViewerContext,
} from '~/components'

// import { redirectToLogin } from '~/common/utils'

import ViewerSetting from '../ViewerSettings'
import AccountSettings from './Account'
import UISettings from './UI'
import WalletSettings from './Wallet'

const Settings = () => {
  const viewer = useContext(ViewerContext)

  if (viewer.privateFetched && !viewer.isAuthed) {
    return <ViewerSetting />
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="settings" />}
      />
      <Head title={{ id: 'settings' }} />

      <PullToRefresh>
        <UISettings />
        <AccountSettings />
        <WalletSettings />
      </PullToRefresh>

      <Spacer size="xxxloose" />
    </Layout.Main>
  )
}

export default Settings
