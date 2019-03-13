import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS } from '~/common/enums'

const SettingsTabs: React.FC<WithRouterProps> = ({ router }) => {
  const pathname = router && router.pathname

  return (
    <Tabs>
      <Tabs.Tab selected={pathname === PATHS.ME_SETTINGS_ACCOUNT.href}>
        <Link {...PATHS.ME_SETTINGS_ACCOUNT}>
          <a>
            <Translate zh_hant="帳戶設定" zh_hans="账户设定" />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.ME_SETTINGS_NOTIFICATION.href}>
        <Link {...PATHS.ME_SETTINGS_NOTIFICATION}>
          <a>
            <Translate zh_hant="通知設定" zh_hans="通知设定" />
          </a>
        </Link>
      </Tabs.Tab>
    </Tabs>
  )
}

export default withRouter(SettingsTabs)
