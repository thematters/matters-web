import classNames from 'classnames'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import styles from '../../../views/ArticleDetail/AuthorSidebar/Tabs/styles.module.css'

export type TabsType = 'ALL' | 'Articles' | undefined

type TabProps = {
  active: boolean
  onClick: () => void
  title: string
}

const Tab = ({ active, onClick, title }: TabProps) => {
  const tabClasses = classNames({
    [styles.tabItem]: true,
    [styles.active]: active,
  })

  return (
    <li className={tabClasses} onClick={onClick}>
      {title}
    </li>
  )
}

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<TabsType>('ALL')
  const intl = useIntl()

  return (
    <ul className={styles.tabList}>
      <Tab
        active={activeTab === 'ALL'}
        onClick={() => setActiveTab('ALL')}
        title={intl.formatMessage({
          defaultMessage: 'All',
          id: 'zQvVDJ',
        })}
      />
      <Tab
        active={activeTab === 'Articles'}
        onClick={() => setActiveTab('Articles')}
        title={intl.formatMessage({
          defaultMessage: 'Articles Only',
          id: 'sDQSFv',
        })}
      />
    </ul>
  )
}

export default Tabs
