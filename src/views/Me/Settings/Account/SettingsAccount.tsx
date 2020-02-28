import { Head } from '~/components'

import AccountSettings from './AccountSettings'
import UISettings from './UISettings'
import WalletSettings from './WalletSettings'

const SettingsAccount = () => {
  return (
    <>
      <Head title={{ id: 'accountSetting' }} />

      <AccountSettings />

      <WalletSettings />

      <UISettings />
    </>
  )
}

export default SettingsAccount
