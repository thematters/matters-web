import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import formatISO from 'date-fns/formatISO'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { ADD_TOAST, DEFAULT_LOCALE, URL_QS } from '~/common/enums'
import {
  normalizeTag,
  toGlobalId,
  toPath,
  toUserLanguage,
} from '~/common/utils'
import {
  BackToHomeButton,
  EmptyLayout,
  Error,
  Head,
  LanguageContext,
  Layout,
  Media,
  QueryError,
  Spinner,
  Throw404,
  Title,
  Translate,
  useFeatures,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { UserDigest } from '~/components/UserDigest'
import {
  ArticleAccessType,
  ArticleAvailableTranslationsQuery,
  ArticleDetailPublicQuery,
  ArticleTranslationQuery,
  ClientPreferenceQuery,
  UserLanguage,
} from '~/gql/graphql'

import Content from './Content'
import CustomizedSummary from './CustomizedSummary'
import {
  ARTICLE_AVAILABLE_TRANSLATIONS,
  ARTICLE_AVAILABLE_TRANSLATIONS_BY_NODE_ID,
  ARTICLE_DETAIL_PRIVATE,
  ARTICLE_DETAIL_PUBLIC,
  ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
  ARTICLE_TRANSLATION,
} from './gql'
import License from './License'
import MetaInfo from './MetaInfo'
import RelatedArticles from './RelatedArticles'
import State from './State'
import styles from './styles.module.css'
import TagList from './TagList'
import Toolbar from './Toolbar'
import TranslationToast from './TranslationToast'

const DynamicSupportWidget = dynamic(() => import('./SupportWidget'), {
  ssr: true, // enable for first screen
  loading: Spinner,
})
const DynamicCollection = dynamic(() => import('./Collection'), {
  ssr: false,
  loading: Spinner,
})
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
const DynamicVisitorWall = dynamic(() => import('./Wall/Visitor'), {
  ssr: false,
})
const DynamicCircleWall = dynamic(() => import('./Wall/Circle'), {
  ssr: true, // enable for first screen
  loading: Spinner,
})
const DynamicSubscribeCircleDialog = dynamic(
  () =>
    import('~/components/Dialogs/SubscribeCircleDialog').then(
      (mod) => mod.SubscribeCircleDialog
    ),
  { ssr: false }
)

const isMediaHashPossiblyValid = (mediaHash?: string | null) => {
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

const BaseArticleDetail = ({
  article,
  privateFetched,
}: {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  privateFetched: boolean
}) => {
  const { getQuery, router } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const viewer = useContext(ViewerContext)
  const locale = router.locale !== DEFAULT_LOCALE ? router.locale : ''

  const features = useFeatures()
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
    article.access.type === ArticleAccessType.Public
  )

  // wall
  const { data: clientPreferenceData } = useQuery<ClientPreferenceQuery>(
    CLIENT_PREFERENCE,
    { variables: { id: 'local' } }
  )
  const { wall } = clientPreferenceData?.clientPreference || { wall: true }
  const shouldShowWall = !viewer.isAuthed && wall

  // translation
  const [autoTranslation] = useState(article.translation) // cache initial article data since it will be overwrote by newly's if URL is shadow replaced
  const [translated, setTranslate] = useState(!!locale)
  const originalLang = article.language
  const {
    lang: preferredLang,
    cookieLang,
    setLang,
  } = useContext(LanguageContext)
  const canTranslate = !!(originalLang && originalLang !== preferredLang)
  const [getTranslation, { data: translationData, loading: translating }] =
    useLazyQuery<ArticleTranslationQuery>(ARTICLE_TRANSLATION)

  const translate = () => {
    getTranslation({ variables: { mediaHash, language: preferredLang } })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="正在透過 Google 翻譯..."
              zh_hans="正在通过 Google 翻译..."
              en="Translating by Google..."
            />
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
  useEffect(() => {
    if (!!autoTranslation) {
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'black',
              placement: 'bottom',
              duration: 8 * 1000,
              clearable: true,
              content: (
                <TranslationToast.Content language={autoTranslation.language} />
              ),
              switchContent: (
                <TranslationToast.SwitchContent onClick={toggleTranslate} />
              ),
            },
          })
        )
      })
    }
  }, [])

  // set language cookie for anonymous if it doesn't exist
  useEffect(() => {
    if (cookieLang || viewer.isAuthed || !locale) {
      return
    }

    setLang(toUserLanguage(locale) as UserLanguage)
  }, [])

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
  const keywords = (article.tags || []).map(({ content: c }) => normalizeTag(c))

  return (
    <Layout.Main aside={<RelatedArticles article={article} inSidebar />}>
      <Layout.Header
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
        title={`${title} - ${article?.author.displayName} (@${article.author.userName})`}
        path={toPath({ page: 'articleDetail', article }).href}
        noSuffix
        description={summary}
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
        availableLanguages={article.availableTranslations || []}
      />

      <State article={article} />

      <section className={styles['content']}>
        <TagList article={article} />
        <section className={styles['title']}>
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
        {article?.summaryCustomized && <CustomizedSummary summary={summary} />}
        <Content
          article={article}
          content={content}
          translating={translating}
        />
        <License license={article.license} />
        {circle && !canReadFullContent && <DynamicCircleWall circle={circle} />}
        {features.payment && canReadFullContent && (
          <DynamicSupportWidget article={article} />
        )}
        {collectionCount > 0 && (
          <section className={styles['block']}>
            <DynamicCollection
              article={article}
              collectionCount={collectionCount}
            />
          </section>
        )}
        <section className={styles['block']}>
          <DynamicResponse id={article.id} lock={!canReadFullContent} />
        </section>
        <Media lessThan="xl">
          <RelatedArticles article={article} />
        </Media>
      </section>

      <Toolbar
        article={article}
        articleDetails={article}
        translated={translated}
        translatedLanguage={translatedLanguage}
        privateFetched={privateFetched}
        hasFingerprint={canReadFullContent}
        hasExtend={!article.author?.isBlocking}
        lock={!canReadFullContent}
      />

      {shouldShowWall && <DynamicVisitorWall show={fixedWall} />}

      {article.access.circle && (
        <DynamicSubscribeCircleDialog circle={article.access.circle} />
      )}
    </Layout.Main>
  )
}

const ArticleDetail = ({
  includeTranslation,
}: {
  includeTranslation: boolean
}) => {
  const { getQuery, router } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''
  const viewer = useContext(ViewerContext)
  const locale = router.locale !== DEFAULT_LOCALE ? router.locale : ''

  /**
   * fetch public data
   */
  const isQueryByHash = !!(mediaHash && isMediaHashPossiblyValid(mediaHash))

  // backward compatible with:
  // - `/:username:/:articleId:-:slug:-:mediaHash`
  // - `/:username:/:articleId:`
  // - `/:username:/:slug:-:mediaHash:`
  const resultByHash = usePublicQuery<ArticleDetailPublicQuery>(
    ARTICLE_DETAIL_PUBLIC,
    {
      variables: {
        mediaHash,
        language: locale ? toUserLanguage(locale) : UserLanguage.ZhHant,
        includeTranslation,
      },
      skip: !isQueryByHash,
    }
  )
  const resultByNodeId = usePublicQuery<ArticleDetailPublicQuery>(
    ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
    {
      variables: {
        id: toGlobalId({ type: 'Article', id: articleId }),
        language: locale ? toUserLanguage(locale) : UserLanguage.ZhHant,
        includeTranslation,
      },
      skip: isQueryByHash,
    }
  )

  const {
    data,
    client,
    refetch: refetchPublic,
  } = resultByHash.data ? resultByHash : resultByNodeId
  const loading = resultByHash.loading || resultByNodeId.loading
  const error = resultByHash.error || resultByNodeId.error

  const article = data?.article
  const authorId = article?.author?.id
  const isAuthor = viewer.id === authorId

  /**
   * fetch private data
   */
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async () => {
    if (!viewer.isAuthed || !article) {
      return
    }

    await client.query({
      query: ARTICLE_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: {
        id: article?.id,
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
    exitEditMode()

    await refetchPublic()
    loadPrivate()
  }

  useEffect(() => {
    if (!canEdit || !article) {
      return
    }

    setEditMode(mode === URL_QS.MODE_EDIT.value)
  }, [mode, article])

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

const ArticleDetailOuter = () => {
  const { getQuery, router } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''
  const locale = router.locale !== DEFAULT_LOCALE ? router.locale : ''

  const isQueryByHash = !!(mediaHash && isMediaHashPossiblyValid(mediaHash))
  const resultByHash = usePublicQuery<ArticleAvailableTranslationsQuery>(
    ARTICLE_AVAILABLE_TRANSLATIONS,
    { variables: { mediaHash }, skip: !isQueryByHash }
  )
  const resultByNodeId = usePublicQuery<ArticleAvailableTranslationsQuery>(
    ARTICLE_AVAILABLE_TRANSLATIONS_BY_NODE_ID,
    {
      variables: { id: toGlobalId({ type: 'Article', id: articleId }) },
      skip: isQueryByHash,
    }
  )
  const { data } = resultByHash.data ? resultByHash : resultByNodeId
  const loading = resultByHash.loading || resultByNodeId.loading
  const includeTranslation =
    !!locale &&
    (data?.article?.availableTranslations || []).includes(
      toUserLanguage(locale) as UserLanguage
    )

  /**
   * Rendering
   */
  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  return <ArticleDetail includeTranslation={includeTranslation} />
}

export default ArticleDetailOuter
