import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Tabs, useRoute } from '~/components'

const HistoryTabs: React.FC = () => {
  const { isInPath } = useRoute()

  const isLike =
    isInPath('ME_HISTORY_LIKES_SENT') || isInPath('ME_HISTORY_LIKES_RECEIVED')

  return (
    <Tabs>
      <Tabs.Tab href={PATHS.ME_HISTORY} selected={isInPath('ME_HISTORY')}>
        <FormattedMessage
          defaultMessage="Articles"
          id="xMaFCO"
          description="src/views/Me/History/HistoryTabs.tsx"
        />
      </Tabs.Tab>

      <Tabs.Tab href={PATHS.ME_HISTORY_LIKES_SENT} selected={isLike}>
        <FormattedMessage defaultMessage="Likes" id="2slIPX" />
      </Tabs.Tab>

      <Tabs.Tab
        href={PATHS.ME_HISTORY_COMMENTS}
        selected={isInPath('ME_HISTORY_COMMENTS')}
      >
        <FormattedMessage defaultMessage="Comments" id="wCgTu5" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default HistoryTabs
