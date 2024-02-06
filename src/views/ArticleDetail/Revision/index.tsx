import formatISO from 'date-fns/formatISO'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import { normalizeTag, toGlobalId, toPath } from '~/common/utils'
import {
  BackToHomeButton,
  EmptyLayout,
  Error,
  Head,
  Layout,
  Media,
  QueryError,
  Spinner,
  Throw404,
  Title,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import {
  ArticleAccessType,
  ArticleAvailableTranslationsQuery,
  ArticleDetailPublicQuery,
  UserLanguage,
} from '~/gql/graphql'

import Content from '../Content'
import CustomizedSummary from '../CustomizedSummary'
import {
  ARTICLE_AVAILABLE_TRANSLATIONS,
  ARTICLE_AVAILABLE_TRANSLATIONS_BY_NODE_ID,
  ARTICLE_DETAIL_PRIVATE,
  ARTICLE_DETAIL_PUBLIC,
  ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
} from '../gql'
import License from '../License'
import MetaInfo from '../MetaInfo'
import Placeholder from '../Placeholder'
import StickyTopBanner from '../StickyTopBanner'
import styles from '../styles.module.css'
import TagList from '../TagList'
import { InfoHeader } from './InfoHeader'
import { VersionsDropdown } from './VersionsDropdown'
import { VersionsSidebar } from './VersionsSidebar'

const DynamicCircleWall = dynamic(() => import('../Wall/Circle'), {
  ssr: true, // enable for first screen
  loading: () => <Spinner />,
})

const DynamicSensitiveWall = dynamic(() => import('../Wall/Sensitive'), {
  ssr: true, // enable for first screen
  loading: () => <Spinner />,
})

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

const BaseArticleDetailRevision = ({
  article,
}: {
  article: NonNullable<ArticleDetailPublicQuery['article']>
}) => {
  const viewer = useContext(ViewerContext)

  const [isSensitive, setIsSensitive] = useState<boolean>(
    article.sensitiveByAuthor || article.sensitiveByAdmin
  )

  const authorId = article.author?.id
  const paymentPointer = article.author?.paymentPointer
  const isAuthor = viewer.id === authorId
  const circle = article.access.circle
  const canReadFullContent = !!(
    isAuthor ||
    !circle ||
    circle.isMember ||
    article.access.type === ArticleAccessType.Public
  )

  const title = article.title
  const summary = article.summary
  const content = article.contents.html
  const keywords = (article.tags || []).map(({ content: c }) => normalizeTag(c))
  const lock = article.state !== 'active'

  return (
    <Layout.Main aside={<VersionsSidebar />}>
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

      <StickyTopBanner type="revision" article={article} />

      <section className={styles.content}>
        <Media lessThan="lg">
          <VersionsDropdown />
        </Media>

        <InfoHeader />

        <section className={styles.title}>
          <Title type="article">{title}</Title>

          <MetaInfo
            article={article}
            translated={false}
            canTranslate={false}
            toggleTranslate={() => {}}
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
            <Content article={article} content={content} />

            {circle && !canReadFullContent && (
              <DynamicCircleWall circle={circle} />
            )}
          </>
        )}

        <TagList article={article} />

        <License license={article.license} />
      </section>
    </Layout.Main>
  )
}

const ArticleDetailRevision = ({
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
  }

  useEffect(() => {
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
  // const latestHash = article?.drafts?.filter(
  //   (d) => d.publishState === 'published'
  // )[0]?.mediaHash
  // useEffect(() => {
  //   if (!article || !latestHash) {
  //     return
  //   }

  //   const newPath = toPath({
  //     page: 'articleDetail',
  //     article: { ...article, mediaHash: latestHash },
  //   })

  //   // parse current URL: router.asPath
  //   const u = new URL(
  //     `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${router.asPath}`
  //   )
  //   const n = new URL(
  //     `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${newPath.href}`
  //   )

  //   // hide all utm_ tracking code parameters
  //   // copy all others
  //   const rems = [
  //     ...u.searchParams, // uses .entries()
  //     ...n.searchParams,
  //   ].filter(([k, v]) => !k?.startsWith('utm_'))
  //   const nsearch = rems.length > 0 ? `?${new URLSearchParams(rems)}` : ''
  //   const nhref = `${n.pathname}${nsearch}${n.hash || u.hash}`

  //   if (nhref !== router.asPath || routerLang) {
  //     router.replace(nhref, undefined, { shallow: true, locale: false })
  //   }
  // }, [latestHash])

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
  return <BaseArticleDetailRevision article={article} />
}

const ArticleDetailRevisionOuter = () => {
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
      <Layout.Main>
        <Placeholder />
      </Layout.Main>
    )
  }

  return <ArticleDetailRevision includeTranslation={includeTranslation} />
}

export default ArticleDetailRevisionOuter
