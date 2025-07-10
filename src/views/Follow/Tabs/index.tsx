import { FormattedMessage, useIntl } from 'react-intl'

import { analytics } from '~/common/utils'
import { Switch } from '~/components'

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
      <Switch
        name="article-filter"
        label={intl.formatMessage({
          defaultMessage: 'Only articles',
          id: '3WUBfC',
        })}
        checked={tab === 'Article'}
        onChange={() => {
          const newTab = tab === 'All' ? 'Article' : 'All'
          setTab(newTab)
          analytics.trackEvent('click_button', {
            type: `follow_tab_${newTab.toLowerCase()}` as `follow_tab_${string}`,
            pageType: 'follow',
          })
        }}
      />
      <span className={styles.label}>
        <FormattedMessage defaultMessage="Only articles" id="3WUBfC" />
      </span>
    </section>
  )
}
