import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import {
  ArticleDigestFeed,
  InfiniteScroll,
  List,
  Spinner,
  Translate,
  ViewerContext,
} from '~/components'

import { analytics, getQuery, mergeConnections } from '~/common/utils'

import EmptySearch from '../EmptySearch'
import { SEARCH_ARTICLES_PRIVATE, SEARCH_ARTICLES_PUBLIC } from './gql'

import { SeachArticlesPublic } from './__generated__/SeachArticlesPublic'

const SearchArticles = () => {
  const viewer = useContext(ViewerContext)
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    fetchMore,
    networkStatus,
    refetch: refetchPublic,
    client,
  } = useQuery<SeachArticlesPublic>(SEARCH_ARTICLES_PUBLIC, {
    variables: { key: q, first: 10 },
    notifyOnNetworkStatusChange: true,
  })
  const isNewLoading = networkStatus === NetworkStatus.setVariables

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  // private data
  const loadPrivate = (publicData?: SeachArticlesPublic) => {
    if (!viewer.id || !publicData) {
      return
    }

    const publicIds = (publicData?.search.edges || [])
      .filter(({ node }) => node.__typename === 'Article')
      .map(({ node }) => node.__typename === 'Article' && node.id)

    client.query({
      query: SEARCH_ARTICLES_PRIVATE,
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
  }, [!!edges, viewer.id])

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'search_article',
      location: edges?.length || 0,
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

  // refetch & pull to refresh
  const refetch = async () => {
    const { data: newData } = await refetchPublic()
    loadPrivate(newData)
  }

  /**
   * Render
   */
  if (loading && (!data?.search || isNewLoading)) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptySearch description={<Translate id="emptySearchResults" />} />
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'Article' && (
              <List.Item key={cursor}>
                <ArticleDigestFeed
                  article={node}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search_article',
                      contentType: 'article',
                      styleType: 'title',
                      location: i,
                    })
                  }
                />
              </List.Item>
            )
        )}
      </List>
    </InfiniteScroll>
  )
}

export default SearchArticles
