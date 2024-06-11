import { FormattedMessage } from 'react-intl'

import type { ClickButtonProp as TrackEventProps } from '~/common/utils'
import { analytics } from '~/common/utils'
import { SegmentedTabs } from '~/components'

export type HomeFeedType = 'hottest' | 'newest' | 'icymi'

interface SortByProps {
  feedType: HomeFeedType
  setFeedType: (sortBy: HomeFeedType) => void
}

const SortBy: React.FC<SortByProps> = ({ feedType, setFeedType }) => {
  const isHottest = feedType === 'hottest'
  const isNewset = feedType === 'newest'
  const isICYMI = feedType === 'icymi'

  const trackClick = (type: TrackEventProps['type']) => {
    analytics.trackEvent('click_button', {
      type,
      pageType: 'home',
      pageComponent: 'home_feed_tab',
    })
  }

  return (
    <SegmentedTabs sticky>
      <SegmentedTabs.Tab
        onClick={() => {
          trackClick('hottest')
          setFeedType('hottest')
        }}
        selected={isHottest}
      >
        <FormattedMessage defaultMessage="Trending" id="ll/ufR" />
      </SegmentedTabs.Tab>

      <SegmentedTabs.Tab
        onClick={() => {
          trackClick('icymi')
          setFeedType('icymi')
        }}
        selected={isICYMI}
      >
        <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
      </SegmentedTabs.Tab>

      <SegmentedTabs.Tab
        onClick={() => {
          trackClick('newest')
          setFeedType('newest')
        }}
        selected={isNewset}
      >
        <FormattedMessage defaultMessage="Latest" id="adThp5" />
      </SegmentedTabs.Tab>
    </SegmentedTabs>
  )
}

export default SortBy
