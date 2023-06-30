import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Spacer, Tabs, useRoute } from '~/components'

const HistoryTabs: React.FC = () => {
  const { isInPath } = useRoute()

  return (
    <>
      <Spacer size="xtight" />

      <Tabs sticky>
        <Tabs.Tab href={PATHS.ME_HISTORY} selected={isInPath('ME_HISTORY')}>
          <FormattedMessage
            defaultMessage="Articles"
            description="src/views/Me/History/HistoryTabs.tsx"
          />
        </Tabs.Tab>

        <Tabs.Tab
          href={PATHS.ME_HISTORY_LIKES_SENT}
          selected={isInPath('ME_HISTORY_LIKES_SENT')}
        >
          <FormattedMessage defaultMessage="Likes" description="" />
        </Tabs.Tab>

        <Tabs.Tab
          href={PATHS.ME_HISTORY_COMMENTS}
          selected={isInPath('ME_HISTORY_COMMENTS')}
        >
          <FormattedMessage defaultMessage="Comments" description="" />
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

export default HistoryTabs
