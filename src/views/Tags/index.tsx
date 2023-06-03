import { useState } from 'react'

import {
  Head,
  Layout,
  // Tabs, Translate,
  useRoute,
} from '~/components'

import Feed, { FeedType } from './Feed'
// import SidebarTags from './Sidebar'
import styles from './styles.module.css'

const BaseTags = () => {
  const {
    getQuery,
    // , setQuery
  } = useRoute()
  const qsType = getQuery('type') as FeedType

  const [
    feed,
    // , setFeed
  ] = useState<FeedType>(qsType || 'recommended')
  // const setFeedType = (newType: FeedType) => {
  //   setQuery('type', newType)
  //   setFeed(newType)
  // }

  // const isRecommended = feed === 'recommended'
  // const isHottest = feed === 'hottest'

  return (
    <section className="tags">
      {/* <Tabs sticky>
        <Tabs.Tab
          selected={isRecommended}
          onClick={() => setFeedType('recommended')}
        >
          <Translate zh_hant="推薦" zh_hans="推荐" en="Recommended" />
        </Tabs.Tab>

        <Tabs.Tab selected={isHottest} onClick={() => setFeedType('hottest')}>
          <Translate id="hottest" />
        </Tabs.Tab>
      </Tabs> */}

      <Feed type={feed} />
    </section>
  )
}

const Tags = () => (
  <Layout.Main
  //  aside={<SidebarTags inSidebar />}
  >
    <Head title={{ id: 'allTags' }} />

    <Layout.Header
      right={
        <>
          <Layout.Header.Title id="allTags" />
        </>
      }
    />

    <BaseTags />
  </Layout.Main>
)

export default Tags
