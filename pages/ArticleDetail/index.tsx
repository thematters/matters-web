import gql from 'graphql-tag'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext, useEffect } from 'react'
import { QueryResult } from 'react-apollo'

import {
  DateTime,
  Footer,
  Head,
  Placeholder,
  Title,
  Translate
} from '~/components'
import BackToHomeButton from '~/components/Button/BackToHome'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { DrawerProvider } from '~/components/Drawer'
import EmptyArticle from '~/components/Empty/EmptyArticle'
import { Query } from '~/components/GQL'
import { UserDigest } from '~/components/UserDigest'
import { ViewerContext } from '~/components/Viewer'

import { getQuery, toPath } from '~/common/utils'

import { ArticleDetail as ArticleDetailType } from './__generated__/ArticleDetail'
import Content from './Content'
import RelatedArticles from './RelatedArticles'
import SideComments from './SideComments'
import State from './State'
import styles from './styles.css'
import TagList from './TagList'
import Toolbar from './Toolbar'
import AppreciatorsModal from './Toolbar/Appreciators/AppreciatorsModal'
import ShareModal from './Toolbar/ShareButton/ShareModal'

const ARTICLE_DETAIL = gql`
  query ArticleDetail(
    $mediaHash: String
    $uuid: UUID
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = false
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
      cover
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
      ...StateArticle
    }
  }
  ${UserDigest.FullDesc.fragments.user}
  ${BookmarkButton.fragments.article}
  ${Content.fragments.article}
  ${TagList.fragments.article}
  ${Toolbar.fragments.article}
  ${RelatedArticles.fragments.article}
  ${State.fragments.article}
`

const ArticleDetail: React.FC<WithRouterProps> = ({ router }) => {
  const viewer = useContext(ViewerContext)
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
              subscribeToMore
            }: QueryResult & { data: ArticleDetailType }) => {
              if (loading) {
                return <Placeholder.ArticleDetail />
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

              if (
                data.article.state !== 'active' &&
                viewer.id !== data.article.author.id
              ) {
                return (
                  <EmptyArticle
                    description={
                      <Translate zh_hant="文章被隱藏" zh_hans="文章被隐藏" />
                    }
                  >
                    <BackToHomeButton />
                  </EmptyArticle>
                )
              }

              if (data.article.live) {
                useEffect(() =>
                  subscribeToMore({
                    document: gql`
                      subscription ArticleEdited($id: ID!) {
                        nodeEdited(input: { id: $id }) {
                          id
                          ... on Article {
                            id
                            ...ToolbarArticle
                          }
                        }
                      }
                      ${Toolbar.fragments.article}
                    `,
                    variables: { id: data.article.id },
                    updateQuery: (prev, { subscriptionData }) =>
                      _merge(prev, {
                        article: subscriptionData.data.nodeEdited
                      })
                  })
                )
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

                  <State article={data.article} />

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
          <AppreciatorsModal />
          <ShareModal />
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
