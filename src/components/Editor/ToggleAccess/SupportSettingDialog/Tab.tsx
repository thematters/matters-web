import { SegmentedTabs, Translate } from '~/components'

export type TabType = 'request' | 'reply'

interface SortByProps {
  tabType: TabType
  setTabType: (sortBy: TabType) => void
}

const SortBy: React.FC<SortByProps> = ({ tabType, setTabType }) => {
  const isRequest = tabType === 'request'
  const isReply = tabType === 'reply'

  return (
    <SegmentedTabs>
      <SegmentedTabs.Tab
        onClick={() => setTabType('request')}
        selected={isRequest}
      >
        <Translate id="requestForDonation" />
      </SegmentedTabs.Tab>

      <SegmentedTabs.Tab onClick={() => setTabType('reply')} selected={isReply}>
        <Translate id="replyToDonator" />
      </SegmentedTabs.Tab>
    </SegmentedTabs>
  )
}

export default SortBy
