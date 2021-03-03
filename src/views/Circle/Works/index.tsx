import { useContext, useEffect, useState } from 'react'

import {
  ArticleDigestFeed,
  EmptyArticle,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  SubscribeCircleDialog,
  Throw404,
  useEventListener,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'

import { REFETCH_CIRCLE_DETAIL_ARTICLES } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import CircleDetailContainer from '../Detail'
import SubscriptionBanner from '../SubscriptionBanner'
import { CIRCLE_WORKS_PRIVATE, CIRCLE_WORKS_PUBLIC } from './gql'

import { CircleWorksPublic } from './__generated__/CircleWorksPublic'

const Works = () => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const name = getQuery('name')

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
    client,
  } = usePublicQuery<CircleWorksPublic>(CIRCLE_WORKS_PUBLIC, {
    variables: { name },
  })

  // pagination
  const connectionPath = 'node.articles'
  const circle = data?.circle
  const { edges, pageInfo } = circle?.articles || {}

  // private data
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async (publicData?: CircleWorksPublic) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges = publicData.circle?.articles.edges || []

    const publicIds = publiceEdges.map(({ node }) => node.id)

    await client.query({
      query: CIRCLE_WORKS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { name, ids: publicIds },
    })

    setPrivateFetched(true)
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
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!circle || !pageInfo) {
    return <Throw404 />
  }

  return (
    <section className="works">
      {!edges || (edges.length <= 0 && <EmptyArticle />)}

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

      <SubscribeCircleDialog circle={circle} />
      {!privateFetched && <SubscriptionBanner circle={circle} />}
    </section>
  )
}

const CircleDetailWorks = () => {
  return (
    <CircleDetailContainer>
      <Works />
    </CircleDetailContainer>
  )
}

export default CircleDetailWorks
