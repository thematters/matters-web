import gql from 'graphql-tag'

import { PATHS } from '~/common/enums'
import { Spacer, Tabs, Translate, useRoute } from '~/components'
import { LikesTabsUserActivityFragment } from '~/gql/graphql'

interface LikesTabsProps {
  activity: LikesTabsUserActivityFragment
}

const fragments = {
  userActivity: gql`
    fragment LikesTabsUserActivity on UserActivity {
      likesSentTotal: appreciationsSentTotal
      likesReceivedTotal: appreciationsReceivedTotal
    }
  `,
}

const LikesTabs: React.FC<LikesTabsProps> & {
  fragments: typeof fragments
} = ({ activity }) => {
  const { isInPath } = useRoute()

  return (
    <>
      <Spacer size="xtight" />

      <Tabs sticky>
        <Tabs.Tab
          href={PATHS.ME_LIKES_SENT}
          selected={isInPath('ME_LIKES_SENT')}
        >
          <Translate id="likesSent" />
        </Tabs.Tab>

        <Tabs.Tab
          href={PATHS.ME_LIKES_RECEIVED}
          selected={isInPath('ME_LIKES_RECEIVED')}
        >
          <Translate id="likesReceived" />
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

LikesTabs.fragments = fragments

export default LikesTabs
