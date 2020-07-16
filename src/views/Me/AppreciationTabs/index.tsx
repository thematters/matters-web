import { gql } from '@apollo/client'
import { useRouter } from 'next/router'

import { Spacer, Tabs, Translate } from '~/components'

import { PATHS } from '~/common/enums'

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
  `,
}

const AppreciationTabs: React.FC<AppreciationTabsProps> & {
  fragments: typeof fragments
} = ({ activity }) => {
  const router = useRouter()

  return (
    <>
      <Spacer size="xtight" />

      <Tabs>
        <Tabs.Tab
          href={PATHS.ME_APPRECIATIONS_SENT}
          selected={router.pathname === PATHS.ME_APPRECIATIONS_SENT}
        >
          <Translate id="appreciationsSent" />
        </Tabs.Tab>

        <Tabs.Tab
          href={PATHS.ME_APPRECIATIONS_RECEIVED}
          selected={router.pathname === PATHS.ME_APPRECIATIONS_RECEIVED}
        >
          <Translate id="appreciationsReceived" />
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

AppreciationTabs.fragments = fragments

export default AppreciationTabs
