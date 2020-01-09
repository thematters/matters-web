import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ArticleDigest, InfiniteScroll, Placeholder } from '~/components'
import EmptyBookmark from '~/components/Empty/EmptyBookmark'
import { QueryError } from '~/components/GQL'

import { mergeConnections } from '~/common/utils'

import { MeBookmarkFeed } from './__generated__/MeBookmarkFeed'

const ME_BOOKMARK_FEED = gql`
  query MeBookmarkFeed($after: String) {
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

const MeBookmarks = () => {
  const { data, loading, error, fetchMore } = useQuery<MeBookmarkFeed>(
    ME_BOOKMARK_FEED
  )

  if (loading) {
    return <Placeholder.ArticleDigestList />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.subscriptions'
  const { edges, pageInfo } = data?.viewer?.subscriptions || {}

  if (!edges || edges.length <= 0 || !pageInfo || edges.length <= 0) {
    return <EmptyBookmark />
  }

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

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <ul>
        {edges.map(({ node, cursor }) => (
          <li key={cursor}>
            <ArticleDigest.Feed article={node} hasBookmark hasDateTime />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}

export default MeBookmarks
