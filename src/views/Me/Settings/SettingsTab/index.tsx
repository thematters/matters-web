import { useRouter } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS } from '~/common/enums'

const SettingsTabs = () => {
  const router = useRouter()

  return (
    <Tabs spacingBottom="xxloose">
      <Tabs.Tab
        {...PATHS.ME_SETTINGS_ACCOUNT}
        selected={router.pathname === PATHS.ME_SETTINGS_ACCOUNT.href}
      >
        <Translate id="accountSetting" />
      </Tabs.Tab>

      <Tabs.Tab
        {...PATHS.ME_SETTINGS_NOTIFICATION}
        selected={router.pathname === PATHS.ME_SETTINGS_NOTIFICATION.href}
      >
        <Translate id="notificationSetting" />
      </Tabs.Tab>

      <Tabs.Tab
        {...PATHS.ME_SETTINGS_BLOCKED}
        selected={router.pathname === PATHS.ME_SETTINGS_BLOCKED.href}
      >
        <Translate id="blockedSetting" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default SettingsTabs
