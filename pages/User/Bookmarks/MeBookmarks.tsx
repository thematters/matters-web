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
import EmptyBookmark from '~/components/Empty/EmptyBookmark'

import { mergeConnections } from '~/common/utils'

import { MeBookmarkFeed } from './__generated__/MeBookmarkFeed'

const ME_BOOKMARK_FEED = gql`
  query MeBookmarkFeed(
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    viewer {
      id
      subscriptions(input: { first: 10, after: $cursor }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...FeedDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

export default () => {
  return (
    <Query query={ME_BOOKMARK_FEED}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: MeBookmarkFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'viewer.subscriptions'
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

        if (edges <= 0) {
          return <EmptyBookmark />
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
                  <ArticleDigest.Feed article={node} hasBookmark hasDateTime />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        )
      }}
    </Query>
  )
}
