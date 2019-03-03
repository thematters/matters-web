import { withRouter, WithRouterProps } from 'next/router'

import { Footer } from '~/components/Footer'
import { Head } from '~/components/Head'
import { Responsive } from '~/components/Responsive'
import { SearchBar } from '~/components/SearchBar'

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

const Search: React.FC<WithRouterProps> = ({ router }) => {
  const type = getQuery({ router, key: 'type' })
  const q = getQuery({ router, key: 'q' })

  if (!q) {
    return <EmptySeachPage />
  }

  const isArticleOnly = type === 'article'
  const isTagOnly = type === 'tag'
  const isUserOnly = type === 'user'
  const isAggregate = !isArticleOnly && !isTagOnly && !isUserOnly

  return (
    <main>
      <Head title={{ zh_hant: `搜尋「${q}」`, zh_hans: `搜索“${q}”` }} />

      <Responsive.MediumDown>
        <header className="l-row mobile-search-bar">
          <SearchBar autoComplete={false} />
        </header>
      </Responsive.MediumDown>

      <SearchPageHeader q={q} isAggregate={isAggregate} />

      <section className="l-row">
        <article className="l-col-4 l-col-md-5 l-col-lg-8">
          {(isArticleOnly || isAggregate) && (
            <SearchArticles q={q} isAggregate={isAggregate} />
          )}
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

export default withRouter(Search)
