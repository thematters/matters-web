import gql from 'graphql-tag'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

import { AppreciationTabsUserActivity } from './__generated__/AppreciationTabsUserActivity'
import styles from './styles.css'

interface AppreciationTabsProps {
  activity: AppreciationTabsUserActivity
}

const fragments = {
  userActivity: gql`
    fragment AppreciationTabsUserActivity on UserActivity {
      appreciationsSentTotal
      appreciationsReceivedTotal
    }
  `
}

const BaseAppreciationTabs: React.FC<
  WithRouterProps & AppreciationTabsProps
> = ({ router, activity }) => {
  const pathname = router && router.pathname

  return (
    <>
      <Tabs layout="horizontal">
        <Tabs.Tab selected={pathname === PATHS.ME_APPRECIATIONS_SENT.href}>
          <Link {...PATHS.ME_APPRECIATIONS_SENT}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.appreciationsSent}
                zh_hans={TEXT.zh_hans.appreciationsSent}
              />
            </a>
          </Link>
          <sup className="count">{activity.appreciationsSentTotal}</sup>
        </Tabs.Tab>
        <Tabs.Tab selected={pathname === PATHS.ME_APPRECIATIONS_RECEIVED.href}>
          <Link {...PATHS.ME_APPRECIATIONS_RECEIVED}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.appreciationsReceived}
                zh_hans={TEXT.zh_hans.appreciationsReceived}
              />
            </a>
          </Link>
          <sup className="count">{activity.appreciationsReceivedTotal}</sup>
        </Tabs.Tab>
      </Tabs>
      <style jsx>{styles}</style>
    </>
  )
}

const AppreciationTabs: any = withRouter(BaseAppreciationTabs)

AppreciationTabs.fragments = fragments

export default AppreciationTabs
