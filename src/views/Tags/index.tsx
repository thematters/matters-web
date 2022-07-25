import { useState } from 'react'

import { Head, Layout, Tabs, Translate } from '~/components'

import { TagsButtons } from './Buttons'
import Feed, { FeedType } from './Feed'
import styles from './styles.css'

const BaseTags = () => {
  const [feed, setFeed] = useState<FeedType>('recommended')
  const isRecommended = feed === 'recommended'
  const isHottest = feed === 'hottest'

  return (
    <section className="tags">
      <Tabs sticky>
        <Tabs.Tab
          selected={isRecommended}
          onClick={() => setFeed('recommended')}
        >
          <Translate zh_hant="推薦" zh_hans="推荐" en="Recommended" />
        </Tabs.Tab>

        <Tabs.Tab selected={isHottest} onClick={() => setFeed('hottest')}>
          <Translate zh_hant="熱門" zh_hans="热门" en="Trending" />
        </Tabs.Tab>
      </Tabs>

      <Feed type={feed} />

      <style jsx>{styles}</style>
    </section>
  )
}

const Tags = () => (
  <Layout.Main>
    <Head title={{ id: 'allTags' }} />

    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={
        <>
          <Layout.Header.Title id="allTags" />
          <TagsButtons.CreateButton />
        </>
      }
    />

    <BaseTags />
  </Layout.Main>
)

export default Tags
