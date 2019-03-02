import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Error,
  Head,
  InfiniteScroll,
  PageHeader,
  Placeholder,
  Translate
} from '~/components'

import { mergeConnections } from '~/common/utils'

import { FollowFeed } from './__generated__/FollowFeed'

const FOLLOW_FEED = gql`
  query FollowFeed(
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    viewer {
      id
      recommendation {
        followeeArticles(input: { first: 10, after: $cursor }) {
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
  }
  ${ArticleDigest.Feed.fragments.article}
`

export default () => {
  return (
    <Query query={FOLLOW_FEED}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: FollowFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'viewer.recommendation.followeeArticles'
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

        return (
          <>
            <Head title={{ zh_hant: '追蹤', zh_hans: '追踪' }} />

            <PageHeader
              pageTitle={<Translate zh_hant="追蹤" zh_hans="追踪" />}
            />

            <InfiniteScroll
              hasNextPage={pageInfo.hasNextPage}
              loadMore={loadMore}
            >
              <ul>
                {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                  <li key={cursor}>
                    <ArticleDigest.Feed
                      article={node}
                      hasDateTime
                      hasBookmark
                    />
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          </>
        )
      }}
    </Query>
  )
}
