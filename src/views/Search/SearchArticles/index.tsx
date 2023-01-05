import { NetworkStatus } from 'apollo-client'
import { Fragment, useContext, useEffect } from 'react'

import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestFeed,
  EmptySearch,
  InfiniteScroll,
  List,
  Spinner,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { SearchArticlesPublicQuery } from '~/gql/graphql'

import GoogleSearchButton from '../GoogleSearchButton'
import { SEARCH_ARTICLES_PRIVATE, SEARCH_ARTICLES_PUBLIC } from './gql'

const SearchArticles = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const q = getQuery('q')

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
  } = usePublicQuery<SearchArticlesPublicQuery>(SEARCH_ARTICLES_PUBLIC, {
    variables: { key: q, first: 10 },
    notifyOnNetworkStatusChange: true,
  })
  const isNewLoading = networkStatus === NetworkStatus.setVariables

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  // private data
  const loadPrivate = (publicData?: SearchArticlesPublicQuery) => {
    if (!viewer.isAuthed || !publicData) {
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
    return <EmptySearch />
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
              <Fragment key={cursor}>
                <List.Item>
                  <ArticleDigestFeed
                    article={node}
                    onClick={() =>
                      analytics.trackEvent('click_feed', {
                        type: 'search_article',
                        contentType: 'article',
                        location: i,
                        id: node.id,
                      })
                    }
                    onClickAuthor={() => {
                      analytics.trackEvent('click_feed', {
                        type: 'search_tag',
                        contentType: 'user',
                        location: i,
                        id: node.author.id,
                      })
                    }}
                  />
                </List.Item>

                {((edges.length > 2 && i === 2) ||
                  (edges.length <= 2 && i === edges.length - 1)) && (
                  <List.Item>
                    <GoogleSearchButton />
                  </List.Item>
                )}
              </Fragment>
            )
        )}
      </List>
    </InfiniteScroll>
  )
}

export default SearchArticles
