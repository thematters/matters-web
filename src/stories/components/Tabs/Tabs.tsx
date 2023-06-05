import React, { useState } from 'react'

import { Tabs, Translate } from '~/components'

import styles from './styles.module.css'

const AllTabs = () => {
  const [curr, setCurr] = useState('article')

  return (
    <section className={styles.container}>
      <Tabs sticky>
        <Tabs.Tab
          onClick={() => setCurr('article')}
          selected={curr === 'article'}
        >
          <Translate id="articles" />
        </Tabs.Tab>

        <Tabs.Tab
          onClick={() => setCurr('comment')}
          selected={curr === 'comment'}
        >
          <Translate id="responses" />
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setCurr('tag')} selected={curr === 'tag'}>
          <Translate id="tag" />
        </Tabs.Tab>

        <Tabs.Tab
          onClick={() => setCurr('support')}
          selected={curr === 'support'}
        >
          <Translate zh_hant="支持" zh_hans="支持" />
        </Tabs.Tab>
      </Tabs>

      <div className="area">
        <p>tabs are sticky, scroll to view .</p>
      </div>
    </section>
  )
}

export default AllTabs
