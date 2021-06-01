import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import jump from 'jump.js'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import {
  BackToHomeButton,
  EmptyLayout,
  Error,
  Head,
  LanguageContext,
  Layout,
  PullToRefresh,
  QueryError,
  Spinner,
  SubscribeCircleDialog,
  Throw404,
  Title,
  Translate,
  useFeatures,
  usePublicQuery,
  useResponsive,
  useRoute,
  ViewerContext,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { UserDigest } from '~/components/UserDigest'

import { ADD_TOAST, URL_QS } from '~/common/enums'
import { toPath } from '~/common/utils'

import Collection from './Collection'
import Content from './Content'
import CustomizedSummary from './CustomizedSummary'
import {
  ARTICLE_DETAIL_PRIVATE,
  ARTICLE_DETAIL_PUBLIC,
  ARTICLE_TRANSLATION,
} from './gql'
import License from './License'
import MetaInfo from './MetaInfo'
import RelatedArticles from './RelatedArticles'
import State from './State'
import styles from './styles.css'
import SupportWidget from './SupportWidget'
import TagList from './TagList'
import Toolbar from './Toolbar'
import CircleWall from './Wall/Circle'
import VisitorWall from './Wall/Visitor'

import { ArticleAccessType } from '@/__generated__/globalTypes'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { ArticleDetailPublic } from './__generated__/ArticleDetailPublic'
import { ArticleTranslation } from './__generated__/ArticleTranslation'

const DynamicResponse = dynamic(() => import('./Responses'), {
  ssr: false,
  loading: Spinner,
})

const DynamicEditMode = dynamic(() => import('./EditMode'), {
  ssr: false,
  loading: () => (
    <EmptyLayout>
      <Spinner />
    </EmptyLayout>
  ),
})

const ArticleDetail = () => {
  const { getQuery, router } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const viewer = useContext(ViewerContext)

  // UI
  const features = useFeatures()
  const isLargeUp = useResponsive('lg-up')
  const [fixedWall, setFixedWall] = useState(false)

  // wall
  const { data: clientPreferenceData } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE,
    { variables: { id: 'local' } }
  )
  const { wall } = clientPreferenceData?.clientPreference || { wall: true }
  const shouldShowWall = !viewer.isAuthed && wall

  // public data
  const {
    data,
    loading,
    error,
    client,
    refetch: refetchPublic,
  } = usePublicQuery<ArticleDetailPublic>(ARTICLE_DETAIL_PUBLIC, {
    variables: { mediaHash },
  })

  const article = data?.article
  const authorId = article?.author?.id
  const paymentPointer = article?.author?.paymentPointer || undefined
  const collectionCount = article?.collection?.totalCount || 0
  const isAuthor = viewer.id === authorId
  const circle = article?.access.circle
  const canReadFullContent = !!(
    isAuthor ||
    !circle ||
    circle.isMember ||
    article?.access.type === ArticleAccessType.public
  )
  const summary = article?.summary

  // fetch private data
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async () => {
    if (!viewer.isAuthed || !article || !article?.mediaHash) {
      return
    }

    await client.query({
      query: ARTICLE_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: {
        mediaHash: article?.mediaHash,
        includeCanSuperLike: viewer.isCivicLiker,
      },
    })

    setPrivateFetched(true)
  }

  useEffect(() => {
    setPrivateFetched(false)
  }, [mediaHash])

  useEffect(() => {
    loadPrivate()
  }, [article?.mediaHash, viewer.id])

  // redirect to latest published article
  const latestArticle = article?.drafts?.filter(
    (d) => d.publishState === 'published'
  )[0]
  const latestHash = latestArticle?.mediaHash
  useEffect(() => {
    if (!article || !latestHash) {
      return
    }

    const isSameHash = latestHash === mediaHash

    if (isSameHash) {
      return
    }

    const newPath = toPath({
      page: 'articleDetail',
      article: {
        ...article,
        mediaHash: latestHash,
      },
    })

    router.push(newPath.href, undefined, { shallow: true })
  }, [latestHash])

  // translation
  const [translated, setTranslate] = useState(false)
  const language = article?.language
  const { lang: viewerLanguage } = useContext(LanguageContext)
  const shouldTranslate = !!(language && language !== viewerLanguage)
  const [
    getTranslation,
    { data: translationData, loading: translating },
  ] = useLazyQuery<ArticleTranslation>(ARTICLE_TRANSLATION)
  const titleTranslation = translationData?.article?.translation?.title
  const contentTranslation = translationData?.article?.translation?.content
  const toggleTranslate = () => {
    setTranslate(!translated)

    if (!translated) {
      return
    }

    getTranslation({ variables: { mediaHash, language: viewerLanguage } })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="正在翻譯為繁體中文"
              zh_hans="正在翻译为简体中文"
              en="Translating to English"
            />
          ),
        },
      })
    )
  }

  // edit mode
  const canEdit = isAuthor && !viewer.isInactive
  const mode = getQuery(URL_QS.MODE_EDIT.key)
  const [editMode, setEditMode] = useState(false)
  const exitEditMode = () => {
    if (!article) {
      return
    }

    const path = toPath({ page: 'articleDetail', article })
    Router.replace(path.href)
  }

  const onEditSaved = async () => {
    setEditMode(false)
    await refetchPublic()
    loadPrivate()
    exitEditMode()
  }

  useEffect(() => {
    if (!canEdit || !article) {
      return
    }

    setEditMode(mode === URL_QS.MODE_EDIT.value)
  }, [mode, article])

  // jump to comment area
  useEffect(() => {
    if (window.location.hash && article) {
      jump('#comments', { offset: -10 })
    }
  }, [mediaHash])

  /**
   * Render:Loading
   */
  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  /**
   * Render:Error
   */
  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  /**
   * Render:404
   */
  if (!article) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  /**
   * Render:Archived/Banned
   */
  if (article.state !== 'active' && !isAuthor) {
    return (
      <EmptyLayout>
        <Error
          statusCode={404}
          message={
            article.state === 'archived' ? (
              <Translate
                zh_hant="吶，作者親手掩蓋了這篇作品的痕跡，看看別的吧"
                zh_hans="呐，作者亲手掩盖了这篇作品的痕迹，看看别的吧"
                en="hmm, the author hided this work, go see something else"
              />
            ) : article.state === 'banned' ? (
              <Translate
                zh_hant="該作品因違反社區約章，已被站方強制隱藏。"
                zh_hans="该作品因违反社区约章，已被站方强制隐藏。"
                en="This work is archived because of violation of community guidelines."
              />
            ) : null
          }
        >
          <BackToHomeButton />
        </Error>
      </EmptyLayout>
    )
  }

  /**
   * Render:Edit Mode
   */
  if (editMode) {
    return (
      <DynamicEditMode
        article={article}
        onCancel={exitEditMode}
        onSaved={onEditSaved}
      />
    )
  }

  /**
   * Render
   */
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
        title={`${article.title} - ${article?.author.displayName} (@${article.author.userName})`}
        noSuffix
        description={article.summary}
        keywords={(article.tags || []).map(({ content }) => content)}
        image={article.cover}
        paymentPointer={paymentPointer}
      />

      <PullToRefresh>
        <State article={article} />

        <section className="content">
          <TagList article={article} />

          <section className="title">
            <Title type="article">
              {translated && titleTranslation
                ? titleTranslation
                : article.title}
            </Title>

            <Waypoint
              topOffset={-400}
              onLeave={() => {
                if (shouldShowWall) {
                  setFixedWall(true)
                }
              }}
            />

            <MetaInfo
              article={article}
              translated={translated}
              shouldTranslate={shouldTranslate}
              toggleTranslate={toggleTranslate}
              canReadFullContent={canReadFullContent}
            />
          </section>

          {article?.summaryCustomized && (
            <CustomizedSummary summary={summary} />
          )}

          <Content
            article={article}
            translation={translated ? contentTranslation : null}
            translating={translating}
          />
          {circle && !canReadFullContent && <CircleWall circle={circle} />}

          {features.payment && canReadFullContent && (
            <SupportWidget article={article} />
          )}

          <License license={article.license} />

          {collectionCount > 0 && (
            <section className="block">
              <Collection article={article} collectionCount={collectionCount} />
            </section>
          )}

          <section className="block">
            <DynamicResponse lock={!canReadFullContent} />
          </section>

          {!isLargeUp && <RelatedArticles article={article} />}
        </section>

        <Toolbar
          article={article}
          privateFetched={privateFetched}
          hasFingerprint={canReadFullContent}
          hasExtend={!article.author?.isBlocking}
          lock={!canReadFullContent}
        />

        {shouldShowWall && (
          <>
            <span id="comments" />
            <VisitorWall show={fixedWall} />
          </>
        )}
      </PullToRefresh>

      {article.access.circle && (
        <SubscribeCircleDialog circle={article.access.circle} />
      )}

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default ArticleDetail
