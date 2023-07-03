import gql from 'graphql-tag'

import { PATHS } from '~/common/enums'
import { SegmentedTabs, Spacer, Translate, useRoute } from '~/components'
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

      <SegmentedTabs sticky>
        <SegmentedTabs.Tab
          href={PATHS.ME_HISTORY_LIKES_SENT}
          selected={isInPath('ME_HISTORY_LIKES_SENT')}
        >
          <Translate id="likesSent" />
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          href={PATHS.ME_HISTORY_LIKES_RECEIVED}
          selected={isInPath('ME_HISTORY_LIKES_RECEIVED')}
        >
          <Translate id="likesReceived" />
        </SegmentedTabs.Tab>
      </SegmentedTabs>
    </>
  )
}

LikesTabs.fragments = fragments

export default LikesTabs
