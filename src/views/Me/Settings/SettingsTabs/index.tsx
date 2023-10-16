import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Tabs, useRoute } from '~/components'

const SettingsTabs: React.FC = () => {
  const { isInPath } = useRoute()

  const isAccount = isInPath('ME_SETTINGS')
  const isNotifications =
    isInPath('ME_SETTINGS_NOTIFICATIONS') ||
    isInPath('ME_SETTINGS_NOTIFICATIONS_CIRCLE')
  const isOthers = isInPath('ME_SETTINGS_MISC')

  return (
    <Tabs>
      <Tabs.Tab href={PATHS.ME_SETTINGS} selected={isAccount}>
        <FormattedMessage
          defaultMessage="Account"
          id="At8Qd2"
          description="src/views/Me/Settings/Settings/SettingsTabs/index.tsx"
        />
      </Tabs.Tab>

      <Tabs.Tab
        href={PATHS.ME_SETTINGS_NOTIFICATIONS}
        selected={isNotifications}
      >
        <FormattedMessage
          defaultMessage="Notifications"
          id="6e8teX"
          description="src/views/Me/Settings/Settings/SettingsTabs/index.tsx"
        />
      </Tabs.Tab>

      <Tabs.Tab href={PATHS.ME_SETTINGS_MISC} selected={isOthers}>
        <FormattedMessage
          defaultMessage="Misc"
          id="6lwWCu"
          description="src/views/Me/Settings/Settings/SettingsTabs/index.tsx"
        />
      </Tabs.Tab>
    </Tabs>
  )
}

export default SettingsTabs
