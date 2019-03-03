import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import { BookmarkButton } from '~/components/Button/Bookmark'
import { DateTime } from '~/components/DateTime'
import { DrawerProvider } from '~/components/Drawer'
import { Error } from '~/components/Error'
import { Footer } from '~/components/Footer'
import { Head } from '~/components/Head'
import { Placeholder } from '~/components/Placeholder'
import { Title } from '~/components/Title'
import { UserDigest } from '~/components/UserDigest'

import { getQuery, toPath } from '~/common/utils'

import { ArticleDetail as ArticleDetailType } from './__generated__/ArticleDetail'
import Content from './Content'
import RelatedArticles from './RelatedArticles'
import SideComments from './SideComments'
import styles from './styles.css'
import TagList from './TagList'
import Toolbar from './Toolbar'

const ARTICLE_DETAIL = gql`
  query ArticleDetail(
    $mediaHash: String
    $uuid: UUID
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = false
    $hasDigestTagArticleCount: Boolean = false
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    article(input: { mediaHash: $mediaHash, uuid: $uuid }) {
      id
      title
      slug
      mediaHash
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
  const uuid = getQuery({ router, key: 'post' })

  if (!mediaHash && !uuid) {
    return null
  }

  return (
    <DrawerProvider>
      <main className="l-row">
        <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-0">
          <Query query={ARTICLE_DETAIL} variables={{ mediaHash, uuid }}>
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

              // redirect to latest verion of URL Pattern
              if (uuid && process.browser && router) {
                const path = toPath({
                  page: 'articleDetail',
                  userName: data.article.author.userName,
                  slug: data.article.slug,
                  mediaHash: data.article.mediaHash
                })
                router.push(path.href, path.as, { shallow: true })
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

          <SideComments />
        </article>

        <aside className="l-col-4 l-col-md-6 l-col-lg-4" id="drawer-calc-hook">
          <Footer />
        </aside>

        <style jsx>{styles}</style>
      </main>
    </DrawerProvider>
  )
}

export default withRouter(ArticleDetail)
