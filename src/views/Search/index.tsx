import { useRouter } from 'next/router'

import { Head, Layout, SearchBar, useResponsive } from '~/components'

import { getQuery } from '~/common/utils'

import EmptySearch from './EmptySearch'
import SearchArticles from './SearchArticles'
import SearchPageHeader from './SearchPageHeader'
import SearchTags from './SearchTags'
import SearchUsers from './SearchUsers'
import styles from './styles.css'

const SearchHeader = () => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <Layout.Header
      left={
        isSmallUp ? <Layout.Header.BackButton /> : <Layout.Header.MeButton />
      }
      right={<SearchBar />}
    />
  )
}

const Search = () => {
  const router = useRouter()
  const type = getQuery({ router, key: 'type' })
  const q = getQuery({ router, key: 'q' })

  if (!q) {
    return (
      <Layout>
        <Head title={{ zh_hant: '搜尋', zh_hans: '搜索' }} />

        <SearchHeader />

        <EmptySearch inSidebar={false} />
      </Layout>
    )
  }

  const isTagOnly = type === 'tag'
  const isUserOnly = type === 'user'
  const isAggregate = !isTagOnly && !isUserOnly

  return (
    <Layout
      rightSide={
        <>
          {isAggregate && <SearchTags q={q} isAggregate={isAggregate} />}
          {isAggregate && <SearchUsers q={q} isAggregate={isAggregate} />}
        </>
      }
    >
      <SearchHeader />

      <Head title={{ zh_hant: `搜尋「${q}」`, zh_hans: `搜索“${q}”` }} />

      <SearchPageHeader q={q} isAggregate={isAggregate} />

      {isAggregate && <SearchArticles q={q} />}
      {isTagOnly && <SearchTags q={q} isAggregate={isAggregate} />}
      {isUserOnly && <SearchUsers q={q} isAggregate={isAggregate} />}

      <style jsx>{styles}</style>
    </Layout>
  )
}

export default Search
