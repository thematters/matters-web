import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

import {
  DraftDigest,
  EmptyDraft,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  Spinner,
} from '~/components'

import { mergeConnections } from '~/common/utils'

import { DraftContext } from './context'

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
  const [edges, setEdges] = useState<MeDraftFeed_viewer_drafts_edges[]>([])

  const { data, loading, error, fetchMore, refetch } = useQuery<MeDraftFeed>(
    ME_DRAFTS_FEED,
    {
      fetchPolicy: 'no-cache',
      onCompleted: () => setEdges(data?.viewer?.drafts.edges ?? []),
    }
  )

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
    <DraftContext.Provider value={{ edges, setEdges }}>
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
    </DraftContext.Provider>
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
