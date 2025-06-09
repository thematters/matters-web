import { useLazyQuery } from '@apollo/client'
import { formatISO } from 'date-fns'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import {
  MAX_META_SUMMARY_LENGTH,
  OPEN_COMMENT_DETAIL_DIALOG,
  OPEN_COMMENT_LIST_DRAWER,
} from '~/common/enums'
import {
  analytics,
  makeSummary,
  normalizeTag,
  parseCommentHash,
  toPath,
} from '~/common/utils'
import {
  BackToHomeButton,
  CommentEditorProvider,
  DrawerProvider,
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
import Header from './Header'
import License from './License'
import MetaInfo from './MetaInfo'
import Placeholder from './Placeholder'
import StickyTopBanner from './StickyTopBanner'
import styles from './styles.module.css'
import TagList from './TagList'
import DesktopToolbar from './Toolbar/DesktopToolbar'
import FixedToolbar from './Toolbar/FixedToolbar'
import FloatToolbar from './Toolbar/FloatToolbar'

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
  const { parentId } = parseCommentHash()

  const { routerLang } = useRoute()
  const viewer = useContext(ViewerContext)

  const features = useFeatures()

  const [isSensitive, setIsSensitive] = useState<boolean>(
    article.sensitiveByAuthor || article.sensitiveByAdmin
  )

  // Float toolbar
  const { isIntersecting: hideFloatToolbar, ref: desktopToolbarRef } =
    useIntersectionObserver()

  // Comment toolbar
  const { isIntersecting: showCommentToolbar, ref: commentsRef } =
    useIntersectionObserver()

  // Comment
  const [commentDrawerStep, setCommentDrawerStep] = useState<CommentDrawerStep>(
    !!parentId ? 'commentDetail' : 'commentList'
  )
  const [isOpenComment, setIsOpenComment] = useState(false)
  const toggleCommentDrawer = () => {
    setIsOpenComment((prevState) => !prevState)
  }

  // Quote comment from Text Selection Popover
  useEventListener(OPEN_COMMENT_LIST_DRAWER, () => {
    setCommentDrawerStep('commentList')
    setIsOpenComment(true)
  })
  // Donation
  const [isOpenDonationDrawer, setIsOpenDonationDrawer] = useState(false)
  const toggleDonationDrawer = () => {
    setIsOpenDonationDrawer((prevState) => !prevState)
  }

  const authorId = article.author?.id
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

  const toggleTranslate = async () => {
    setTranslate(!translated)

    if (!translated && !translating) {
      const { error } = await getTranslation({
        variables: { shortHash: article.shortHash, language: preferredLang },
      })

      if (error) {
        setTranslate(false)

        toast.error({
          message: (
            <FormattedMessage
              defaultMessage="Translation error. Please try again."
              id="E1M4vK"
            />
          ),
        })
      }
    }
  }

  // reset to original language when preferred language is changed
  useEffect(() => {
    setTranslate(false)
  }, [preferredLang])

  useEffect(() => {
    if (!!autoTranslation) {
      setTranslate(true)
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
    if (!parentId) {
      return
    }
    setTimeout(() => {
      setIsOpenComment(true)
      window.dispatchEvent(
        new CustomEvent(OPEN_COMMENT_DETAIL_DIALOG, {
          detail: { parentId },
        })
      )
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
        title={
          article?.author.displayName
            ? `${makeSummary(title, MAX_META_SUMMARY_LENGTH)} - ${article?.author.displayName}`
            : `${makeSummary(title, MAX_META_SUMMARY_LENGTH)}`
        }
        path={toPath({ page: 'articleDetail', article }).href}
        description={makeSummary(summary, MAX_META_SUMMARY_LENGTH) || ''}
        keywords={keywords}
        image={article.cover || IMAGE_INTRO.src}
        jsonLdData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: makeSummary(summary, MAX_META_SUMMARY_LENGTH),
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
        noindex={article.noindex}
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
        <Header article={article} />

        <section className="u-article-title">
          <h1>{title}</h1>

          <MetaInfo
            article={article}
            translated={translated}
            translating={translating}
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
            expandAll={() => setIsSensitive(false)}
          />
        )}
        {!isSensitive && (
          <>
            <Content
              articleId={article.id}
              content={content}
              indentFirstLine={article.indentFirstLine}
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
            <DynamicCollection article={article} />
          </section>
        )}

        <Media lessThan="lg">
          <AuthorSidebar article={article} />
        </Media>

        <Media at="sm">
          {article.comments.totalCount > 0 && (
            <section className={styles.smUpCommentBlock} ref={commentsRef}>
              <DynamicComments id={article.id} lock={!canReadFullContent} />
            </section>
          )}
        </Media>
      </section>

      <Media at="sm">
        <Spacer size="sp64" />
        <CommentsDialog
          id={article.id}
          articleDetails={article}
          translated={translated}
          translatedLanguage={translatedLanguage}
          privateFetched={privateFetched}
          lock={lock}
          showCommentToolbar={showCommentToolbar}
        />
        <FixedToolbar
          articleDetails={article}
          translated={translated}
          translatedLanguage={translatedLanguage}
          privateFetched={privateFetched}
          lock={lock}
          showCommentToolbar={showCommentToolbar && article.canComment}
          openCommentsDialog={
            article.commentCount > 0
              ? () =>
                  window.dispatchEvent(
                    new CustomEvent(OPEN_COMMENT_DETAIL_DIALOG)
                  )
              : undefined
          }
        />
      </Media>

      <Media greaterThan="sm">
        <FloatToolbar
          show={!hideFloatToolbar}
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

  const { data, client, loading, error } = resultByHash
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

    setPrivateFetched(false)

    await client.query({
      query: ARTICLE_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { shortHash },
    })

    setPrivateFetched(true)
  }

  // fetch private data when shortHash is changed
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
            article.state === 'banned' ? (
              <FormattedMessage
                defaultMessage="This work is archived due to violation of community guidelines."
                id="/dKzfc"
              />
            ) : null
          }
          type="not_found"
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
    <DrawerProvider>
      <CommentEditorProvider>
        <BaseArticleDetail article={article} privateFetched={privateFetched} />
      </CommentEditorProvider>
    </DrawerProvider>
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
