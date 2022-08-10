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

import { ADD_TOAST, URL_QS } from '~/common/enums'
import { stripAllPunct, toGlobalId, toPath } from '~/common/utils'

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

import { ArticleAccessType } from '@/__generated__/globalTypes'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { ArticleDetailPublic } from './__generated__/ArticleDetailPublic'
// import { ArticleDetailPublicByNodeId } from './__generated__/ArticleDetailPublicByNodeId'
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

const isValidMediaHash = (mediaHash: string | null | undefined) => {
  // is there a better way to detect valid?
  // a valid mediaHash, should have length 49 or 59 chars
  // 'zdpuAsCXC87Tm1fFvAbysV7HVt7J8aV6chaTKeJZ5ryLALK3Z'
  // 'bafyreief6bryqsa4byabnmx222jvo4khlodvpypw27af43frecbumn6ocq'

  return (
    mediaHash &&
    ((mediaHash?.length === 49 && mediaHash.startsWith('zdpu')) ||
      (mediaHash?.length === 59 && mediaHash.startsWith('bafy')))
  )
}

const ArticleDetail = () => {
  const { getQuery, router } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''
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
  const data1 = usePublicQuery<ArticleDetailPublic>(ARTICLE_DETAIL_PUBLIC, {
    variables: { mediaHash },
  })
  const data2 = usePublicQuery<ArticleDetailPublic>(
    ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
    {
      variables: { id: toGlobalId({ type: 'Article', id: articleId }) },
      skip: articleId?.length === 0,
    }
  )

  useEffect(() => {
    if (
      !isValidMediaHash(mediaHash) &&
      isValidMediaHash(data2?.data?.article?.mediaHash)
    ) {
      // if getByNodeId got something looks like a valid mediaHash, call refetch with it
      data1.refetch({
        mediaHash: data2?.data?.article?.mediaHash as string,
      })
    }
  }, [mediaHash, data2])

  const {
    data,
    loading,
    error,
    client,
    refetch: refetchPublic,
  } = isValidMediaHash(mediaHash) ||
  isValidMediaHash(data1?.data?.article?.mediaHash) || // if something look like a valid mediaHash
  data2.error
    ? data1
    : data2 // data2 from node id is in-use for server-side rendering only

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

    const newPath = toPath({
      page: 'articleDetail',
      article: {
        ...article,
        mediaHash: latestHash,
      },
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

    if (nhref !== router.asPath) {
      router.replace(nhref, undefined, { shallow: true })
    }
  }, [latestHash])

  // translation
  const [translated, setTranslate] = useState(false)
  const language = article?.language
  const { lang: viewerLanguage } = useContext(LanguageContext)
  const shouldTranslate = !!(language && language !== viewerLanguage)
  const [getTranslation, { data: translationData, loading: translating }] =
    useLazyQuery<ArticleTranslation>(ARTICLE_TRANSLATION)

  const titleTranslation = translationData?.article?.translation?.title
  const contentTranslation = translationData?.article?.translation?.content
  const summaryTranslation = translationData?.article?.translation?.summary

  const toggleTranslate = () => {
    setTranslate(!translated)

    if (!translated) {
      getTranslation({ variables: { mediaHash, language: viewerLanguage } })

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: (
              <Translate
                zh_hant="正在翻譯為繁體中文"
                zh_hans="正在翻译为简体中文"
                en="Translating into English"
              />
            ),
          },
        })
      )
    }
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

  const keywords = (article.tags || []).map(({ content }) =>
    stripAllPunct(content)
  )

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
            <CustomizedSummary
              summary={translated ? summaryTranslation : summary}
            />
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
