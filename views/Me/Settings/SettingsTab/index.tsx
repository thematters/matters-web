import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

const SettingsTabs: React.FC<WithRouterProps> = ({ router }) => {
  const pathname = router && router.pathname

  return (
    <Tabs>
      <Tabs.Tab selected={pathname === PATHS.ME_SETTINGS_ACCOUNT.href}>
        <Link {...PATHS.ME_SETTINGS_ACCOUNT}>
          <a>
            <Translate
              zh_hant={TEXT.zh_hant.accountSetting}
              zh_hans={TEXT.zh_hans.accountSetting}
            />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.ME_SETTINGS_NOTIFICATION.href}>
        <Link {...PATHS.ME_SETTINGS_NOTIFICATION}>
          <a>
            <Translate
              zh_hant={TEXT.zh_hant.notificationSetting}
              zh_hans={TEXT.zh_hans.notificationSetting}
            />
          </a>
        </Link>
      </Tabs.Tab>
    </Tabs>
  )
}

export default withRouter(SettingsTabs)
