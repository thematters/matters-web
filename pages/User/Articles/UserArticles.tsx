import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Error,
  Head,
  InfiniteScroll,
  Placeholder,
  Spinner
} from '~/components'

import { getQuery, mergeConnections } from '~/common/utils'

import { UserArticleFeed } from './__generated__/UserArticleFeed'

const USER_ARTICLES_FEED = gql`
  query UserArticleFeed(
    $userName: String!
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = true
    $hasArticleDigestActionDateTime: Boolean = true
  ) {
    user(input: { userName: $userName }) {
      id
      displayName
      articles(input: { first: 10, after: $cursor }) {
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

const UserArticles: React.FC<WithRouterProps> = ({ router }) => {
  const userName = getQuery({ router, key: 'userName' })

  return (
    <Query query={USER_ARTICLES_FEED} variables={{ userName }}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: UserArticleFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'user.articles'
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
            <Head title={data.user.displayName} />

            <InfiniteScroll
              hasNextPage={pageInfo.hasNextPage}
              loadMore={loadMore}
              loading={loading}
              loader={<Spinner />}
            >
              <ul>
                {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                  <li key={cursor}>
                    <ArticleDigest.Feed article={node} />
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

export default withRouter(UserArticles)
