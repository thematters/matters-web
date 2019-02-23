import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import { DateTime, Error, Footer, Head, Placeholder, Title } from '~/components'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { UserDigest } from '~/components/UserDigest'
import Content from './Content'
import RelatedArticles from './RelatedArticles'
import TagList from './TagList'
import Toolbar from './Toolbar'

import { getQuery } from '~/common/utils'
import { ArticleDetail as ArticleDetailType } from './__generated__/ArticleDetail'
import styles from './styles.css'

const ARTICLE_DETAIL = gql`
  query ArticleDetail($mediaHash: String!) {
    article(input: { mediaHash: $mediaHash }) {
      id
      title
      state
      public
      live
      summary
      createdAt
      author {
        ...UserDigestFullDescUser
      }
      ...BookmarkArticle
      ...ContentArticle
      ...TagListArticle
      ...ToolbarArticle
      ...RelatedArticles
    }
  }
  ${UserDigest.FullDesc.fragments.user}
  ${BookmarkButton.fragments.article}
  ${Content.fragments.article}
  ${TagList.fragments.article}
  ${Toolbar.fragments.article}
  ${RelatedArticles.fragments.article}
`

const ArticleDetail: React.FC<WithRouterProps> = ({ router }) => {
  const mediaHash = getQuery({ router, key: 'mediaHash' })

  if (!mediaHash) {
    return <span>Empty</span> // TODO
  }

  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-0">
        <Query query={ARTICLE_DETAIL} variables={{ mediaHash }}>
          {({
            data,
            loading,
            error
          }: QueryResult & { data: ArticleDetailType }) => {
            if (loading) {
              return <Placeholder.ArticleDetail />
            }

            if (error) {
              return <Error error={error} />
            }

            return (
              <>
                <Head
                  title={data.article.title}
                  description={data.article.summary}
                  keywords={data.article.tags.map(
                    ({ content }: { content: any }) => content
                  )}
                  image={data.article.cover}
                />

                <section className="author">
                  <UserDigest.FullDesc user={data.article.author} />
                </section>

                <section className="title">
                  <Title type="article">{data.article.title}</Title>
                  <p className="date">
                    <DateTime date={data.article.createdAt} />
                  </p>
                </section>

                <section className="content">
                  <Content article={data.article} />
                  <TagList article={data.article} />
                  <Toolbar placement="left" article={data.article} />
                </section>

                <Toolbar placement="bottom" article={data.article} />

                <RelatedArticles article={data.article} />
              </>
            )
          }}
        </Query>
      </article>

      <aside className="l-col-4 l-col-md-6 l-col-lg-4 ">
        <Footer />
      </aside>

      <style jsx>{styles}</style>
    </main>
  )
}

export default withRouter(ArticleDetail)
