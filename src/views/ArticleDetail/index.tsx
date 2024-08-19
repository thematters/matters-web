import { useLazyQuery } from '@apollo/react-hooks'
import formatISO from 'date-fns/formatISO'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_COMMENT_DETAIL_DIALOG,
  OPEN_COMMENT_LIST_DRAWER,
} from '~/common/enums'
import { analytics, normalizeTag, toPath } from '~/common/utils'
import {
  ActiveCommentEditorProvider,
  ArticleAppreciationContext,
  ArticleAppreciationProvider,
  BackToHomeButton,
  BackToHomeMobileButton,
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
  toast,
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
import type { CommentDrawerStep } from './CommentDrawer'
import { CommentsDialog } from './Comments/CommentsDialog'
import { Placeholder as CommentsPlaceholder } from './Comments/Placeholder'
import Content from './Content'
import CustomizedSummary from './CustomizedSummary'
import {
  ARTICLE_AVAILABLE_TRANSLATIONS,
  ARTICLE_DETAIL_PRIVATE,
  ARTICLE_DETAIL_PUBLIC,
  ARTICLE_TRANSLATION,
} from './gql'
import License from './License'
import MetaInfo from './MetaInfo'
import Placeholder from './Placeholder'
import StickyTopBanner from './StickyTopBanner'
import styles from './styles.module.css'
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
const DynamicCommentDrawer = dynamic(
  () => import('./CommentDrawer').then((mod) => mod.CommentDrawer),
  {
    ssr: false,
  }
)
const DynamicSupportDrawer = dynamic(
  () => import('./Support/SupportDrawer').then((mod) => mod.SupportDrawer),
  {
    ssr: false,
  }
)

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

  const { routerLang } = useRoute()
  const viewer = useContext(ViewerContext)
  const { initArticleAppreciationContext } = useContext(
    ArticleAppreciationContext
  )

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
    getTranslation({
      variables: { shortHash: article.shortHash, language: preferredLang },
    })

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
              <FormattedMessage
                defaultMessage="View original content"
                id="G0pqnh"
              />
            ),
            onClick: toggleTranslate,
          },
        ],
      })
    }
  }, [])

  useEffect(() => {
    initArticleAppreciationContext(
      article.likesReceivedTotal,
      article.appreciateLeft
    )
  }, [article.appreciateLeft, article.likesReceivedTotal])

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
        <DynamicCommentDrawer
          isOpen={isOpenComment}
          onClose={toggleCommentDrawer}
          step={commentDrawerStep}
          id={article.id}
          lock={!canReadFullContent}
          switchToCommentList={() => setCommentDrawerStep('commentList')}
        />

        <DynamicSupportDrawer
          isOpen={isOpenDonationDrawer}
          onClose={toggleDonationDrawer}
          article={article}
        />
      </Media>

      <section className={styles.content}>
        <Media at="sm" className={styles.mobileLogo}>
          <BackToHomeMobileButton />
        </Media>
        <section className="u-article-title">
          <h1>{title}</h1>

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
            toggleDonationDrawer={() => {
              analytics.trackEvent('click_button', {
                type: isOpenDonationDrawer ? 'support_close' : 'support_open',
                pageType: 'article_detail',
                pageComponent: 'article_end',
              })
              toggleDonationDrawer()
            }}
          />
        )}

        <Media greaterThanOrEqual="lg">
          <div ref={desktopToolbarRef}>
            <DesktopToolbar
              articleDetails={article}
              translated={translated}
              translatedLanguage={translatedLanguage}
              privateFetched={privateFetched}
              hasReport
              lock={lock}
              toggleDrawer={() => {
                analytics.trackEvent('click_button', {
                  type: isOpenComment ? 'comment_close' : 'comment_open',
                  pageType: 'article_detail',
                  pageComponent: 'article_end_toolbar',
                })
                toggleCommentDrawer()
              }}
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
          articleDetails={article}
          translated={translated}
          translatedLanguage={translatedLanguage}
          privateFetched={privateFetched}
          lock={lock}
          showCommentToolbar={showCommentToolbar}
        >
          {({ openDialog: openCommentsDialog }) => (
            <FixedToolbar
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
          articleDetails={article}
          privateFetched={privateFetched}
          lock={lock}
          toggleCommentDrawer={() => {
            analytics.trackEvent('click_button', {
              type: isOpenComment ? 'comment_close' : 'comment_open',
              pageType: 'article_detail',
              pageComponent: 'article_float_toolbar',
            })
            toggleCommentDrawer()
          }}
          toggleDonationDrawer={() => {
            analytics.trackEvent('click_button', {
              type: isOpenDonationDrawer ? 'support_close' : 'support_open',
              pageType: 'article_detail',
              pageComponent: 'article_float_toolbar',
            })
            toggleDonationDrawer()
          }}
        />
      </Media>

      <Media greaterThanOrEqual="lg">
        <FloatToolbar
          show={showFloatToolbar}
          articleDetails={article}
          privateFetched={privateFetched}
          lock={lock}
          toggleCommentDrawer={() => {
            analytics.trackEvent('click_button', {
              type: isOpenComment ? 'comment_close' : 'comment_open',
              pageType: 'article_detail',
              pageComponent: 'article_float_toolbar',
            })
            toggleCommentDrawer()
          }}
          toggleDonationDrawer={() => {
            analytics.trackEvent('click_button', {
              type: isOpenDonationDrawer ? 'support_close' : 'support_open',
              pageType: 'article_detail',
              pageComponent: 'article_float_toolbar',
            })
            toggleDonationDrawer()
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
  const { getQuery, routerLang } = useRoute()
  const shortHash = getQuery('shortHash')
  const viewer = useContext(ViewerContext)

  /**
   * fetch public data
   */
  const resultByHash = usePublicQuery<ArticleDetailPublicQuery>(
    ARTICLE_DETAIL_PUBLIC,
    {
      variables: {
        shortHash,
        language: routerLang || UserLanguage.ZhHant,
        includeTranslation,
      },
    }
  )

  const { data, client, refetch: refetchPublic } = resultByHash
  const loading = resultByHash.loading
  const error = resultByHash.error

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
  }, [shortHash])

  // fetch private data when shortHash of public data is changed
  useEffect(() => {
    loadPrivate()
  }, [article?.shortHash, viewer.id])

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
              <FormattedMessage
                defaultMessage="Hmm... It seems the author has hidden this work. Go see something else"
                id="qhVSGI"
              />
            ) : article.state === 'banned' ? (
              <FormattedMessage
                defaultMessage="This work is archived due to violation of community guidelines."
                id="/dKzfc"
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
    <ArticleAppreciationProvider>
      <ActiveCommentEditorProvider>
        <BaseArticleDetail article={article} privateFetched={privateFetched} />
      </ActiveCommentEditorProvider>
    </ArticleAppreciationProvider>
  )
}

const ArticleDetailOuter = () => {
  const { getQuery, routerLang } = useRoute()
  const shortHash = getQuery('shortHash')

  const resultByHash = usePublicQuery<ArticleAvailableTranslationsQuery>(
    ARTICLE_AVAILABLE_TRANSLATIONS,
    { variables: { shortHash } }
  )
  const { data } = resultByHash
  const loading = resultByHash.loading
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
