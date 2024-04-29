import { useLazyQuery } from '@apollo/react-hooks'
import formatISO from 'date-fns/formatISO'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_COMMENT_DETAIL_DIALOG,
  OPEN_COMMENT_LIST_DRAWER,
} from '~/common/enums'
import {
  isMediaHashPossiblyValid,
  normalizeTag,
  toGlobalId,
  toPath,
} from '~/common/utils'
import {
  ActiveCommentEditorProvider,
  BackToHomeButton,
  EmptyLayout,
  Error,
  Head,
  LanguageContext,
  Layout,
  Media,
  QueryError,
  Spacer,
  SpinnerBlock,
  Throw404,
  Title,
  toast,
  Translate,
  useEventListener,
  useFeatures,
  useIntersectionObserver,
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
import { CommentDrawer, CommentDrawerStep } from './CommentDrawer'
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
import StickyTopBanner from './StickyTopBanner'
import styles from './styles.module.css'
import { SupportDrawer } from './Support/SupportDrawer'
import TagList from './TagList'
import DesktopToolbar from './Toolbar/DesktopToolbar'
import FixedToolbar from './Toolbar/FixedToolbar'
import FloatToolbar from './Toolbar/FloatToolbar'
import TranslationToast from './TranslationToast'

const DynamicSupportWidget = dynamic(() => import('./Support/SupportWidget'), {
  ssr: true, // enable for first screen
  loading: () => <SpinnerBlock />,
})
const DynamicCollection = dynamic(() => import('./Collection'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

const DynamicComments = dynamic(() => import('./Comments'), {
  ssr: false,
  loading: () => <CommentsPlaceholder />,
})

const DynamicCircleWall = dynamic(() => import('./Wall/Circle'), {
  ssr: true, // enable for first screen
  loading: () => <SpinnerBlock />,
})

const DynamicSensitiveWall = dynamic(() => import('./Wall/Sensitive'), {
  ssr: true, // enable for first screen
  loading: () => <SpinnerBlock />,
})

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

  const features = useFeatures()

  const [isSensitive, setIsSensitive] = useState<boolean>(
    article.sensitiveByAuthor || article.sensitiveByAdmin
  )

  // Float toolbar
  const [showFloatToolbar, setShowFloatToolbar] = useState(true)
  const {
    isIntersecting: isIntersectingDesktopToolbar,
    ref: desktopToolbarRef,
  } = useIntersectionObserver()
  useEffect(() => {
    setShowFloatToolbar(!isIntersectingDesktopToolbar)
  }, [isIntersectingDesktopToolbar])

  // Comment toolbar
  const [showCommentToolbar, setShowCommentToolbar] = useState(false)
  const { isIntersecting: isIntersectingComments, ref: commentsRef } =
    useIntersectionObserver()
  useEffect(() => {
    setShowCommentToolbar(isIntersectingComments)
  }, [isIntersectingComments])

  // Comment
  const [commentDrawerStep, setCommentDrawerStep] = useState<CommentDrawerStep>(
    parentId !== '' ? 'commentDetail' : 'commentList'
  )
  const [isOpenComment, setIsOpenComment] = useState(false)
  const toggleCommentDrawer = () => {
    setIsOpenComment((prevState) => !prevState)
  }

  // Quote comment from Text Selection Popover
  useEventListener(
    OPEN_COMMENT_LIST_DRAWER,
    (payload: { [key: string]: any }) => {
      setCommentDrawerStep('commentList')
      setIsOpenComment(true)
    }
  )
  // Donation
  const [isOpenDonationDrawer, setIsOpenDonationDrawer] = useState(false)
  const toggleDonationDrawer = () => {
    setIsOpenDonationDrawer((prevState) => !prevState)
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
        <FormattedMessage
          defaultMessage="Translating by Google..."
          id="17K30q"
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
      setIsOpenComment(true)
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

      <StickyTopBanner type="inactive" article={article} />

      <Media greaterThan="sm">
        <CommentDrawer
          isOpen={isOpenComment}
          onClose={toggleCommentDrawer}
          step={commentDrawerStep}
          id={article.id}
          lock={!canReadFullContent}
          switchToCommentList={() => setCommentDrawerStep('commentList')}
        />

        <SupportDrawer
          isOpen={isOpenDonationDrawer}
          onClose={toggleDonationDrawer}
          article={article}
        />
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
            editable={!lock}
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
              articleId={article.id}
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
          <DynamicSupportWidget
            article={article}
            disable={lock}
            toggleDonationDrawer={toggleDonationDrawer}
          />
        )}
        <Media greaterThanOrEqual="lg">
          <div ref={desktopToolbarRef}>
            <DesktopToolbar
              article={article}
              articleDetails={article}
              translated={translated}
              translatedLanguage={translatedLanguage}
              privateFetched={privateFetched}
              hasReport
              lock={lock}
              toggleDrawer={toggleCommentDrawer}
            />
          </div>
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

          {article.comments.totalCount > 0 && (
            <section className={styles.smUpCommentBlock} ref={commentsRef}>
              <DynamicComments id={article.id} lock={!canReadFullContent} />
            </section>
          )}
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
              lock={lock}
              showCommentToolbar={showCommentToolbar && article.canComment}
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
          toggleCommentDrawer={toggleCommentDrawer}
          toggleDonationDrawer={toggleDonationDrawer}
        />
      </Media>

      <Media greaterThanOrEqual="lg">
        <FloatToolbar
          show={showFloatToolbar}
          article={article}
          articleDetails={article}
          privateFetched={privateFetched}
          lock={lock}
          toggleCommentDrawer={toggleCommentDrawer}
          toggleDonationDrawer={toggleDonationDrawer}
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
  const mediaHash = getQuery('mediaHash')
  const shortHash = getQuery('shortHash')
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''
  const viewer = useContext(ViewerContext)

  /**
   * fetch public data
   */
  const isQueryByHash = !!(
    (shortHash || (mediaHash && isMediaHashPossiblyValid(mediaHash)))
    // && !articleId
  )

  // - `/a/:shortHash`
  // backward compatible with:
  // - `/:username:/:articleId:-:slug:-:mediaHash`
  // - `/:username:/:articleId:`
  // - `/:username:/:slug:-:mediaHash:`
  const resultByHash = usePublicQuery<ArticleDetailPublicQuery>(
    ARTICLE_DETAIL_PUBLIC,
    {
      variables: {
        mediaHash,
        shortHash,
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
      await refetchPublic()
      await loadPrivate()
    })()
  }, [mediaHash, shortHash])

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
   * Render:Article
   */
  return (
    <ActiveCommentEditorProvider>
      <BaseArticleDetail article={article} privateFetched={privateFetched} />
    </ActiveCommentEditorProvider>
  )
}

const ArticleDetailOuter = () => {
  const { getQuery, router, routerLang } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const shortHash = getQuery('shortHash')
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''

  const isQueryByHash = !!(
    (mediaHash && isMediaHashPossiblyValid(mediaHash))
    // && !articleId
  )

  const resultByHash = usePublicQuery<ArticleAvailableTranslationsQuery>(
    ARTICLE_AVAILABLE_TRANSLATIONS,
    { variables: { mediaHash, shortHash }, skip: !isQueryByHash }
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
