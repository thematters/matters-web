import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Error,
  Head,
  InfiniteScroll,
  Placeholder
} from '~/components'
import EmptyArticle from '~/components/Empty/EmptyArticle'

import { getQuery, mergeConnections } from '~/common/utils'

import { UserArticleFeed } from './__generated__/UserArticleFeed'

const USER_ARTICLES_FEED = gql`
  query UserArticleFeed(
    $userName: String!
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
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
        const { edges, pageInfo } = _get(data, connectionPath, {})
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

        if (!edges || edges.length <= 0) {
          return <EmptyArticle />
        }

        return (
          <>
            <Head
              title={{
                zh_hant: `${data.user.displayName}發表的文章`,
                zh_hans: `${data.user.displayName}发表的文章`
              }}
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
                      hasBookmark
                      hasDateTime
                      hasState
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

export default withRouter(UserArticles)
