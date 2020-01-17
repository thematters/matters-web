import { useRouter } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

const SettingsTabs = () => {
  const router = useRouter()

  return (
    <Tabs>
      <Tabs.Tab
        {...PATHS.ME_SETTINGS_ACCOUNT}
        selected={router.pathname === PATHS.ME_SETTINGS_ACCOUNT.href}
      >
        <Translate
          zh_hant={TEXT.zh_hant.accountSetting}
          zh_hans={TEXT.zh_hans.accountSetting}
        />
      </Tabs.Tab>

      <Tabs.Tab
        {...PATHS.ME_SETTINGS_NOTIFICATION}
        selected={router.pathname === PATHS.ME_SETTINGS_NOTIFICATION.href}
      >
        <Translate
          zh_hant={TEXT.zh_hant.notificationSetting}
          zh_hans={TEXT.zh_hans.notificationSetting}
        />
      </Tabs.Tab>

      <Tabs.Tab
        {...PATHS.ME_SETTINGS_BLOCKED}
        selected={router.pathname === PATHS.ME_SETTINGS_BLOCKED.href}
      >
        <Translate
          zh_hant={TEXT.zh_hant.blockedSetting}
          zh_hans={TEXT.zh_hans.blockedSetting}
        />
      </Tabs.Tab>
    </Tabs>
  )
}

export default SettingsTabs
