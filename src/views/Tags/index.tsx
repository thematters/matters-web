import { useState } from 'react'

import { Head, Layout, useRoute } from '~/components'

import Feed, { FeedType } from './Feed'
import styles from './styles.module.css'

const BaseTags = () => {
  const { getQuery } = useRoute()
  const qsType = getQuery('type') as FeedType

  const [feed] = useState<FeedType>(qsType || 'recommended')

  return (
    <section className={styles.tags}>
      <Feed type={feed} />
    </section>
  )
}

const Tags = () => (
  <Layout.Main>
    <Head title={{ id: 'allTags' }} />

    <Layout.Header right={<Layout.Header.Title id="allTags" />} />

    <BaseTags />
  </Layout.Main>
)

export default Tags
