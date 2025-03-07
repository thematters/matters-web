import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Fragment } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  EmptyTagBookmark,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  SpinnerBlock,
  TagDigest,
} from '~/components'
import { MeBookmarkTagsFeedQuery } from '~/gql/graphql'

import BookmarksTabs from './BookmarksTabs'

export const ME_BOOKMARK_TAGS_FEED = gql`
  query MeBookmarkTagsFeed($after: String) {
    viewer {
      id
      bookmarkedTags(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...TagDigestBookmarkTag
          }
        }
      }
    }
  }
  ${TagDigest.Bookmark.fragments.tag}
`

const BaseMeBookmarksTags = () => {
  const { data, loading, error, fetchMore } = useQuery<MeBookmarkTagsFeedQuery>(
    ME_BOOKMARK_TAGS_FEED
  )

  if (loading) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.bookmarkedTags'
  const { edges, pageInfo } = data?.viewer?.bookmarkedTags || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTagBookmark />
  }

  const hasFollowedTags = edges.some(
    ({ node }) => node.__typename === 'Tag' && node.isFollower
  )

  if (!hasFollowedTags) {
    return <EmptyTagBookmark />
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
          <Fragment key={node.id}>
            {node.isFollower && (
              <List.Item key={node.id}>
                <TagDigest.Bookmark tag={node} />
              </List.Item>
            )}
          </Fragment>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeBookmarksTags = () => {
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
        <BaseMeBookmarksTags />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default MeBookmarksTags
