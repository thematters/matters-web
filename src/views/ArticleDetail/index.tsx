import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import jump from 'jump.js'
import _merge from 'lodash/merge'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import {
  BackToHomeButton,
  DateTime,
  Error,
  Fingerprint,
  Footer,
  Head,
  Icon,
  Spinner,
  Throw404,
  Title,
  Translate,
  useImmersiveMode,
  useResponsive,
  ViewerContext
} from '~/components'
import { QueryError } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { UserDigest } from '~/components/UserDigest'

import { getQuery } from '~/common/utils'

import Collection from './Collection'
import Content from './Content'
import RelatedArticles from './RelatedArticles'
import State from './State'
import styles from './styles.css'
import TagList from './TagList'
import Toolbar from './Toolbar'
import Wall from './Wall'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { ArticleDetail as ArticleDetailType } from './__generated__/ArticleDetail'
// import { ArticleEdited } from './__generated__/ArticleEdited'

const ARTICLE_DETAIL = gql`
  query ArticleDetail($mediaHash: String) {
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
        ...UserDigestRichUser
      }
      collection(input: { first: 0 }) @connection(key: "articleCollection") {
        totalCount
      }
      ...ContentArticle
      ...TagListArticle
      ...RelatedArticles
      ...StateArticle
      ...FingerprintArticle
    }
  }
  ${UserDigest.Rich.fragments.user}
  ${Content.fragments.article}
  ${TagList.fragments.article}
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

const DynamicResponse = dynamic(() => import('./Responses'), {
  ssr: false,
  loading: Spinner
})

const ArticleDetail = ({
  mediaHash,
  wall
}: {
  mediaHash: string
  wall: boolean
}) => {
  const viewer = useContext(ViewerContext)
  const [fixedToolbar, setFixedToolbar] = useState(false)

  const [fixedWall, setFixedWall] = useState(false)
  const isMediumUp = useResponsive({ type: 'md-up' })()
  const { data, loading, error, client } = useQuery<ArticleDetailType>(
    ARTICLE_DETAIL,
    {
      variables: { mediaHash }
    }
  )
  // subscribeToMore,

  const shouldShowWall = !viewer.isAuthed && wall
  const article = data?.article
  const authorId = article && article.author.id
  const collectionCount = (article && article.collection.totalCount) || 0
  const canEditCollection = viewer.id === authorId
  const handleWall = ({ currentPosition }: Waypoint.CallbackArgs) => {
    if (shouldShowWall) {
      setFixedWall(currentPosition === 'inside')
    }
  }

  // useEffect(() => {
  //   if (article && article.live) {
  //     subscribeToMore<ArticleEdited>({
  //       document: ARTICLE_EDITED,
  //       variables: { id: article.id },
  //       updateQuery: (prev, { subscriptionData }) =>
  //         _merge(prev, {
  //           article: subscriptionData.data.nodeEdited
  //         })
  //     })
  //   }
  // })

  useEffect(() => {
    if (shouldShowWall && window.location.hash && article) {
      jump('#comments', { offset: -10 })
    }
  }, [article])

  useImmersiveMode('article > .content')

  if (loading) {
    return (
      <Block>
        <Spinner />
      </Block>
    )
  }

  if (error) {
    return (
      <Block>
        <QueryError error={error} />
      </Block>
    )
  }

  if (!article) {
    return <Throw404 />
  }

  if (article.state !== 'active' && viewer.id !== authorId) {
    return (
      <Block>
        <Error
          statusCode={404}
          message={
            article.state === 'archived' ? (
              <Translate
                zh_hant="吶，作者親手掩蓋了這篇作品的痕跡，看看別的吧"
                zh_hans="呐，作者亲手掩盖了这篇作品的痕迹，看看别的吧"
              />
            ) : article.state === 'banned' ? (
              <Translate
                zh_hant="該作品因違反社區約章，已被站方強制隱藏。"
                zh_hans="该作品因违反社区约章，已被站方强制隐藏。"
              />
            ) : null
          }
        >
          <BackToHomeButton />
        </Error>
      </Block>
    )
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
          <UserDigest.Rich user={article.author} hasFollow />
        </section>

        <section className="title">
          <Title type="article">{article.title}</Title>
          <span className="subtitle">
            <p className="date">
              <DateTime date={article.createdAt} />
            </p>
            <span className="right-items">
              {article.live && <Icon.Live />}
              <Fingerprint article={article} />
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

          <Toolbar placement="left" mediaHash={mediaHash} />
        </section>

        <Toolbar
          placement="bottom"
          mediaHash={mediaHash}
          fixed={fixedToolbar}
          mobile={!isMediumUp}
        />
      </Block>

      <Waypoint onPositionChange={handleWall}>
        <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
          <RelatedArticles article={article} />
        </section>
      </Waypoint>

      {shouldShowWall && <Wall show={fixedWall} client={client} />}

      <Block type="section">
        {shouldShowWall && <section id="comments" />}

        {!shouldShowWall && <DynamicResponse />}
      </Block>

      <style jsx>{styles}</style>
    </>
  )
}

const ArticleDetailContainer = () => {
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' }
  })
  const { wall } = data?.clientPreference || { wall: true }

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
