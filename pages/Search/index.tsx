import { withRouter, WithRouterProps } from 'next/router'
import { Footer } from '~/components'

import SearchArticles from './SearchArticles'
import SearchPageHeader from './SearchPageHeader'
import SearchTags from './SearchTags'
import SearchUsers from './SearchUsers'

import styles from './styles.css'

const Search: React.FC<WithRouterProps> = ({ router }) => {
  const type = router && router.query && router.query.type
  let q = router && router.query && router.query.q
  q = q instanceof Array ? q.join(',') : q

  if (!q) {
    return <span>INPUT</span> // TODO
  }

  const isArticleOnly = type === 'article'
  const isTagOnly = type === 'tag'
  const isUserOnly = type === 'user'
  const isAggregate = !isArticleOnly && !isTagOnly && !isUserOnly

  return (
    <main>
      <SearchPageHeader q={q} aggregate={isAggregate} />
      <section className="l-row">
        <article className="l-col-4 l-col-md-5 l-col-lg-8">
          {(isArticleOnly || isAggregate) && (
            <SearchArticles q={q} aggregate={isAggregate} />
          )}
          {isTagOnly && <SearchTags q={q} aggregate={isAggregate} />}
          {isUserOnly && <SearchUsers q={q} aggregate={isAggregate} />}
        </article>

        <aside className="l-col-4 l-col-md-3 l-col-lg-4">
          {isAggregate && (
            <section>
              <SearchTags q={q} aggregate={isAggregate} />
            </section>
          )}
          {isAggregate && (
            <section>
              <SearchUsers q={q} aggregate={isAggregate} />
            </section>
          )}
          <Footer />
        </aside>
      </section>
      <style jsx>{styles}</style>
    </main>
  )
}

export default withRouter(Search)
