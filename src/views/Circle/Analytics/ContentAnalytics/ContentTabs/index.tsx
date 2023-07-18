import { FormattedMessage } from 'react-intl'

import { SegmentedTabs } from '~/components'

export type CircleContentAnalyticsType = 'public' | 'paywall'

interface Props {
  type: CircleContentAnalyticsType
  setType: (type: CircleContentAnalyticsType) => void
}

const ContentTabs: React.FC<Props> = ({ type, setType }) => {
  const isPublic = type === 'public'
  const isPaywall = type === 'paywall'

  return (
    <SegmentedTabs>
      <SegmentedTabs.Tab
        onClick={() => setType('paywall')}
        selected={isPaywall}
      >
        <FormattedMessage
          defaultMessage="Paywalled"
          description="src/views/Circle/Analytics/ContentAnalytics/ContentTabs/index.tsx"
        />
      </SegmentedTabs.Tab>

      <SegmentedTabs.Tab onClick={() => setType('public')} selected={isPublic}>
        <FormattedMessage
          defaultMessage="Public"
          description="src/views/Circle/Analytics/ContentAnalytics/ContentTabs/index.tsx"
        />
      </SegmentedTabs.Tab>
    </SegmentedTabs>
  )
}

export default ContentTabs
