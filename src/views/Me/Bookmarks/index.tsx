import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dynamic from 'next/dynamic'

import { mergeConnections } from '~/common/utils'
import {
  ArticleDigestFeed,
  EmptyBookmark,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  Spinner,
} from '~/components'
import { MeBookmarkFeedQuery } from '~/gql/graphql'

const DynamicArticleDigestFeed = dynamic(
  () => import('~/components/ArticleDigest/Feed'),
  { ssr: false, loading: ArticleDigestFeed.Placeholder }
)

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
            ...ArticleDigestFeedArticlePublic
            ...ArticleDigestFeedArticlePrivate
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

const BaseMeBookmarks = () => {
  const { data, loading, error, fetchMore } =
    useQuery<MeBookmarkFeedQuery>(ME_BOOKMARK_FEED)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.subscriptions'
  const { edges, pageInfo } = data?.viewer?.subscriptions || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyBookmark />
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
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore} eof>
      <List>
        {edges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <DynamicArticleDigestFeed article={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeBookmarks = () => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.Title id="myBookmarks" />} />

    <Head title={{ id: 'myBookmarks' }} />

    <Layout.Main.Spacing hasVertical={false}>
      <BaseMeBookmarks />
    </Layout.Main.Spacing>
  </Layout.Main>
)

export default MeBookmarks
