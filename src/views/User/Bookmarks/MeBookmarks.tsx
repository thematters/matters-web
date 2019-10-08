import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useQuery } from 'react-apollo'

import { ArticleDigest, InfiniteScroll, Placeholder } from '~/components'
import EmptyBookmark from '~/components/Empty/EmptyBookmark'

import { mergeConnections } from '~/common/utils'

import { MeBookmarkFeed } from './__generated__/MeBookmarkFeed'

const ME_BOOKMARK_FEED = gql`
  query MeBookmarkFeed(
    $after: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    viewer {
      id
      subscriptions(input: { first: 10, after: $after }) {
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
  const { data, loading, fetchMore } = useQuery<MeBookmarkFeed>(
    ME_BOOKMARK_FEED
  )

  if (loading) {
    return <Placeholder.ArticleDigestList />
  }

  const connectionPath = 'viewer.subscriptions'
  const { edges, pageInfo } = _get(data, connectionPath, {})
  const loadMore = () =>
    fetchMore({
      variables: {
        after: pageInfo.endCursor
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
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <ul>
        {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
          <li key={cursor}>
            <ArticleDigest.Feed article={node} hasBookmark hasDateTime />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}
