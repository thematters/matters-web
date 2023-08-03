import React, { useState } from 'react'

import { SegmentedTabs, Translate } from '~/components'

import styles from './styles.module.css'

const AllTabs = () => {
  const [curr, setCurr] = useState('article')

  return (
    <section className={styles.container}>
      <SegmentedTabs sticky>
        <SegmentedTabs.Tab
          onClick={() => setCurr('article')}
          selected={curr === 'article'}
        >
          <Translate id="articles" />
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          onClick={() => setCurr('comment')}
          selected={curr === 'comment'}
        >
          <Translate id="responses" />
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          onClick={() => setCurr('tag')}
          selected={curr === 'tag'}
        >
          <Translate id="tag" />
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          onClick={() => setCurr('support')}
          selected={curr === 'support'}
        >
          <Translate zh_hant="支持" zh_hans="支持" />
        </SegmentedTabs.Tab>
      </SegmentedTabs>

      <div className={styles.area}>
        <p>tabs are sticky, scroll to view .</p>
      </div>
    </section>
  )
}

export default AllTabs
