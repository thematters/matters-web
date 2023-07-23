import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect } from 'react'

import { mergeConnections } from '~/common/utils'
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
import { MeDraftFeedQuery } from '~/gql/graphql'

import { DraftsContext } from './context'

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

type Edge = NonNullable<
  NonNullable<MeDraftFeedQuery['viewer']>['drafts']['edges']
>

export const BaseMeDrafts = () => {
  const [edges, setEdges, DraftsContextProvider] = useCache<Edge>(
    [],
    DraftsContext
  )

  const { data, loading, error, fetchMore } =
    useQuery<MeDraftFeedQuery>(ME_DRAFTS_FEED)

  useEffect(() => {
    setEdges(data?.viewer?.drafts.edges ?? [])
  }, [data?.viewer?.drafts.edges?.length])

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
        eof
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
    <Layout.Header left={<Layout.Header.Title id="myDrafts" />} />

    <Head title={{ id: 'myDrafts' }} />

    <Layout.Main.Spacing>
      <BaseMeDrafts />
    </Layout.Main.Spacing>
  </Layout.Main>
)

export default MeDrafts
