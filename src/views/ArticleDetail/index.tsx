import gql from 'graphql-tag'
import jump from 'jump.js'
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
  Title
} from '~/components'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { Fingerprint } from '~/components/Fingerprint'
import { Query } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { useImmersiveMode } from '~/components/Hook'
import IconLive from '~/components/Icon/Live'
import ShareModal from '~/components/ShareButton/ShareModal'
import Throw404 from '~/components/Throw404'
import { UserDigest } from '~/components/UserDigest'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, getQuery } from '~/common/utils'

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
import Wall from './Wall'

const ARTICLE_DETAIL = gql`
  query ArticleDetail(
    $mediaHash: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = false
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    article(input: { mediaHash: $mediaHash }) {
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
      collection(input: { first: 0 }) @connection(key: "articleCollection") {
        totalCount
      }
      ...BookmarkArticle
      ...ContentArticle
      ...TagListArticle
      ...ToolbarArticle
      ...RelatedArticles
      ...StateArticle
      ...FingerprintArticle
    }
  }
  ${UserDigest.FullDesc.fragments.user}
  ${BookmarkButton.fragments.article}
  ${Content.fragments.article}
  ${TagList.fragments.article}
  ${Toolbar.fragments.article}
  ${RelatedArticles.fragments.article}
  ${State.fragments.article}
  ${Fingerprint.fragments.article}
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

const ArticleDetail = ({
  mediaHash,
  wall
}: {
  mediaHash: string
  wall: boolean
}) => {
  const viewer = useContext(ViewerContext)
  const [fixedToolbar, setFixedToolbar] = useState(true)
  const [trackedFinish, setTrackedFinish] = useState(false)
  const [fixedWall, setFixedWall] = useState(false)
  const shouldShowWall = !viewer.isAuthed && wall

  if (!mediaHash) {
    return null
  }

  return (
    <Query query={ARTICLE_DETAIL} variables={{ mediaHash }}>
      {({
        data,
        client,
        loading,
        subscribeToMore
      }: QueryResult & { data: ArticleDetailType }) => {
        const authorId = _get(data, 'article.author.id')
        const collectionCount = _get(data, 'article.collection.totalCount')
        const canEditCollection = viewer.id === authorId

        const handleWall = ({ currentPosition }: Waypoint.CallbackArgs) => {
          if (shouldShowWall) {
            setFixedWall(currentPosition === 'inside')
          }
        }

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

              if (data.article.state !== 'active' && viewer.id !== authorId) {
                return <Throw404 />
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

              useEffect(() => {
                if (process.browser && shouldShowWall) {
                  if (window.location.hash) {
                    jump('#article-footer-anchor', { offset: -10 })
                  }
                }
              }, [])

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
                            <span className="right-items">
                              {data.article.live && <IconLive />}
                              <Fingerprint
                                article={data.article}
                                color="grey"
                                size="xs"
                              />
                            </span>
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

                      <Waypoint onPositionChange={handleWall}>
                        <section className="l-col-4 l-col-md-8 l-col-lg-12">
                          <RelatedArticles article={data.article} />
                        </section>
                      </Waypoint>

                      {shouldShowWall && (
                        <Wall show={fixedWall} client={client} />
                      )}

                      <Block type="section">
                        {shouldShowWall && <section id="comments" />}
                        {!shouldShowWall && (
                          <>
                            <Responses
                              articleId={data.article.id}
                              mediaHash={mediaHash}
                            />
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
                          </>
                        )}
                        <AppreciatorsModal />
                        <ShareModal />
                      </Block>
                    </>
                  )}
                </Responsive.MediumUp>
              )
            })()}

            <section
              id="article-footer-anchor"
              className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2"
            >
              {!shouldShowWall && <Footer />}
            </section>

            <style jsx>{styles}</style>
          </main>
        )
      }}
    </Query>
  )
}

const ArticleDetailContainer = () => {
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })

  if (!mediaHash) {
    return null
  }

  return (
    <Query query={CLIENT_PREFERENCE} variables={{ id: 'local' }}>
      {({ data }) => {
        const { wall } = _get(data, 'clientPreference', { wall: true })
        return <ArticleDetail mediaHash={mediaHash} wall={wall} />
      }}
    </Query>
  )
}

export default ArticleDetailContainer
