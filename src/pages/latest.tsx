import MainFeed from '~/views/Home/Feed/MainFeed'

import { Head, Layout } from '~/components'

const LatestArticles = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title zh_hant="最新" zh_hans="最新" en="Latest" />}
    />

    <Head title={{ zh_hant: '最新', zh_hans: '最新', en: 'Latest' }} />

    <MainFeed feedSortType="newest" />
  </Layout.Main>
)

export default LatestArticles
