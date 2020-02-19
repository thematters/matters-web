import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

import { AppreciationTabsUserActivity } from './__generated__/AppreciationTabsUserActivity'

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

const AppreciationTabs: React.FC<AppreciationTabsProps> & {
  fragments: typeof fragments
} = ({ activity }) => {
  const router = useRouter()

  return (
    <Tabs>
      <Tabs.Tab
        {...PATHS.ME_APPRECIATIONS_SENT}
        selected={router.pathname === PATHS.ME_APPRECIATIONS_SENT.href}
        sup={activity.appreciationsSentTotal}
      >
        <Translate
          zh_hant={TEXT.zh_hant.appreciationsSent}
          zh_hans={TEXT.zh_hans.appreciationsSent}
        />
      </Tabs.Tab>

      <Tabs.Tab
        {...PATHS.ME_APPRECIATIONS_RECEIVED}
        selected={router.pathname === PATHS.ME_APPRECIATIONS_RECEIVED.href}
        sup={activity.appreciationsReceivedTotal}
      >
        <Translate
          zh_hant={TEXT.zh_hant.appreciationsReceived}
          zh_hans={TEXT.zh_hans.appreciationsReceived}
        />
      </Tabs.Tab>
    </Tabs>
  )
}

AppreciationTabs.fragments = fragments

export default AppreciationTabs
