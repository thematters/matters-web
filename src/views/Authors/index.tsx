import { useQuery } from '@apollo/client'
import { useContext, useEffect } from 'react'

import {
  EmptyWarning,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
  Translate,
  UserDigest,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, mergeConnections } from '~/common/utils'

import { ALL_AUTHORS_PRIVATE, ALL_AUTHORS_PUBLIC } from './gql'

import { AllAuthorsPublic } from './__generated__/AllAuthorsPublic'

const Authors = () => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, refetch, client } = useQuery<
    AllAuthorsPublic
  >(ALL_AUTHORS_PUBLIC)

  // pagination
  const connectionPath = 'viewer.recommendation.authors'
  const { edges, pageInfo } = data?.viewer?.recommendation.authors || {}

  // private data
  const loadPrivate = (publicData?: AllAuthorsPublic) => {
    if (!viewer.id || !publicData) {
      return
    }

    const publiceEdges = publicData?.viewer?.recommendation.authors.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: ALL_AUTHORS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate(data)
  }, [!!edges, viewer.id])

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'all_authors',
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
          dedupe: true,
        }),
    })

    loadPrivate(newData)
  }

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={<Translate zh_hant="還沒有作者" zh_hans="还没有作者" />}
      />
    )
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List hasBorder={false}>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <UserDigest.Rich
              user={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'all_authors',
                  styleType: 'card',
                  contentType: 'user',
                  location: i,
                })
              }
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="allAuthors" />}
    />

    <Head title={{ id: 'allAuthors' }} />

    <Authors />
  </Layout.Main>
)
