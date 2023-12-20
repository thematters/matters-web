import { FormattedMessage } from 'react-intl'

import { Tabs } from '~/components'

export type TabType = 'request' | 'reply'

interface SortByProps {
  tabType: TabType
  setTabType: (sortBy: TabType) => void
}

const SortBy: React.FC<SortByProps> = ({ tabType, setTabType }) => {
  const isRequest = tabType === 'request'
  const isReply = tabType === 'reply'

  return (
    <Tabs>
      <Tabs.Tab onClick={() => setTabType('request')} selected={isRequest}>
        <FormattedMessage defaultMessage="Call-to-Support" id="ptTHBL" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setTabType('reply')} selected={isReply}>
        <FormattedMessage defaultMessage="Thank-you card" id="xQNq3I" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default SortBy
