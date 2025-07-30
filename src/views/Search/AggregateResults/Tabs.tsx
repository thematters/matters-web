import { useIntl } from 'react-intl'

import { SquareTabs } from '~/components'

import styles from './styles.module.css'

export type TABS = 'article' | 'user' | 'tag'

type TabsProps = {
  tab: TABS
  setTab: (tab: TABS) => void
}

export const Tabs = ({ tab, setTab }: TabsProps) => {
  const intl = useIntl()

  return (
    <section className={styles.tabs}>
      <SquareTabs>
        <SquareTabs.Tab
          selected={tab === 'article'}
          onClick={() => setTab('article')}
          title={intl.formatMessage({
            defaultMessage: 'Articles',
            id: '3KNMbJ',
          })}
        />
        <SquareTabs.Tab
          selected={tab === 'user'}
          onClick={() => setTab('user')}
          title={intl.formatMessage({
            defaultMessage: 'Users',
            id: 'YDMrKK',
          })}
        />
        <SquareTabs.Tab
          selected={tab === 'tag'}
          onClick={() => setTab('tag')}
          title={intl.formatMessage({
            defaultMessage: 'Tags',
            id: '1EYCdR',
          })}
        />
      </SquareTabs>
    </section>
  )
}
