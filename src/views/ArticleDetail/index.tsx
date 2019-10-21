import gql from 'graphql-tag'
import jump from 'jump.js'
import _merge from 'lodash/merge'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { DateTime, Footer, Head, Placeholder, Title } from '~/components'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { Fingerprint } from '~/components/Fingerprint'
import { useQuery } from '~/components/GQL'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { useImmersiveMode, useResponsive } from '~/components/Hook'
import IconLive from '~/components/Icon/Live'
import ShareModal from '~/components/ShareButton/ShareModal'
import Throw404 from '~/components/Throw404'
import { UserDigest } from '~/components/UserDigest'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, getQuery } from '~/common/utils'

import { ArticleDetail as ArticleDetailType } from './__generated__/ArticleDetail'
import { ArticleEdited } from './__generated__/ArticleEdited'
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

const ARTICLE_EDITED = gql`
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
  const isMediumUp = useResponsive({ type: 'medium-up' })
  const { data, loading, subscribeToMore, client } = useQuery<
    ArticleDetailType
  >(ARTICLE_DETAIL, {
    variables: { mediaHash }
  })

  const shouldShowWall = !viewer.isAuthed && wall
  const article = data && data.article
  const authorId = article && article.author.id
  const collectionCount = (article && article.collection.totalCount) || 0
  const canEditCollection = viewer.id === authorId
  const handleWall = ({ currentPosition }: Waypoint.CallbackArgs) => {
    if (shouldShowWall) {
      setFixedWall(currentPosition === 'inside')
    }
  }

  useEffect(() => {
    if (article && article.live) {
      subscribeToMore<ArticleEdited>({
        document: ARTICLE_EDITED,
        variables: { id: article.id },
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
        jump('#comments', { offset: -10 })
      }
    }
  }, [])

  useImmersiveMode('article > .content')

  if (loading) {
    return (
      <Block>
        <Placeholder.ArticleDetail />
      </Block>
    )
  }

  if (!article) {
    return <Throw404 />
  }

  if (article.state !== 'active' && viewer.id !== authorId) {
    return <Throw404 />
  }

  return (
    <>
      <Block>
        <Head
          title={article.title}
          description={article.summary}
          keywords={
            article.tags
              ? article.tags.map(({ content }: { content: any }) => content)
              : []
          }
          image={article.cover}
        />

        <State article={article} />

        <section className="author">
          <UserDigest.FullDesc user={article.author} />
        </section>

        <section className="title">
          <Title type="article">{article.title}</Title>
          <span className="subtitle">
            <p className="date">
              <DateTime date={article.createdAt} />
            </p>
            <span className="right-items">
              {article.live && <IconLive />}
              <Fingerprint article={article} color="grey" size="xs" />
            </span>
          </span>
        </section>

        <section className="content">
          <Content article={article} />
          {(collectionCount > 0 || canEditCollection) && (
            <Collection
              article={article}
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

          <TagList article={article} />
          <Toolbar placement="left" article={article} />
        </section>

        <Toolbar placement="bottom" article={article} fixed={fixedToolbar} />
      </Block>

      <Waypoint onPositionChange={handleWall}>
        <section className="l-col-4 l-col-md-8 l-col-lg-12">
          <RelatedArticles article={article} />
        </section>
      </Waypoint>

      {shouldShowWall && <Wall show={fixedWall} client={client} />}

      <Block type="section">
        {!shouldShowWall && (
          <>
            <Responses articleId={article.id} mediaHash={mediaHash} />
            <Waypoint
              onEnter={() => {
                if (!trackedFinish) {
                  analytics.trackEvent(ANALYTICS_EVENTS.FINISH_COMMENTS, {
                    entrance: article.id
                  })
                  setTrackedFinish(true)
                }
              }}
            />
          </>
        )}
        <AppreciatorsModal />
        <ShareModal />
      </Block>

      <style jsx>{styles}</style>
    </>
  )
}

const ArticleDetailContainer = () => {
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })

  if (!mediaHash) {
    return null
  }

  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' }
  })
  const { wall } = (data && data.clientPreference) || { wall: true }

  return (
    <main className="l-row">
      <ArticleDetail mediaHash={mediaHash} wall={wall} />

      <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <Footer />
      </section>
    </main>
  )
}

export default ArticleDetailContainer
