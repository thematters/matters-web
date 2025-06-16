import { useLazyQuery } from '@apollo/client'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  MAX_META_SUMMARY_LENGTH,
} from '~/common/enums'
import { makeSummary, toPath } from '~/common/utils'
import {
  BackToHomeButton,
  EmptyLayout,
  Error,
  getErrorCodes,
  Head,
  LanguageContext,
  Layout,
  Media,
  QueryError,
  SpinnerBlock,
  Throw404,
  toast,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import {
  ArticleAccessType,
  ArticleHistoryPublicQuery,
  ArticleHistoryTranslationQuery,
  ArticleLatestVersionQuery,
} from '~/gql/graphql'

import Content from '../Content'
import CustomizedSummary from '../CustomizedSummary'
import License from '../License'
import MetaInfo from '../MetaInfo'
import Placeholder from '../Placeholder'
import StickyTopBanner from '../StickyTopBanner'
import styles from '../styles.module.css'
import {
  ARTICLE_HISTORY_PRIVATE,
  ARTICLE_HISTORY_PUBLIC,
  ARTICLE_HISTORY_TRANSLATION,
  ARTICLE_LATEST_VERSION,
} from './gql'
import InfoHeader from './InfoHeader'
import Versions from './Versions'

type RevisionArticle = NonNullable<ArticleHistoryPublicQuery['article']>
type RevisionVersion = NonNullable<
  ArticleHistoryPublicQuery['version'] & {
    __typename: 'ArticleVersion'
  }
>

const DynamicCircleWall = dynamic(() => import('../Wall/Circle'), {
  ssr: true, // enable for first screen
  loading: () => <SpinnerBlock />,
})

const DynamicSensitiveWall = dynamic(() => import('../Wall/Sensitive'), {
  ssr: true, // enable for first screen
  loading: () => <SpinnerBlock />,
})

const BaseArticleDetailHistory = ({
  article,
  version,
}: {
  article: RevisionArticle
  version: RevisionVersion
}) => {
  const viewer = useContext(ViewerContext)

  const [isSensitive, setIsSensitive] = useState<boolean>(
    article.sensitiveByAuthor || article.sensitiveByAdmin
  )

  const authorId = article.author?.id
  const isAuthor = viewer.id === authorId
  const circle = article.access.circle
  const canReadFullContent = !!(
    isAuthor ||
    !circle ||
    circle.isMember ||
    article.access.type === ArticleAccessType.Public
  )

  // translation
  const [translated, setTranslate] = useState(false)
  const originalLang = article.language
  const { lang: preferredLang } = useContext(LanguageContext)
  const canTranslate = !!(originalLang && originalLang !== preferredLang)
  const [getTranslation, { data: translationData, loading: translating }] =
    useLazyQuery<ArticleHistoryTranslationQuery>(ARTICLE_HISTORY_TRANSLATION)

  const toggleTranslate = async () => {
    setTranslate(!translated)

    if (!translated && !translating) {
      const { error } = await getTranslation({
        variables: { version: version.id, language: preferredLang },
      })

      if (error) {
        setTranslate(false)

        const errorCodes = getErrorCodes(error)
        if (errorCodes.includes(ERROR_CODES.TRANSLATION_INSUFFICIENT_CREDITS)) {
          toast.error({
            message: (
              <FormattedMessage
                {...ERROR_MESSAGES[
                  ERROR_CODES.TRANSLATION_INSUFFICIENT_CREDITS
                ]}
              />
            ),
          })
          return
        }

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

  const {
    title: translatedTitle,
    summary: translatedSummary,
    content: translatedContent,
  } = (translationData?.version?.__typename === 'ArticleVersion' &&
    translationData.version.translation) ||
  {}
  const title = translated && translatedTitle ? translatedTitle : version.title
  const summary =
    translated && translatedSummary ? translatedSummary : version.summary
  const originalContent = version.contents.html
  const content =
    translated && translatedContent ? translatedContent : originalContent

  return (
    <Layout.Main aside={<Versions.Sidebar article={article} />}>
      <Head
        title={`${makeSummary(title, MAX_META_SUMMARY_LENGTH)} - ${article?.author.displayName}`}
        path={
          toPath({
            page: 'articleHistory',
            article,
            search: { v: version.id },
          }).href
        }
        description={makeSummary(summary, MAX_META_SUMMARY_LENGTH) || ''}
        image={article.cover}
        availableLanguages={article.availableTranslations || []}
      />

      <StickyTopBanner type="revision" article={article} />

      <section className={styles.content}>
        <Media lessThan="lg">
          <Versions.Dropdown article={article} />
        </Media>

        <InfoHeader article={article} version={version} />

        <section className="u-article-title">
          <h1>{title}</h1>

          <MetaInfo
            article={article}
            version={version}
            translated={translated}
            translating={translating}
            canTranslate={canTranslate}
            toggleTranslate={toggleTranslate}
            canReadFullContent={canReadFullContent}
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

        <License license={article.license} />
      </section>
    </Layout.Main>
  )
}

const ArticleDetailHistory = ({ latestVersion }: { latestVersion: string }) => {
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')
  const currVersion = getQuery('v') || latestVersion
  const viewer = useContext(ViewerContext)

  /**
   * fetch public data
   */
  const resultByHash = usePublicQuery<ArticleHistoryPublicQuery>(
    ARTICLE_HISTORY_PUBLIC,
    { variables: { shortHash, version: currVersion } }
  )

  const { data, client } = resultByHash
  const loading = resultByHash.loading
  const error = resultByHash.error

  const { article, version } = data || {}

  /**
   * fetch private data
   */
  const loadPrivate = async () => {
    if (!viewer.isAuthed || !article) {
      return
    }

    await client.query({
      query: ARTICLE_HISTORY_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { shortHash: article.shortHash, version: currVersion },
    })
  }

  useEffect(() => {
    loadPrivate()
  }, [article?.shortHash, currVersion])

  /**
   * Render:Loading
   */
  if (loading) {
    return (
      <Layout.Main>
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
  if (!article || !version || version.__typename !== 'ArticleVersion') {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  /**
   * Render:Archived/Banned
   */
  if (article.state !== 'active') {
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
    <BaseArticleDetailHistory
      article={article}
      version={version as RevisionVersion}
    />
  )
}

const ArticleDetailHistoryOuter = () => {
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')

  const resultByHash = usePublicQuery<ArticleLatestVersionQuery>(
    ARTICLE_LATEST_VERSION,
    { variables: { shortHash } }
  )

  const { data } = resultByHash
  const loading = resultByHash.loading
  const latestVersion =
    data?.article?.__typename === 'Article' &&
    data.article.versions.edges[0]?.node.id

  /**
   * Rendering
   */
  if (loading) {
    return (
      <Layout.Main>
        <Placeholder />
      </Layout.Main>
    )
  }

  if (!latestVersion) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return <ArticleDetailHistory latestVersion={latestVersion} />
}

export default ArticleDetailHistoryOuter
