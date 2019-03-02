import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { DraftDigest, Error, InfiniteScroll, Placeholder } from '~/components'
import EmptyDraft from '~/components/Empty/EmptyDraft'

import { mergeConnections } from '~/common/utils'

import { MeDraftFeed } from './__generated__/MeDraftFeed'

const ME_DRAFTS_FEED = gql`
  query MeDraftFeed($cursor: String) {
    viewer {
      id
      drafts(input: { first: 10, after: $cursor })
        @connection(key: "viewerDrafts") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...FeedDigestDraft
          }
        }
      }
    }
  }
  ${DraftDigest.Feed.fragments.draft}
`

export default () => {
  return (
    <Query query={ME_DRAFTS_FEED}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: MeDraftFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'viewer.drafts'
        const { edges, pageInfo } = _get(data, connectionPath)
        const loadMore = () =>
          fetchMore({
            variables: {
              cursor: pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) =>
              mergeConnections({
                oldData: previousResult,
                newData: fetchMoreResult,
                path: connectionPath
              })
          })

        if (!edges || edges.length <= 0) {
          return <EmptyDraft />
        }

        return (
          <InfiniteScroll
            hasNextPage={pageInfo.hasNextPage}
            loadMore={loadMore}
          >
            <ul>
              {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                <li key={cursor}>
                  <DraftDigest.Feed draft={node} />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        )
      }}
    </Query>
  )
}
