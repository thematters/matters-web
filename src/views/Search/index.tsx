import { useRouter } from 'next/router'

import { Head, Layout, SearchBar } from '~/components'

import { getQuery } from '~/common/utils'

import EmptySearch from './EmptySearch'
import SearchArticles from './SearchArticles'
import SearchPageHeader from './SearchPageHeader'
import SearchTags from './SearchTags'
import SearchUsers from './SearchUsers'
import styles from './styles.css'

const Search = () => {
  const router = useRouter()
  const type = getQuery({ router, key: 'type' })
  const q = getQuery({ router, key: 'q' })

  if (!q) {
    return (
      <Layout>
        <Head title={{ zh_hant: '搜尋', zh_hans: '搜索' }} />

        <Layout.Header
          left={<Layout.Header.MeButton />}
          right={<SearchBar />}
        />

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
      <Layout.Header left={<Layout.Header.MeButton />} right={<SearchBar />} />

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
