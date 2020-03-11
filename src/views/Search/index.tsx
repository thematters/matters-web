import { useRouter } from 'next/router'

import { Head, Layout, SearchBar, useResponsive } from '~/components'

import { getQuery } from '~/common/utils'

import AggregateResults from './AggregateResults'
// import EmptySearch from './EmptySearch'
// import SearchArticles from './SearchArticles'
// import SearchTags from './SearchTags'
// import SearchUsers from './SearchUsers'
import styles from './styles.css'

const SearchHeader = () => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <Layout.Header
      left={
        isSmallUp ? <Layout.Header.BackButton /> : <Layout.Header.MeButton />
      }
      right={<SearchBar />}
      marginBottom={0}
    />
  )
}

const Search = () => {
  const router = useRouter()
  // const type = getQuery({ router, key: 'type' })
  const q = getQuery({ router, key: 'q' })

  // const isTagOnly = type === 'tag'
  // const isUserOnly = type === 'user'
  // const isArticleOnly = type === 'article'
  // const isAggregate = !isTagOnly && !isUserOnly && !isArticleOnly
  const isAggregate = true

  if (!q) {
    return (
      <Layout>
        <Head title={{ zh_hant: '搜尋', zh_hans: '搜索' }} />

        <SearchHeader />

        <p>Auto Complete Here</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <SearchHeader />

      <Head title={{ zh_hant: `搜尋「${q}」`, zh_hans: `搜索“${q}”` }} />

      {/* {isTagOnly && <SearchTags />}
      {isUserOnly && <SearchUsers />}
      {isArticleOnly && <SearchArticles />} */}
      {isAggregate && <AggregateResults />}

      <style jsx>{styles}</style>
    </Layout>
  )
}

export default Search
