import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import { useContext, useEffect } from 'react'

import {
  ArticleDigestFeed,
  EmptyTagArticles,
  InfiniteScroll,
  List,
  Spinner,
  useEventListener,
  usePullToRefresh,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'
import {
  TAG_ARTICLES_PRIVATE,
  TAG_ARTICLES_PUBLIC,
} from '~/components/GQL/queries/tagArticles'

import { REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { TagArticlesPublic } from '~/components/GQL/queries/__generated__/TagArticlesPublic'

interface TagArticlesProps {
  tagId: string
  selected?: boolean
}

const TagDetailArticles = ({ tagId, selected }: TagArticlesProps) => {
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
  } = useQuery<TagArticlesPublic>(TAG_ARTICLES_PUBLIC, {
    variables: { id: tagId, selected },
    notifyOnNetworkStatusChange: true,
  })

  // pagination
  const connectionPath = 'node.articles'
  const { edges, pageInfo } =
    (data?.node?.__typename === 'Tag' &&
      data.node.articles &&
      data.node.articles) ||
    {}
  const isNewLoading = networkStatus === NetworkStatus.loading

  // private data
  const loadPrivate = (publicData?: TagArticlesPublic) => {
    if (!viewer.id || !publicData) {
      return
    }

    const publiceEdges =
      publicData?.node?.__typename === 'Tag'
        ? publicData.node.articles.edges || []
        : []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: TAG_ARTICLES_PRIVATE,
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
  }, [!!edges, loading, selected, viewer.id])

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: selected ? 'tag_detail_selected' : 'tag_detail_latest',
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

  const sync = async ({
    event,
    differences = 0,
  }: {
    event: 'add' | 'delete'
    differences?: number
  }) => {
    const count = (edges || []).length
    switch (event) {
      case 'add':
        const { data: addData } = await refetchPublic({
          variables: {
            id: tagId,
            first: count + differences,
          },
        })
        loadPrivate(addData)
        break
      case 'delete':
        const { data: deleteData } = await refetchPublic({
          variables: {
            id: tagId,
            first: Math.max(count - 1, 0),
          },
        })
        loadPrivate(deleteData)
        break
    }
  }

  useEventListener(REFETCH_TAG_DETAIL_ARTICLES, sync)
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading && isNewLoading) {
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
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: selected ? 'tag_detail_selected' : 'tag_detail_latest',
                  contentType: 'article',
                  styleType: 'title',
                  location: i,
                })
              }
              inTagDetailLatest
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default TagDetailArticles
