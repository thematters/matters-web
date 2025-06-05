import { useQuery } from '@apollo/client'
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
import { MeBookmarkArticlesFeedQuery } from '~/gql/graphql'

import BookmarksTabs from './BookmarksTabs'

const ME_BOOKMARK_ARTICLES_FEED = gql`
  query MeBookmarkArticlesFeed($after: String) {
    viewer {
      id
      bookmarkedArticles(input: { first: 10, after: $after }) {
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

const BaseMeBookmarksArticles = () => {
  const { data, loading, error, fetchMore } =
    useQuery<MeBookmarkArticlesFeedQuery>(ME_BOOKMARK_ARTICLES_FEED)

  if (loading) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.bookmarkedArticles'
  const { edges, pageInfo } = data?.viewer?.bookmarkedArticles || {}

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
        {edges.map(({ node }) => (
          <List.Item key={node.id}>
            <ArticleDigestFeed article={node} disabledArchived />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeBookmarksArticles = () => {
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

      <BookmarksTabs />

      <Layout.Main.Spacing hasVertical={false}>
        <BaseMeBookmarksArticles />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default MeBookmarksArticles
