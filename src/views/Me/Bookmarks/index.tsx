import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FormattedMessage, useIntl } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  ArticleDigestFeed,
  EmptyBookmark,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  SpinnerBlock,
} from '~/components'
import { MeBookmarkFeedQuery } from '~/gql/graphql'

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
    return <SpinnerBlock />
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
          <List.Item key={node.id}>
            <ArticleDigestFeed article={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeBookmarks = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Bookmarks" id="nGBrvw" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Bookmarks',
          id: 'nGBrvw',
        })}
      />

      <Layout.Main.Spacing hasVertical={false}>
        <BaseMeBookmarks />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default MeBookmarks
