import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Error,
  InfiniteScroll,
  Placeholder,
  Spinner
} from '~/components'

import { mergeConnections } from '~/common/utils'

import { MeHistoryFeed } from './__generated__/MeHistoryFeed'
import EmptyHistory from './EmptyHistory'

const ME_HISTORY_FEED = gql`
  query MeHistoryFeed(
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = true
    $hasArticleDigestActionDateTime: Boolean = true
  ) {
    viewer {
      id
      activity {
        history(input: { first: 10, after: $cursor }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              article {
                ...FeedDigestArticle
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

export default () => {
  return (
    <Query query={ME_HISTORY_FEED}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: MeHistoryFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'viewer.activity.history'
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

        if (edges.length <= 0) {
          return <EmptyHistory />
        }

        return (
          <InfiniteScroll
            hasNextPage={pageInfo.hasNextPage}
            loadMore={loadMore}
            loading={loading}
            loader={<Spinner />}
          >
            <ul>
              {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                <li key={cursor}>
                  <ArticleDigest.Feed article={node.article} />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        )
      }}
    </Query>
  )
}
