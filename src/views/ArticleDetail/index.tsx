import { useLazyQuery } from '@apollo/react-hooks'
import formatISO from 'date-fns/formatISO'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Waypoint } from 'react-waypoint'

import {
  OPEN_COMMENT_DETAIL_DIALOG,
  REFERRAL_QUERY_REFERRAL_KEY,
  URL_QS,
} from '~/common/enums'
import {
  isMediaHashPossiblyValid,
  normalizeTag,
  toGlobalId,
  toPath,
} from '~/common/utils'
import {
  BackToHomeButton,
  Drawer,
  EmptyLayout,
  Error,
  Head,
  LanguageContext,
  Layout,
  Media,
  QueryError,
  Spacer,
  Spinner,
  Throw404,
  Title,
  toast,
  Translate,
  useFeatures,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import {
  ArticleAccessType,
  ArticleAvailableTranslationsQuery,
  ArticleDetailPublicQuery,
  ArticleTranslationQuery,
  UserLanguage,
} from '~/gql/graphql'

import { AuthorSidebar } from './AuthorSidebar'
import { CommentsDialog } from './Comments/CommentsDialog'
import { Placeholder as CommentsPlaceholder } from './Comments/Placeholder'
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
import Placeholder from './Placeholder'
import State from './State'
import styles from './styles.module.css'
import TagList from './TagList'
import DesktopToolbar from './Toolbar/DesktopToolbar'
import FixedToolbar from './Toolbar/FixedToolbar'
import FloatToolbar from './Toolbar/FloatToolbar'
import TranslationToast from './TranslationToast'

const DynamicSupportWidget = dynamic(() => import('./SupportWidget'), {
  ssr: true, // enable for first screen
  loading: () => <Spinner />,
})
const DynamicCollection = dynamic(() => import('./Collection'), {
  ssr: false,
  loading: () => <Spinner />,
})

const DynamicComments = dynamic(() => import('./Comments'), {
  ssr: false,
  loading: () => <CommentsPlaceholder />,
})

const DynamicCommentsDetail = dynamic(
  () => import('./Comments/CommentDetail'),
  {
    ssr: false,
    loading: () => <CommentsPlaceholder />,
  }
)
const DynamicEditMode = dynamic(() => import('./EditMode'), {
  ssr: false,
  loading: () => (
    <EmptyLayout>
      <Spinner />
    </EmptyLayout>
  ),
})
const DynamicCircleWall = dynamic(() => import('./Wall/Circle'), {
  ssr: true, // enable for first screen
  loading: () => <Spinner />,
})

const DynamicSensitiveWall = dynamic(() => import('./Wall/Sensitive'), {
  ssr: true, // enable for first screen
  loading: () => <Spinner />,
})

type DrawerStep = 'commentList' | 'commentDetail'

const BaseArticleDetail = ({
  article,
  privateFetched,
}: {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  privateFetched: boolean
}) => {
  /**
   * Fragment Patterns
   *
   * 0. ``
   * 1. `#parentCommentId`
   * 2. `#parentComemntId-childCommentId`
   */
  let fragment = ''
  let parentId = ''
  if (typeof window !== 'undefined') {
    fragment = window.location.hash.replace('#', '')
    parentId = fragment.split('-')[0]
  }

  const { getQuery, routerLang } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const features = useFeatures()
  const [showFloatToolbar, setShowFloatToolbar] = useState(true)
  const [showCommentToolbar, setShowCommentToolbar] = useState(false)
  const [isSensitive, setIsSensitive] = useState<boolean>(
    article.sensitiveByAuthor || article.sensitiveByAdmin
  )

  const [drawerStep, setDrawerStep] = useState<DrawerStep>(
    parentId !== '' ? 'commentDetail' : 'commentList'
  )
  const isCommentDetail = drawerStep === 'commentDetail'
  const isCommentList = drawerStep === 'commentList'
  const [isOpen, setIsOpen] = useState(false)
  const [autoOpen] = useState(true)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

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

  // translation
  const [autoTranslation] = useState(article.translation) // cache initial article data since it will be overwrote by newly's if URL is shadow replaced
  const [translated, setTranslate] = useState(!!routerLang)
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

    toast.success({
      message: (
        <Translate
          zh_hant="正在透過 Google 翻譯..."
          zh_hans="正在通过 Google 翻译..."
          en="Translating by Google..."
        />
      ),
    })
  }

  const toggleTranslate = () => {
    setTranslate(!translated)

    if (!translated) {
      translate()
    }
  }

  useEffect(() => {
    if (!!autoTranslation) {
      toast.success({
        message: (
          <TranslationToast.Content language={autoTranslation.language} />
        ),
        actions: [
          {
            content: (
              <Translate
                zh_hans="阅读原文"
                zh_hant="閱讀原文"
                en="View original content"
              />
            ),
            onClick: toggleTranslate,
          },
        ],
      })
    }
  }, [])

  // set language cookie for anonymous if it doesn't exist
  useEffect(() => {
    if (cookieLang || viewer.isAuthed || !routerLang) {
      return
    }

    setLang(routerLang)
  }, [])

  // show comment detail drawer/dialog if fragment exists
  useEffect(() => {
    if (parentId === '') {
      return
    }
    setTimeout(() => {
      setIsOpen(true)
      window.dispatchEvent(new CustomEvent(OPEN_COMMENT_DETAIL_DIALOG))
    }, 500)
  }, [parentId])

  const {
    title: translatedTitle,
    summary: translatedSummary,
    content: translatedContent,
    language: translatedLanguage,
  } = translationData?.article?.translation || autoTranslation || {}
  const title = translated && translatedTitle ? translatedTitle : article.title
  const summary =
    translated && translatedSummary ? translatedSummary : article.summary
  const originalContent = article.contents.html
  const content =
    translated && translatedContent ? translatedContent : originalContent
  const keywords = (article.tags || []).map(({ content: c }) => normalizeTag(c))
  const lock = article.state !== 'active'
  const isShortWork = summary.length + content.length < 200

  return (
    <Layout.Main
      aside={
        <section className={styles.authorSidebar}>
          <AuthorSidebar article={article} />
        </section>
      }
      showAside={article.state === 'active'}
    >
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

      <Media greaterThan="sm">
        <Drawer
          isOpen={isOpen}
          onClose={toggleDrawer}
          backTo={
            isCommentDetail ? () => setDrawerStep('commentList') : undefined
          }
          title={
            isCommentList
              ? intl.formatMessage({
                  defaultMessage: 'Comment',
                  description: 'src/views/ArticleDetail/index.tsx',
                  id: 'OsX3KM',
                })
              : intl.formatMessage({
                  defaultMessage: 'Comment Details',
                  id: '4OMGUj',
                })
          }
        >
          {isCommentList && (
            <DynamicComments id={article.id} lock={!canReadFullContent} />
          )}
          {isCommentDetail && <DynamicCommentsDetail />}
        </Drawer>
      </Media>

      <section className={styles.content}>
        <section className={styles.title}>
          <Title type="article">{title}</Title>

          <MetaInfo
            article={article}
            translated={translated}
            canTranslate={canTranslate}
            toggleTranslate={toggleTranslate}
            canReadFullContent={canReadFullContent}
            disabled={lock}
          />
        </section>

        {article?.summaryCustomized && <CustomizedSummary summary={summary} />}

        {isSensitive && (
          <DynamicSensitiveWall
            sensitiveByAuthor={article.sensitiveByAuthor}
            sensitiveByAdmin={article.sensitiveByAdmin}
            expandAll={() => setIsSensitive(false)}
          />
        )}
        {!isSensitive && (
          <>
            <Content
              article={article}
              content={content}
              translating={translating}
            />

            {circle && !canReadFullContent && (
              <DynamicCircleWall circle={circle} />
            )}
          </>
        )}

        <TagList article={article} />

        <License license={article.license} />

        {features.payment && (
          <DynamicSupportWidget article={article} disable={lock} />
        )}
        <Media greaterThanOrEqual="lg">
          <Waypoint
            onEnter={() => {
              setShowFloatToolbar(false)
            }}
            onLeave={() => {
              setShowFloatToolbar(true)
            }}
          >
            <div>
              <DesktopToolbar
                article={article}
                articleDetails={article}
                translated={translated}
                translatedLanguage={translatedLanguage}
                privateFetched={privateFetched}
                hasFingerprint={canReadFullContent}
                hasReport
                lock={lock}
                toggleDrawer={toggleDrawer}
              />
            </div>
          </Waypoint>
        </Media>

        <Media greaterThan="sm">
          <Waypoint
            onEnter={() => {
              if (article.canComment && autoOpen && !isShortWork) {
                setTimeout(() => setIsOpen(true), 500)
              }
            }}
          />
        </Media>

        {collectionCount > 0 && (
          <section className={styles.block}>
            <DynamicCollection
              article={article}
              collectionCount={collectionCount}
            />
          </section>
        )}

        <Media at="sm">
          <AuthorSidebar article={article} />

          <Waypoint
            onEnter={() => {
              setShowCommentToolbar(true)
            }}
            onLeave={() => setShowCommentToolbar(false)}
          >
            {article.commentCount > 0 && (
              <section className={styles.smUpCommentBlock}>
                <DynamicComments id={article.id} lock={!canReadFullContent} />
              </section>
            )}
          </Waypoint>
        </Media>
      </section>

      <Media at="sm">
        <Spacer size="xxxloose" />
        <CommentsDialog
          id={article.id}
          article={article}
          articleDetails={article}
          translated={translated}
          translatedLanguage={translatedLanguage}
          privateFetched={privateFetched}
          lock={lock}
          showCommentToolbar={showCommentToolbar}
        >
          {({ openDialog: openCommentsDialog }) => (
            <FixedToolbar
              article={article}
              articleDetails={article}
              translated={translated}
              translatedLanguage={translatedLanguage}
              privateFetched={privateFetched}
              hasFingerprint={canReadFullContent}
              lock={lock}
              showCommentToolbar={showCommentToolbar}
              openCommentsDialog={
                article.commentCount > 0 ? openCommentsDialog : undefined
              }
            />
          )}
        </CommentsDialog>
      </Media>

      <Media at="md">
        <Spacer size="xloose" />
        <FloatToolbar
          show={true}
          article={article}
          articleDetails={article}
          privateFetched={privateFetched}
          lock={lock}
          toggleDrawer={toggleDrawer}
        />
      </Media>

      <Media greaterThanOrEqual="lg">
        <FloatToolbar
          show={showFloatToolbar}
          article={article}
          articleDetails={article}
          privateFetched={privateFetched}
          lock={lock}
          toggleDrawer={toggleDrawer}
        />
      </Media>

      <Media greaterThan="sm">
        <Waypoint
          onEnter={() => {
            if (article.canComment && autoOpen && isShortWork) {
              setTimeout(() => setIsOpen(true), 500)
            }
          }}
        />
      </Media>
    </Layout.Main>
  )
}

const ArticleDetail = ({
  includeTranslation,
}: {
  includeTranslation: boolean
}) => {
  const { getQuery, router, routerLang } = useRoute()
  const [needRefetchData, setNeedRefetchData] = useState(false)
  const mediaHash = getQuery('mediaHash')
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''
  const viewer = useContext(ViewerContext)

  /**
   * fetch public data
   */
  const isQueryByHash = !!(
    mediaHash &&
    isMediaHashPossiblyValid(mediaHash) &&
    !articleId
  )

  // backward compatible with:
  // - `/:username:/:articleId:-:slug:-:mediaHash`
  // - `/:username:/:articleId:`
  // - `/:username:/:slug:-:mediaHash:`
  const resultByHash = usePublicQuery<ArticleDetailPublicQuery>(
    ARTICLE_DETAIL_PUBLIC,
    {
      variables: {
        mediaHash,
        language: routerLang || UserLanguage.ZhHant,
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
        language: routerLang || UserLanguage.ZhHant,
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

  useEffect(() => {
    // reset state to private fetchable when URL query is changed
    setPrivateFetched(false)

    // refetch data when URL query is changed
    ;(async () => {
      if (!needRefetchData) {
        return
      }
      await refetchPublic()
      await loadPrivate()
      setNeedRefetchData(false)
    })()
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
      `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${newPath.href}`
    )

    // TODO: can remove this after 2024/2
    const isNomadTags = article.tags?.some(
      (tag) => tag.content === 'nomadmatters' || tag.content === '遊牧者計畫'
    )
    const hasReferral = u.searchParams.has(REFERRAL_QUERY_REFERRAL_KEY)
    if (!hasReferral && isNomadTags && viewer.userName) {
      u.searchParams.append(REFERRAL_QUERY_REFERRAL_KEY, viewer.userName)
    }

    // hide all utm_ tracking code parameters
    // copy all others
    const rems = [
      ...u.searchParams, // uses .entries()
      ...n.searchParams,
    ].filter(([k, v]) => !k?.startsWith('utm_'))
    const nsearch = rems.length > 0 ? `?${new URLSearchParams(rems)}` : ''
    const nhref = `${n.pathname}${nsearch}${n.hash || u.hash}`

    if (nhref !== router.asPath || routerLang) {
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

    setNeedRefetchData(true)
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
      <Layout.Main aside={<AuthorSidebar.Placeholder />}>
        <Placeholder />
      </Layout.Main>
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
          message={
            article.state === 'archived' ? (
              <Translate
                zh_hant="吶，作者親手掩蓋了這篇作品的痕跡，看看別的吧"
                zh_hans="呐，作者亲手掩盖了这篇作品的痕迹，看看别的吧"
                en="Hmm... It seems the author has hidden this work. Go see something else"
              />
            ) : article.state === 'banned' ? (
              <Translate
                zh_hant="該作品因違反社區約章，已被站方強制歸檔。"
                zh_hans="该作品因违反社区约章，已被站方强制封存。"
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
  const { getQuery, router, routerLang } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''

  const isQueryByHash = !!(
    mediaHash &&
    isMediaHashPossiblyValid(mediaHash) &&
    !articleId
  )

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
    !!routerLang &&
    (data?.article?.availableTranslations || []).includes(routerLang)

  /**
   * Rendering
   */
  if (loading) {
    return (
      <Layout.Main aside={<AuthorSidebar.Placeholder />}>
        <Placeholder />
      </Layout.Main>
    )
  }

  return <ArticleDetail includeTranslation={includeTranslation} />
}

export default ArticleDetailOuter
