import { useContext, useEffect } from 'react'

import { REFETCH_CIRCLE_DETAIL_ARTICLES } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestFeed,
  EmptyArticle,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  SpinnerBlock,
  Throw404,
  useEventListener,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { CircleWorksPublicQuery } from '~/gql/graphql'

import CircleDetailTabs from '../CircleDetailTabs'
import { CIRCLE_WORKS_PRIVATE, CIRCLE_WORKS_PUBLIC } from './gql'

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
  } = usePublicQuery<CircleWorksPublicQuery>(CIRCLE_WORKS_PUBLIC, {
    variables: { name },
  })

  // pagination
  const connectionPath = 'circle.articles'
  const circle = data?.circle
  const { edges, pageInfo } = circle?.articles || {}

  // private data
  const loadPrivate = (publicData?: CircleWorksPublicQuery) => {
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

  /**
   * Render
   */
  if (loading) {
    return (
      <>
        <CircleDetailTabs />
        <SpinnerBlock />
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

      <Layout.Main.Spacing hasVertical={false}>
        <InfiniteScroll
          hasNextPage={pageInfo.hasNextPage}
          loadMore={loadMore}
          eof
        >
          <List>
            {(edges || []).map(({ node }, i) => (
              <List.Item key={node.id}>
                <ArticleDigestFeed
                  article={node}
                  hasCircle={false}
                  hasAuthor={false}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'circle_detail',
                      contentType: 'article',
                      location: i,
                      id: node.id,
                    })
                  }
                />
              </List.Item>
            ))}
          </List>
        </InfiniteScroll>
      </Layout.Main.Spacing>
    </>
  )
}

export default CircleDetailWorks
