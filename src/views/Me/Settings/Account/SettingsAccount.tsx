import { Head } from '~/components'

import { TEXT } from '~/common/enums'

import AccountSettings from './AccountSettings'
import UISettings from './UISettings'
import WalletSettings from './WalletSettings'

const SettingsAccount = () => {
  return (
    <>
      <Head
        title={{
          zh_hant: TEXT.zh_hant.accountSetting,
          zh_hans: TEXT.zh_hans.accountSetting
        }}
      />

      <AccountSettings />

      <WalletSettings />

      <UISettings />
    </>
  )
}

export default SettingsAccount
