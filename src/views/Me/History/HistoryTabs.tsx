import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { SegmentedTabs, Spacer, useRoute } from '~/components'

const HistoryTabs: React.FC = () => {
  const { isInPath } = useRoute()

  return (
    <>
      <Spacer size="xtight" />

      <SegmentedTabs sticky>
        <SegmentedTabs.Tab
          href={PATHS.ME_HISTORY}
          selected={isInPath('ME_HISTORY')}
        >
          <FormattedMessage
            defaultMessage="Articles"
            description="src/views/Me/History/HistoryTabs.tsx"
          />
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          href={PATHS.ME_HISTORY_LIKES_SENT}
          selected={isInPath('ME_HISTORY_LIKES_SENT')}
        >
          <FormattedMessage defaultMessage="Likes" description="" />
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          href={PATHS.ME_HISTORY_COMMENTS}
          selected={isInPath('ME_HISTORY_COMMENTS')}
        >
          <FormattedMessage defaultMessage="Comments" description="" />
        </SegmentedTabs.Tab>
      </SegmentedTabs>
    </>
  )
}

export default HistoryTabs
