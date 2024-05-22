import React, { useState } from 'react'

import { SegmentedTabs } from '~/components'

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
          Articles
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          onClick={() => setCurr('comment')}
          selected={curr === 'comment'}
        >
          Responses
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          onClick={() => setCurr('tag')}
          selected={curr === 'tag'}
        >
          Tag
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          onClick={() => setCurr('support')}
          selected={curr === 'support'}
        >
          Support
        </SegmentedTabs.Tab>
      </SegmentedTabs>

      <div className={styles.area}>
        <p>tabs are sticky, scroll to view .</p>
      </div>
    </section>
  )
}

export default AllTabs
