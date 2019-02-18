import { withRouter, WithRouterProps } from 'next/router'
import { PageHeader, Translate } from '~/components'

import SearchArticles from './SearchArticles'
import SearchTags from './SearchTags'
import SearchUsers from './SearchUsers'

import styles from './styles.css'

const Search: React.FC<WithRouterProps> = ({ router }) => {
  const q = (router && router.query && router.query.q) || ''

  return (
    <>
      <main>
        <section className="l-row">
          <div className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
            <input value="Search Bar" />
          </div>
        </section>

        {q && (
          <section className="l-row">
            <article className="l-col-4 l-col-md-5 l-col-lg-8">
              <PageHeader
                pageTitle={
                  <Translate
                    translations={{ zh_hant: '文章', zh_hans: '文章' }}
                  />
                }
              />
              <SearchArticles q={q} />
            </article>

            <aside className="l-col-4 l-col-md-3 l-col-lg-4">
              <section>
                <PageHeader
                  pageTitle={
                    <Translate
                      translations={{ zh_hant: '標籤', zh_hans: '标签' }}
                    />
                  }
                />
                <SearchTags q={q} />
              </section>
              <section>
                <PageHeader
                  pageTitle={
                    <Translate
                      translations={{ zh_hant: '用戶', zh_hans: '用户' }}
                    />
                  }
                />
                <SearchUsers q={q} />
              </section>
            </aside>
          </section>
        )}
      </main>
      <style jsx>{styles}</style>
    </>
  )
}

export default withRouter(Search)
