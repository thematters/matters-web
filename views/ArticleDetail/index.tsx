import gql from 'graphql-tag'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { QueryResult } from 'react-apollo'
import { Waypoint } from 'react-waypoint'

import {
  DateTime,
  Footer,
  Head,
  Placeholder,
  Responsive,
  Title,
  Translate
} from '~/components'
import BackToHomeButton from '~/components/Button/BackToHome'
import { BookmarkButton } from '~/components/Button/Bookmark'
import EmptyArticle from '~/components/Empty/EmptyArticle'
import { Query } from '~/components/GQL'
import { useImmersiveMode } from '~/components/Hook'
import IconLive from '~/components/Icon/Live'
import { UserDigest } from '~/components/UserDigest'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, getQuery, toPath } from '~/common/utils'

import { ArticleDetail as ArticleDetailType } from './__generated__/ArticleDetail'
import Collection from './Collection'
import Content from './Content'
import RelatedArticles from './RelatedArticles'
import Responses from './Responses'
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

const Block = ({
  type = 'article',
  children
}: {
  type?: 'article' | 'section'
  children: any
}) => {
  const classes = 'l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2'
  return type === 'article' ? (
    <article className={classes}>{children}</article>
  ) : (
    <section className={classes}>{children}</section>
  )
}

const ArticleDetail = () => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const [fixedToolbar, setFixedToolbar] = useState(true)
  const [trackedFinish, setTrackedFinish] = useState(false)
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
      }: QueryResult & { data: ArticleDetailType }) => {
        const authorId = _get(data, 'article.author.id')
        const collectionCount = _get(data, 'article.collection.totalCount')
        const canEditCollection = viewer.id === authorId

        return (
          <main className="l-row">
            {(() => {
              if (loading) {
                return (
                  <Block>
                    <Placeholder.ArticleDetail />
                  </Block>
                )
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

              if (data.article.state !== 'active' && viewer.id !== authorId) {
                return (
                  <Block>
                    <EmptyArticle
                      description={
                        <Translate zh_hant="作品被隱藏" zh_hans="作品被隐藏" />
                      }
                    >
                      <BackToHomeButton />
                    </EmptyArticle>
                  </Block>
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

              useImmersiveMode('article > .content')

              return (
                <Responsive.MediumUp>
                  {(isMediumUp: boolean) => (
                    <>
                      <Block>
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
                            <span>{data.article.live && <IconLive />}</span>
                          </span>
                        </section>

                        <section className="content">
                          <Content article={data.article} />
                          {(collectionCount > 0 || canEditCollection) && (
                            <Collection
                              article={data.article}
                              canEdit={canEditCollection}
                              collectionCount={collectionCount}
                            />
                          )}

                          {/* content:end */}
                          {!isMediumUp && (
                            <Waypoint
                              onPositionChange={({ currentPosition }) => {
                                if (currentPosition === 'below') {
                                  setFixedToolbar(true)
                                } else {
                                  setFixedToolbar(false)
                                }
                              }}
                            />
                          )}

                          <TagList article={data.article} />
                          <Toolbar placement="left" article={data.article} />
                        </section>

                        <Toolbar
                          placement="bottom"
                          article={data.article}
                          fixed={fixedToolbar}
                        />
                      </Block>

                      <section className="l-col-4 l-col-md-8 l-col-lg-12">
                        <RelatedArticles article={data.article} />
                      </section>

                      <Block type="section">
                        <Responses />
                        <Waypoint
                          onEnter={() => {
                            if (!trackedFinish) {
                              analytics.trackEvent(
                                ANALYTICS_EVENTS.FINISH_COMMENTS,
                                {
                                  entrance: data.article.id
                                }
                              )
                              setTrackedFinish(true)
                            }
                          }}
                        />
                        <AppreciatorsModal />
                        <ShareModal />
                      </Block>
                    </>
                  )}
                </Responsive.MediumUp>
              )
            })()}

            <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
              <Footer />
            </section>

            <style jsx>{styles}</style>
          </main>
        )
      }}
    </Query>
  )
}

export default ArticleDetail
