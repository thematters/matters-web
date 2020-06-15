import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import jump from 'jump.js'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import {
  BackToHomeButton,
  DateTime,
  Error,
  FeaturesContext,
  Head,
  Layout,
  PullToRefresh,
  Spinner,
  Throw404,
  Title,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { UserDigest } from '~/components/UserDigest'

import { ADD_TOAST } from '~/common/enums'
import { getQuery } from '~/common/utils'

import Collection from './Collection'
import Content from './Content'
import FingerprintButton from './FingerprintButton'
import {
  ARTICLE_DETAIL_PRIVATE,
  ARTICLE_DETAIL_PUBLIC,
  ARTICLE_TRANSLATION,
} from './gql'
import RelatedArticles from './RelatedArticles'
import State from './State'
import styles from './styles.css'
import TagList from './TagList'
import Toolbar from './Toolbar'
import TranslationButton from './TranslationButton'
import Wall from './Wall'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { ArticleDetailPublic } from './__generated__/ArticleDetailPublic'
import { ArticleTranslation } from './__generated__/ArticleTranslation'

const DynamicResponse = dynamic(() => import('./Responses'), {
  ssr: false,
  loading: Spinner,
})
const DynamicDonation = dynamic(() => import('./Donation'), {
  ssr: false,
})

const EmptyLayout: React.FC = ({ children }) => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.BackButton />} />
    {children}
  </Layout.Main>
)

const ArticleDetail = () => {
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const viewer = useContext(ViewerContext)

  // UI
  const features = useContext(FeaturesContext)
  const isLargeUp = useResponsive('lg-up')
  const [fixedWall, setFixedWall] = useState(false)
  // const [showResponses, setShowResponses] = useState(false)

  // wall
  const { data: clientPreferenceData } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE,
    {
      variables: { id: 'local' },
    }
  )
  const { wall } = clientPreferenceData?.clientPreference || { wall: true }
  const shouldShowWall = !viewer.isAuthed && wall

  // public data
  const { data, loading, error, client } = useQuery<ArticleDetailPublic>(
    ARTICLE_DETAIL_PUBLIC,
    {
      variables: { mediaHash },
    }
  )

  const article = data?.article
  const authorId = article?.author?.id
  const collectionCount = article?.collection?.totalCount || 0
  const isAuthor = viewer.id === authorId

  // fetch private data
  useEffect(() => {
    if (!viewer.id || !article) {
      return
    }

    client.query({
      query: ARTICLE_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: {
        mediaHash,
      },
    })
  }, [mediaHash, viewer.id, article])

  // translation
  const [translate, setTranslate] = useState(false)
  const language = article?.language
  const viewerLanguage = viewer.settings.language
  const shouldTranslate = language && language !== viewerLanguage

  const [
    getTranslation,
    { data: translationData, loading: translating },
  ] = useLazyQuery<ArticleTranslation>(ARTICLE_TRANSLATION)
  const titleTranslation = translationData?.article?.translation?.title
  const contentTranslation = translationData?.article?.translation?.content
  const onTranslate = (newTranslate: boolean) => {
    setTranslate(newTranslate)

    if (!newTranslate) {
      return
    }

    getTranslation({
      variables: { mediaHash, language: viewerLanguage },
    })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="正在翻譯為繁體中文"
              zh_hans="正在翻译为简体中文"
            />
          ),
        },
      })
    )
  }

  /**
   * Render
   */
  useEffect(() => {
    if (shouldShowWall && window.location.hash && article) {
      jump('#comments', { offset: -10 })
    }
  }, [mediaHash])

  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  if (!article) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  if (article.state !== 'active' && viewer.id !== authorId) {
    return (
      <EmptyLayout>
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
      </EmptyLayout>
    )
  }

  return (
    <Layout.Main aside={<RelatedArticles article={article} inSidebar />}>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <UserDigest.Rich
            user={article.author}
            size="sm"
            spacing={[0, 0]}
            bgColor="none"
          />
        }
      />

      <Head
        title={article.title}
        description={article.summary}
        keywords={(article.tags || []).map(({ content }) => content)}
        image={article.cover}
      />

      <PullToRefresh>
        <State article={article} />

        <section className="content">
          <TagList article={article} />

          <section className="title">
            <Title type="article">
              {translate && titleTranslation ? titleTranslation : article.title}
            </Title>

            <section className="info">
              <section className="left">
                <DateTime date={article.createdAt} color="grey" />

                <FingerprintButton article={article} />

                {shouldTranslate && (
                  <TranslationButton
                    translate={translate}
                    setTranslate={onTranslate}
                  />
                )}
              </section>

              <section className="right" />
            </section>
          </section>

          <Content
            article={article}
            translation={translate ? contentTranslation : null}
            translating={translating}
          />

          {features.payment && <DynamicDonation mediaHash={mediaHash} />}

          {/* <Waypoint
            bottomOffset={-200}
            onEnter={() => {
              setShowResponses(true)
            }}
          /> */}

          {(collectionCount > 0 || isAuthor) && (
            <section className="block">
              <Collection article={article} collectionCount={collectionCount} />
            </section>
          )}

          <Waypoint
            onPositionChange={({ currentPosition }) => {
              if (shouldShowWall) {
                setFixedWall(currentPosition === 'inside')
              }
            }}
          />

          {!shouldShowWall && (
            // showResponses &&
            <section className="block">
              <DynamicResponse />
            </section>
          )}

          {!isLargeUp && !shouldShowWall && (
            <RelatedArticles article={article} />
          )}
        </section>

        <Toolbar article={article} />

        {shouldShowWall && (
          <>
            <section id="comments" />
            <Wall show={fixedWall} />
          </>
        )}
      </PullToRefresh>

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default ArticleDetail
