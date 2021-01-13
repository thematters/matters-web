import { NetworkStatus } from 'apollo-client'
import { useContext, useEffect } from 'react'

import {
  ArticleDigestFeed,
  EmptyTagArticles,
  InfiniteScroll,
  List,
  Spinner,
  useEventListener,
  usePublicQuery,
  usePullToRefresh,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { REFETCH_CIRCLE_DETAIL_ARTICLES } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { CIRCLE_WORKS_PRIVATE, CIRCLE_WORKS_PUBLIC } from './gql'

import { CircleWorksPublic } from './__generated__/CircleWorksPublic'

interface CircleWorksProps {
  name: string
}

const CircleDetailWorks = ({ name }: CircleWorksProps) => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch: refetchPublic,
    networkStatus,
    client,
  } = usePublicQuery<CircleWorksPublic>(CIRCLE_WORKS_PUBLIC, {
    variables: { name },
    notifyOnNetworkStatusChange: true,
  })

  // pagination
  const connectionPath = 'node.articles'
  const { edges, pageInfo } = data?.circle?.works || {}
  const isNewLoading =
    [NetworkStatus.loading, NetworkStatus.setVariables].indexOf(
      networkStatus
    ) >= 0

  // private data
  const loadPrivate = (publicData?: CircleWorksPublic) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges = publicData.circle?.works.edges || []

    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: CIRCLE_WORKS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    if (loading || !edges) {
      return
    }

    loadPrivate(data)
  }, [!!edges, loading, viewer.id])

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'circle_detail',
      location: edges ? edges.length : 0,
    })

    const { data: newData } = await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

    loadPrivate(newData)
  }

  // refetch, sync & pull to refresh
  const refetch = async () => {
    const { data: newData } = await refetchPublic()
    loadPrivate(newData)
  }

  useEventListener(REFETCH_CIRCLE_DETAIL_ARTICLES, refetch)
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading && (!edges || isNewLoading)) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTagArticles />
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List>
        {(edges || []).map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <ArticleDigestFeed
              article={node}
              hasCircle={false}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'circle_detail',
                  contentType: 'article',
                  styleType: 'title',
                  location: i,
                })
              }
              onClickAuthor={() => {
                analytics.trackEvent('click_feed', {
                  type: 'circle_detail',
                  contentType: 'user',
                  styleType: 'subtitle',
                  location: i,
                })
              }}
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default CircleDetailWorks
