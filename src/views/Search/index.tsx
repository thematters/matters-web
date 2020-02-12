import { useRouter } from 'next/router'

import { Footer, Head, SearchBar, useResponsive } from '~/components'

import { getQuery } from '~/common/utils'

import EmptySearch from './EmptySearch'
import SearchArticles from './SearchArticles'
import SearchPageHeader from './SearchPageHeader'
import SearchTags from './SearchTags'
import SearchUsers from './SearchUsers'
import styles from './styles.css'

const EmptySeachPage = () => {
  return (
    <main>
      <Head title={{ zh_hant: '搜尋', zh_hans: '搜索' }} />

      <section className="l-row">
        <article className="l-col-4 l-col-md-5 l-col-lg-8">
          <EmptySearch inSidebar={false} />
        </article>

        <aside className="l-col-4 l-col-md-3 l-col-lg-4">
          <Footer />
        </aside>
      </section>
    </main>
  )
}

const Search = () => {
  const isMedium = useResponsive({ type: 'md' })()
  const router = useRouter()
  const type = getQuery({ router, key: 'type' })
  const q = getQuery({ router, key: 'q' })

  if (!q) {
    return <EmptySeachPage />
  }

  const isTagOnly = type === 'tag'
  const isUserOnly = type === 'user'
  const isAggregate = !isTagOnly && !isUserOnly

  return (
    <main>
      <Head title={{ zh_hant: `搜尋「${q}」`, zh_hans: `搜索“${q}”` }} />

      {isMedium && (
        <header className="l-row mobile-search-bar">
          <SearchBar autoComplete={false} />
        </header>
      )}

      <SearchPageHeader q={q} isAggregate={isAggregate} />

      <section className="l-row">
        <article className="l-col-4 l-col-md-5 l-col-lg-8">
          {isAggregate && <SearchArticles q={q} />}
          {isTagOnly && <SearchTags q={q} isAggregate={isAggregate} />}
          {isUserOnly && <SearchUsers q={q} isAggregate={isAggregate} />}
        </article>

        <aside className="l-col-4 l-col-md-3 l-col-lg-4">
          {isAggregate && <SearchTags q={q} isAggregate={isAggregate} />}
          {isAggregate && <SearchUsers q={q} isAggregate={isAggregate} />}
          <Footer />
        </aside>
      </section>

      <style jsx>{styles}</style>
    </main>
  )
}

export default Search
