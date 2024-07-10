import { NetworkStatus } from 'apollo-client'
import React, { useContext, useEffect, useRef } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestFeed,
  EmptyArticle,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { CampaignArticlesPublicQuery } from '~/gql/graphql'

import { CampaignFeedType, LATEST_FEED_TYPE } from '../Tabs'
import { CAMPAIGN_ARTICLES_PRIVATE, CAMPAIGN_ARTICLES_PUBLIC } from './gql'

interface MainFeedProps {
  feedType: CampaignFeedType
}

const MainFeed = ({ feedType }: MainFeedProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')

  const { data, loading, error, fetchMore, networkStatus, client } =
    usePublicQuery<CampaignArticlesPublicQuery>(CAMPAIGN_ARTICLES_PUBLIC, {
      variables: {
        shortHash,
        ...(feedType !== LATEST_FEED_TYPE
          ? { filter: { stage: feedType } }
          : {}),
      },
      notifyOnNetworkStatusChange: true,
    })

  // pagination
  const connectionPath = 'campaign.articles'
  const { edges, pageInfo } = data?.campaign?.articles || {}
  const isNewLoading = networkStatus === NetworkStatus.loading

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
      type: 'campaign_detail',
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

  if (loading && (!edges || isNewLoading)) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore} eof>
      <List>
        {edges.map(({ node }, i) => (
          <React.Fragment key={`${feedType}:${i}`}>
            <List.Item>
              <ArticleDigestFeed
                article={node}
                onClick={() => {
                  analytics.trackEvent('click_feed', {
                    type: 'campaign_detail',
                    contentType: 'article',
                    location: i,
                    id: node.id,
                  })
                }}
                onClickAuthor={() => {
                  analytics.trackEvent('click_feed', {
                    type: 'campaign_detail',
                    contentType: 'user',
                    location: i,
                    id: node.author.id,
                  })
                }}
              />
            </List.Item>
          </React.Fragment>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default MainFeed
