import MainFeed from '~/views/Home/Feed/MainFeed'

import { Head, Layout } from '~/components'

const FeaturedArticles = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={
        <Layout.Header.Title zh_hant="精華" zh_hans="精华" en="Featured" />
      }
    />

    <Head title={{ zh_hant: '精華', zh_hans: '精华', en: 'Featured' }} />

    <MainFeed feedSortType="icymi" />
  </Layout.Main>
)

export default FeaturedArticles
