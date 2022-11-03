import { Tabs, Translate } from '~/components'

export type TabType = 'request' | 'reply'

interface SortByProps {
  tabType: TabType
  setTabType: (sortBy: TabType) => void
}

const SortBy: React.FC<SortByProps> = ({ tabType, setTabType }) => {
  const isRequest = tabType === 'request'
  const isReply = tabType === 'reply'

  return (
    <Tabs sticky>
      <Tabs.Tab onClick={() => setTabType('request')} selected={isRequest}>
        <Translate id="supportSetting" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setTabType('reply')} selected={isReply}>
        <Translate id="supportFeedback" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default SortBy
