import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect } from 'react'

import {
  DraftDigest,
  EmptyDraft,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  Spinner,
  useCache,
} from '~/components'

import { mergeConnections } from '~/common/utils'

import { DraftsContext } from './context'

import {
  MeDraftFeed,
  MeDraftFeed_viewer_drafts_edges,
} from './__generated__/MeDraftFeed'

const ME_DRAFTS_FEED = gql`
  query MeDraftFeed($after: String) {
    viewer {
      id
      drafts(input: { first: 20, after: $after })
        @connection(key: "viewerDrafts") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...DraftDigestFeedDraft
          }
        }
      }
    }
  }
  ${DraftDigest.Feed.fragments.draft}
`

export const BaseMeDrafts = () => {
  const [edges, setEdges, DraftsContextProvider] = useCache<
    MeDraftFeed_viewer_drafts_edges[]
  >([], DraftsContext)

  const { data, loading, error, fetchMore, refetch } =
    useQuery<MeDraftFeed>(ME_DRAFTS_FEED)

  useEffect(() => {
    setEdges(data?.viewer?.drafts.edges ?? [])
  }, [data])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.drafts'
  const { pageInfo } = data?.viewer?.drafts || {}

  if (edges.length <= 0 || !pageInfo) {
    return <EmptyDraft />
  }

  const loadMore = () =>
    fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  return (
    <DraftsContextProvider>
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        pullToRefresh={refetch}
      >
        <List>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <DraftDigest.Feed draft={node} />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </DraftsContextProvider>
  )
}

const MeDrafts = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="myDrafts" />}
    />

    <Head title={{ id: 'myDrafts' }} />

    <BaseMeDrafts />
  </Layout.Main>
)

export default MeDrafts
