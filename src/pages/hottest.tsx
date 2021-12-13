import MainFeed from '~/views/Home/Feed/MainFeed'

import { Head, Layout } from '~/components'

const HottestArticles = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={
        <Layout.Header.Title zh_hant="熱門" zh_hans="热门" en="Trending" />
      }
    />

    <Head title={{ zh_hant: '熱門', zh_hans: '热门', en: 'Trending' }} />

    <MainFeed feedSortType="hottest" />
  </Layout.Main>
)

export default HottestArticles
