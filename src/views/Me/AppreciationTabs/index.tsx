import gql from 'graphql-tag'

import { PATHS } from '~/common/enums'
import { Spacer, Tabs, Translate, useRoute } from '~/components'
import { AppreciationTabsUserActivityFragment } from '~/gql/graphql'

interface AppreciationTabsProps {
  activity: AppreciationTabsUserActivityFragment
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
  const { isInPath } = useRoute()

  return (
    <>
      <Spacer size="xtight" />

      <Tabs sticky>
        <Tabs.Tab
          href={PATHS.ME_APPRECIATIONS_SENT}
          selected={isInPath('ME_APPRECIATIONS_SENT')}
        >
          <Translate id="appreciationsSent" />
        </Tabs.Tab>

        <Tabs.Tab
          href={PATHS.ME_APPRECIATIONS_RECEIVED}
          selected={isInPath('ME_APPRECIATIONS_RECEIVED')}
        >
          <Translate id="appreciationsReceived" />
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

AppreciationTabs.fragments = fragments

export default AppreciationTabs
