import { FormattedMessage } from 'react-intl'

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

  return (
    <SegmentedTabs sticky>
      <SegmentedTabs.Tab
        onClick={() => setFeedType('hottest')}
        selected={isHottest}
      >
        <FormattedMessage defaultMessage="Trending" />
      </SegmentedTabs.Tab>

      <SegmentedTabs.Tab
        onClick={() => setFeedType('newest')}
        selected={isNewset}
      >
        <FormattedMessage defaultMessage="Latest" />
      </SegmentedTabs.Tab>

      <SegmentedTabs.Tab
        onClick={() => setFeedType('icymi')}
        selected={isICYMI}
      >
        <FormattedMessage defaultMessage="Featured" />
      </SegmentedTabs.Tab>
    </SegmentedTabs>
  )
}

export default SortBy
