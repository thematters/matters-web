import { useIntl } from 'react-intl'

import { analytics } from '~/common/utils'
import { SquareTabs } from '~/components'

import styles from './styles.module.css'

export type TABS = 'All' | 'Article'

type TabsProps = {
  tab: TABS
  setTab: React.Dispatch<React.SetStateAction<TABS>>
}

export const Tabs = ({ tab, setTab }: TabsProps) => {
  const intl = useIntl()

  return (
    <section className={styles.tabs}>
      <SquareTabs>
        <SquareTabs.Tab
          selected={tab === 'All'}
          onClick={() => {
            setTab('All')
            analytics.trackEvent('click_button', {
              type: `follow_tab_all` as `follow_tab_${string}`,
              pageType: 'follow',
            })
          }}
          title={intl.formatMessage({
            defaultMessage: 'All',
            id: 'zQvVDJ',
          })}
        />
        <SquareTabs.Tab
          selected={tab === 'Article'}
          onClick={() => {
            setTab('Article')
            analytics.trackEvent('click_button', {
              type: `follow_tab_article` as `follow_tab_${string}`,
              pageType: 'follow',
            })
          }}
          title={intl.formatMessage({
            defaultMessage: 'Articles',
            id: 'AeIRlL',
            description: 'src/views/Follow/Tabs/index.tsx',
          })}
        />
      </SquareTabs>
    </section>
  )
}
