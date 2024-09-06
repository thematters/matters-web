import { NetworkStatus } from '@apollo/client'
import React, { useContext, useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconRead } from '@/public/static/icons/24px/read.svg'
import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestFeed,
  Empty,
  Icon,
  InfiniteScroll,
  LanguageContext,
  List,
  QueryError,
  SpinnerBlock,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import {
  ArticleFeedsCampaignFragment,
  CampaignArticlesPublicQuery,
} from '~/gql/graphql'

import {
  CampaignFeedType,
  FEED_TYPE_ALL,
  FEED_TYPE_ANNOUNCEMENT,
} from '../Tabs'
import { CAMPAIGN_ARTICLES_PRIVATE, CAMPAIGN_ARTICLES_PUBLIC } from './gql'
import styles from './styles.module.css'

interface MainFeedProps {
  feedType: CampaignFeedType
  camapign: ArticleFeedsCampaignFragment
}

export type CampaignArticlesPublicQueryArticle = NonNullable<
  NonNullable<
    NonNullable<CampaignArticlesPublicQuery['campaign']>['articles']
  >['edges']
>[number]['node']

const getArticleStage = (article: CampaignArticlesPublicQueryArticle) => {
  const stage = article.campaigns[0]?.stage
  return stage
}

const getArticleStageName = (
  article: CampaignArticlesPublicQueryArticle,
  lang: string
) => {
  const stage = getArticleStage(article)

  // announcement if nullish
  if (!stage) {
    return <FormattedMessage defaultMessage="Announcement" id="Sj+TN8" />
  }

  return stage[
    `name${lang === 'en' ? 'En' : lang === 'zh-Hans' ? 'ZhHans' : 'ZhHant'}`
  ]
}

const MainFeed = ({ feedType, camapign }: MainFeedProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')
  const isAll = feedType === FEED_TYPE_ALL
  const isAnnouncement = feedType === FEED_TYPE_ANNOUNCEMENT
  const announcements = camapign.announcements

  const { data, loading, error, fetchMore, networkStatus, client } =
    usePublicQuery<CampaignArticlesPublicQuery>(CAMPAIGN_ARTICLES_PUBLIC, {
      variables: {
        shortHash,
        ...(!isAll ? { filter: { stage: feedType } } : {}),
      },
      skip: isAnnouncement,
    })

  // pagination
  const connectionPath = 'campaign.articles'
  const { edges, pageInfo } = data?.campaign?.articles || {}
  const isNewLoading =
    [NetworkStatus.loading, NetworkStatus.setVariables].indexOf(
      networkStatus
    ) >= 0

  // private data
  const loadPrivate = (publicData?: CampaignArticlesPublicQuery) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges = publicData.campaign?.articles.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: CAMPAIGN_ARTICLES_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  const fetchedPrviateTypeRef = useRef<CampaignFeedType[]>([])
  useEffect(() => {
    const fetched = fetchedPrviateTypeRef.current.indexOf(feedType) >= 0
    if (loading || !edges || fetched || !viewer.isAuthed) {
      return
    }

    loadPrivate(data)
    fetchedPrviateTypeRef.current = [...fetchedPrviateTypeRef.current, feedType]
  }, [!!edges, loading, feedType, viewer.id])

  // load next page
  const loadMore = async () => {
    if (loading || isNewLoading) {
      return
    }

    analytics.trackEvent('load_more', {
      type: `campaign_detail_${feedType}` as `campaign_detail_${string}`,
      location: edges?.length || 0,
    })

    const { data: newData } = await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

    loadPrivate(newData)
  }

  if (isAnnouncement) {
    return (
      <List>
        {[...announcements].reverse().map((article, i) => (
          <List.Item key={`${feedType}:${i}`}>
            <ArticleDigestFeed
              article={article}
              onClick={() => {
                analytics.trackEvent('click_feed', {
                  type: `campaign_detail_${feedType}` as `campaign_detail_${string}`,
                  contentType: 'article',
                  location: i,
                  id: article.id,
                })
              }}
              onClickAuthor={() => {
                analytics.trackEvent('click_feed', {
                  type: `campaign_detail_${feedType}` as `campaign_detail_${string}`,
                  contentType: 'user',
                  location: i,
                  id: article.author.id,
                })
              }}
            />
          </List.Item>
        ))}
      </List>
    )
  }

  if (loading && (!edges || isNewLoading)) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <Empty
        icon={<Icon icon={IconRead} size={88} />}
        description={
          <FormattedMessage
            defaultMessage="No one has published yet, check back later!"
            id="TZgskS"
          />
        }
      />
    )
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore} eof>
      <List>
        {edges.map(({ node }, i) => (
          <List.Item key={`${feedType}:${i}`}>
            <ArticleDigestFeed
              article={node}
              label={
                isAll && (
                  <span
                    className={[
                      styles.articleLabel,
                      getArticleStage(node)?.id ? '' : styles.announcement,
                    ].join(' ')}
                  >
                    {getArticleStageName(node, lang)}
                  </span>
                )
              }
              onClick={() => {
                analytics.trackEvent('click_feed', {
                  type: `campaign_detail_${feedType}` as `campaign_detail_${string}`,
                  contentType: 'article',
                  location: i,
                  id: node.id,
                })
              }}
              onClickAuthor={() => {
                analytics.trackEvent('click_feed', {
                  type: `campaign_detail_${feedType}` as `campaign_detail_${string}`,
                  contentType: 'user',
                  location: i,
                  id: node.author.id,
                })
              }}
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default MainFeed
