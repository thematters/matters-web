import { withRouter, WithRouterProps } from 'next/router'

import { Footer, Responsive, SearchBar } from '~/components'
import EmptySearch from './EmptySearch'
import SearchArticles from './SearchArticles'
import SearchPageHeader from './SearchPageHeader'
import SearchTags from './SearchTags'
import SearchUsers from './SearchUsers'

import styles from './styles.css'

const EmptySeachPage = () => {
  return (
    <main>
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
  const type = router && router.query && router.query.type
  let q = router && router.query && router.query.q
  q = q instanceof Array ? q.join(',') : q

  if (!q) {
    return <EmptySeachPage />
  }

  const isArticleOnly = type === 'article'
  const isTagOnly = type === 'tag'
  const isUserOnly = type === 'user'
  const isAggregate = !isArticleOnly && !isTagOnly && !isUserOnly

  return (
    <main>
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
