import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import formatISO from 'date-fns/formatISO'
import jump from 'jump.js'
import dynamic from 'next/dynamic'
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
  // usePublicLazyQuery,
  usePublicQuery,
  useResponsive,
  useRoute,
  ViewerContext,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { UserDigest } from '~/components/UserDigest'

import { ADD_TOAST, DEFAULT_LOCALE, URL_QS } from '~/common/enums'
import {
  stripAllPunct,
  toGlobalId,
  toPath,
  toUserLanguage,
} from '~/common/utils'

import Collection from './Collection'
import Content from './Content'
import CustomizedSummary from './CustomizedSummary'
import {
  ARTICLE_DETAIL_PRIVATE,
  ARTICLE_DETAIL_PUBLIC,
  ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
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

import { ArticleAccessType, UserLanguage } from '@/__generated__/globalTypes'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import {
  ArticleDetailPublic,
  ArticleDetailPublic_article,
} from './__generated__/ArticleDetailPublic'
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

const BaseArticleDetail = ({
  article,
  privateFetched,
}: {
  article: ArticleDetailPublic_article
  privateFetched: boolean
}) => {
  const { getQuery, router } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const viewer = useContext(ViewerContext)
  const locale = router.locale !== DEFAULT_LOCALE ? router.locale : ''

  const features = useFeatures()
  const isLargeUp = useResponsive('lg-up')
  const [fixedWall, setFixedWall] = useState(false)

  const authorId = article.author?.id
  const paymentPointer = article.author?.paymentPointer
  const collectionCount = article.collection?.totalCount || 0
  const isAuthor = viewer.id === authorId
  const circle = article.access.circle
  const canReadFullContent = !!(
    isAuthor ||
    !circle ||
    circle.isMember ||
    article.access.type === ArticleAccessType.public
  )

  // wall
  const { data: clientPreferenceData } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE,
    { variables: { id: 'local' } }
  )
  const { wall } = clientPreferenceData?.clientPreference || { wall: true }
  const shouldShowWall = !viewer.isAuthed && wall

  // translation
  const [autoTranslation] = useState(article.translation)
  const [translated, setTranslate] = useState(!!locale)
  const originalLang = article.language
  const { lang: preferredLang } = useContext(LanguageContext)
  const canTranslate = !!(originalLang && originalLang !== preferredLang)
  const [getTranslation, { data: translationData, loading: translating }] =
    useLazyQuery<ArticleTranslation>(ARTICLE_TRANSLATION)

  const translate = () => {
    getTranslation({ variables: { mediaHash, language: preferredLang } })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate zh_hant="正在翻譯" zh_hans="正在翻译" en="Translating" />
          ),
        },
      })
    )
  }

  const toggleTranslate = () => {
    setTranslate(!translated)

    if (!translated) {
      translate()
    }
  }

  const {
    title: translatedTitle,
    summary: translatedSummary,
    content: translatedContent,
    language: translatedLanguage,
  } = translationData?.article?.translation || autoTranslation || {}
  const title = translated && translatedTitle ? translatedTitle : article.title
  const summary =
    translated && translatedSummary ? translatedSummary : article.summary
  const content =
    translated && translatedContent ? translatedContent : article.content
  const keywords = (article.tags || []).map(({ content: c }) =>
    stripAllPunct(c)
  )

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
        path={toPath({ page: 'articleDetail', article }).href}
        noSuffix
        description={article.summary}
        keywords={keywords}
        image={article.cover}
        paymentPointer={paymentPointer}
        jsonLdData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: summary,
          /* wordCount: ... */
          keywords,
          datePublished: formatISO(
            Date.parse(article.createdAt)
          ) /* "2015-02-05T08:00:00+08:00", */,
          dateModified: article.revisedAt
            ? formatISO(Date.parse(article.revisedAt))
            : undefined /* "2015-02-05T09:20:00+08:00", */,
          image: article.cover || undefined,
          author: {
            '@type': 'Person',
            name: article.author.displayName,
            url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/@${article.author.userName}`,
          },
        }}
      />

      <PullToRefresh>
        <State article={article} />

        <section className="content">
          <TagList article={article} />

          <section className="title">
            <Title type="article">{title}</Title>

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
              canTranslate={canTranslate}
              toggleTranslate={toggleTranslate}
              canReadFullContent={canReadFullContent}
            />
          </section>

          {article?.summaryCustomized && (
            <CustomizedSummary summary={summary} />
          )}

          <Content
            article={article}
            content={content}
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
          translated={translated}
          translatedLanguage={translatedLanguage}
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

const ArticleDetail = () => {
  const { getQuery, router } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''
  const viewer = useContext(ViewerContext)
  const locale = router.locale !== DEFAULT_LOCALE ? router.locale : ''

  /**
   * fetch public data
   */
  // backward compatible with:
  // - `/:username:/:articleId:-:slug:-:mediaHash`
  // - `/:username:/:articleId:`
  // - `/:username:/:slug:-:mediaHash:`
  const resultByHash = usePublicQuery<ArticleDetailPublic>(
    ARTICLE_DETAIL_PUBLIC,
    {
      variables: {
        mediaHash,
        language: locale ? toUserLanguage(locale) : UserLanguage.zh_hant,
        includeTranslation: !!locale,
      },
      skip: !!articleId,
    }
  )
  const resultByNodeId = usePublicQuery<ArticleDetailPublic>(
    ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
    {
      variables: {
        id: toGlobalId({ type: 'Article', id: articleId }),
        language: locale ? toUserLanguage(locale) : UserLanguage.zh_hant,
        includeTranslation: !!locale,
      },
      skip: !articleId,
    }
  )

  const {
    data,
    loading,
    error,
    client,
    refetch: refetchPublic,
  } = resultByHash.data ? resultByHash : resultByNodeId

  const article = data?.article
  const authorId = article?.author?.id
  const isAuthor = viewer.id === authorId

  /**
   * fetch private data
   */
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

  // reset state to private fetchable when URL query is changed
  useEffect(() => {
    setPrivateFetched(false)
  }, [mediaHash])

  // fetch private data when mediaHash of public data is changed
  useEffect(() => {
    loadPrivate()
  }, [article?.mediaHash, viewer.id])

  // shadow replace URL
  const latestHash = article?.drafts?.filter(
    (d) => d.publishState === 'published'
  )[0]?.mediaHash
  useEffect(() => {
    if (!article || !latestHash) {
      return
    }

    const newPath = toPath({
      page: 'articleDetail',
      article: { ...article, mediaHash: latestHash },
    })

    // parse current URL: router.asPath
    const u = new URL(
      `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${router.asPath}`
    )
    const n = new URL(
      `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${
        newPath.href || newPath.pathname
      }`
    )

    // hide all utm_ tracking code parameters
    // copy all others
    const rems = [
      ...u.searchParams, // uses .entries()
      ...n.searchParams,
    ].filter(([k, v]) => !k?.startsWith('utm_'))
    const nsearch = rems.length > 0 ? `?${new URLSearchParams(rems)}` : ''
    const nhref = `${n.pathname}${nsearch}${n.hash || u.hash}`

    if (
      nhref !== router.asPath ||
      (router.locale && router.locale !== DEFAULT_LOCALE)
    ) {
      router.replace(nhref, undefined, { shallow: true, locale: false })
    }
  }, [latestHash])

  // edit mode
  const canEdit = isAuthor && !viewer.isInactive
  const mode = getQuery(URL_QS.MODE_EDIT.key)
  const [editMode, setEditMode] = useState(false)
  const exitEditMode = () => {
    if (!article) {
      return
    }

    const path = toPath({ page: 'articleDetail', article })
    router.replace(path.href)
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
                en="Hmm... It seems the author has hidden this work. Go see something else"
              />
            ) : article.state === 'banned' ? (
              <Translate
                zh_hant="該作品因違反社區約章，已被站方強制隱藏。"
                zh_hans="该作品因违反社区约章，已被站方强制隐藏。"
                en="This work is archived due to violation of community guidelines."
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
   * Render:Article
   */
  return <BaseArticleDetail article={article} privateFetched={privateFetched} />
}

export default ArticleDetail
