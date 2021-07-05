import { useContext, useEffect } from 'react'

import {
  ArticleDigestFeed,
  EmptyArticle,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Throw404,
  useEventListener,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'

import { REFETCH_CIRCLE_DETAIL_ARTICLES } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import CircleDetailTabs from '../CircleDetailTabs'
import { CIRCLE_WORKS_PRIVATE, CIRCLE_WORKS_PUBLIC } from './gql'

import { CircleWorksPublic } from './__generated__/CircleWorksPublic'

const CircleDetailWorks = () => {
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
  const connectionPath = 'circle.articles'
  const circle = data?.circle
  const { edges, pageInfo } = circle?.articles || {}

  // private data
  const loadPrivate = (publicData?: CircleWorksPublic) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges = publicData.circle?.articles.edges || []

    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: CIRCLE_WORKS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { name, ids: publicIds },
    })
  }

  // fetch private data
  useEffect(() => {
    if (!circle?.id) {
      return
    }

    loadPrivate(data)
  }, [circle?.id, viewer.id])

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'circle_detail',
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
    return (
      <>
        <CircleDetailTabs />
        <Spinner />
      </>
    )
  }

  if (error) {
    return (
      <>
        <CircleDetailTabs />
        <QueryError error={error} />
      </>
    )
  }

  if (!circle || !pageInfo) {
    return (
      <>
        <CircleDetailTabs />
        <Throw404 />
      </>
    )
  }

  if (!edges || edges.length <= 0) {
    return (
      <>
        <CircleDetailTabs />
        <EmptyArticle />
      </>
    )
  }

  return (
    <>
      <CircleDetailTabs />

      <section className="works">
        <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
          <List>
            {(edges || []).map(({ node, cursor }, i) => (
              <List.Item key={cursor}>
                <ArticleDigestFeed
                  article={node}
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
      </section>
    </>
  )
}

export default CircleDetailWorks
