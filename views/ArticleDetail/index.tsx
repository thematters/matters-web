import gql from 'graphql-tag'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext, useEffect } from 'react'
import { QueryResult } from 'react-apollo'

import {
  DateTime,
  Head,
  Icon,
  Placeholder,
  TextIcon,
  Title,
  Translate
} from '~/components'
import BackToHomeButton from '~/components/Button/BackToHome'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { DrawerProvider } from '~/components/Drawer'
import EmptyArticle from '~/components/Empty/EmptyArticle'
import { Query } from '~/components/GQL'
import IconLive from '~/components/Icon/Live'
import { Popover } from '~/components/Popper'
import { UserDigest } from '~/components/UserDigest'
import { ViewerContext } from '~/components/Viewer'

import { getQuery, toPath } from '~/common/utils'
import ICON_COLLECTION from '~/static/icons/collection.svg?sprite'

import { ArticleDetail as ArticleDetailType } from './__generated__/ArticleDetail'
import Collection from './Collection'
import Content from './Content'
import RelatedArticles from './RelatedArticles'
import Sidebar from './Sidebar'
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
      collection(input: { first: 0 }) {
        totalCount
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

const CollectionMeta = ({ count }: { count: number }) => (
  <Popover
    trigger="click"
    placement="bottom-end"
    content={
      <section className="collection-popover">
        <h3>
          <Translate
            zh_hant={`關聯 ${count} 篇作品`}
            zh_hans={`关联 ${count} 篇作品`}
          />
        </h3>

        <Collection />
      </section>
    }
  >
    <button type="button" className="collection-meta">
      <span className="collection">
        <TextIcon
          icon={
            <Icon
              id={ICON_COLLECTION.id}
              viewBox={ICON_COLLECTION.viewBox}
              size="small"
            />
          }
          color="grey"
          spacing="xxtight"
          size="xs"
        >
          <span>
            <Translate zh_hant="關聯" zh_hans="关联" />
          </span>
          <span className="count">&nbsp;{count}&nbsp;</span>
          <span>
            <Translate zh_hant="篇作品" zh_hans="篇作品" />
          </span>
        </TextIcon>
      </span>

      <style jsx>{styles}</style>
    </button>
  </Popover>
)

const ArticleDetail: React.FC<WithRouterProps> = ({ router }) => {
  const viewer = useContext(ViewerContext)
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const uuid = getQuery({ router, key: 'post' })

  if (!mediaHash && !uuid) {
    return null
  }

  return (
    <Query query={ARTICLE_DETAIL} variables={{ mediaHash, uuid }}>
      {({
        data,
        loading,
        subscribeToMore
      }: QueryResult & { data: ArticleDetailType }) => (
        <DrawerProvider>
          <main className="l-row">
            <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-0">
              {(() => {
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

                useEffect(() => {
                  if (data.article.live) {
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
                  }
                })

                const collectionCount = data.article.collection
                  .totalCount as number

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
                      <span className="subtitle">
                        <p className="date">
                          <DateTime date={data.article.createdAt} />
                        </p>
                        <span>
                          {data.article.live && <IconLive />}
                          {collectionCount > 0 && (
                            <CollectionMeta count={collectionCount} />
                          )}
                        </span>
                      </span>
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
              })()}

              <SideComments />
              <AppreciatorsModal />
              <ShareModal />
            </article>

            <aside
              className="l-col-4 l-col-md-6 l-col-lg-4"
              id="drawer-calc-hook"
            >
              <Sidebar
                hasCollection={
                  !loading && data.article.collection.totalCount > 0
                }
              />
            </aside>

            <style jsx>{styles}</style>
          </main>
        </DrawerProvider>
      )}
    </Query>
  )
}

export default withRouter(ArticleDetail)
