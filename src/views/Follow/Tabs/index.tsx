import { useIntl } from 'react-intl'

import { FilledTabs } from '~/components'

export type TABS = 'All' | 'Article'

type TabsProps = {
  tab: TABS
  setTab: React.Dispatch<React.SetStateAction<TABS>>
}

export const Tabs = ({ tab, setTab }: TabsProps) => {
  const intl = useIntl()

  return (
    <FilledTabs>
      <FilledTabs.Tab
        selected={tab === 'All'}
        onClick={() => setTab('All')}
        title={intl.formatMessage({
          defaultMessage: 'All',
          id: 'zQvVDJ',
        })}
      />
      <FilledTabs.Tab
        selected={tab === 'Article'}
        onClick={() => setTab('Article')}
        title={intl.formatMessage({
          defaultMessage: 'Articles',
          id: 'AeIRlL',
          description: 'src/views/Follow/Tabs/index.tsx',
        })}
      />
    </FilledTabs>
  )
}
