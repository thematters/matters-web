import { NetworkStatus } from '@apollo/client'
import React, { useContext, useEffect, useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconRead } from '@/public/static/icons/24px/read.svg'
import { ReactComponent as IconStar } from '@/public/static/icons/24px/star.svg'
import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestFeed,
  ArticleFeedPlaceholder,
  Empty,
  Icon,
  InfiniteScroll,
  LanguageContext,
  List,
  QueryError,
  TextIcon,
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
  FEED_TYPE_FEATURED,
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

const getLabel = (
  article: CampaignArticlesPublicQueryArticle,
  lang: string,
  announcement: boolean
) => {
  const stage = getArticleStage(article)

  if (announcement) {
    return <FormattedMessage defaultMessage="Announcement" id="Sj+TN8" />
  }

  if (!stage) {
    return ''
  }

  return stage[
    `name${lang === 'en' ? 'En' : lang === 'zh-Hans' ? 'ZhHans' : 'ZhHant'}`
  ]
}

const FeaturedLabel = () => (
  <TextIcon
    icon={<Icon icon={IconStar} size={12} style={{ opacity: 0.5 }} />}
    spacing={2}
    color="freeWriteGreenLabel"
    size={12}
  >
    <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
  </TextIcon>
)

const MainFeed = ({ feedType, camapign }: MainFeedProps) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')
  const isAll = feedType === FEED_TYPE_ALL
  const isAnnouncement = feedType === FEED_TYPE_ANNOUNCEMENT
  const isFeatured = feedType === FEED_TYPE_FEATURED
  const announcements = camapign.announcements

  const { data, loading, error, fetchMore, networkStatus, client } =
    usePublicQuery<CampaignArticlesPublicQuery>(CAMPAIGN_ARTICLES_PUBLIC, {
      variables: {
        shortHash,
        ...(!isAll
          ? {
              filter: isFeatured ? { featured: true } : { stage: feedType },
            }
          : {}),
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
              hasCampaign={false}
              hasToggleCampaignFeatured
              campaignId={camapign.id}
              campaignFeatured={false}
            />
          </List.Item>
        ))}
      </List>
    )
  }

  if (loading && (!edges || isNewLoading)) {
    return <ArticleFeedPlaceholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <Empty
        icon={<Icon icon={IconRead} size={88} />}
        description={intl.formatMessage({
          defaultMessage: 'No one has published yet, check back later!',
          id: 'TZgskS',
        })}
      />
    )
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      loader={<ArticleFeedPlaceholder count={3} />}
      eof
    >
      <List>
        {edges.map(({ node, featured, announcement }, i) => (
          <List.Item key={`${feedType}:${i}`}>
            <ArticleDigestFeed
              article={node}
              label={
                <>
                  {(isAll || isFeatured) &&
                    getLabel(node, lang, announcement) && (
                      <span
                        className={[
                          styles.articleLabel,
                          announcement ? styles.announcement : '',
                        ].join(' ')}
                      >
                        {getLabel(node, lang, announcement)}
                      </span>
                    )}
                  {!isFeatured && featured && <FeaturedLabel />}
                </>
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
              hasCircle={false}
              hasCampaign={false}
              hasToggleCampaignFeatured
              campaignId={camapign.id}
              campaignFeatured={isFeatured}
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default MainFeed
