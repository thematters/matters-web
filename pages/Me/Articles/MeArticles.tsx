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

import { mergeConnections } from '~/common/utils'

import { MeArticleFeed } from './__generated__/MeArticleFeed'
import EmptyArticles from './EmptyArticles'

const ME_ARTICLES_FEED = gql`
  query MeArticleFeed(
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = true
    $hasArticleDigestActionDateTime: Boolean = true
  ) {
    viewer {
      id
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

export default () => {
  return (
    <Query query={ME_ARTICLES_FEED}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: MeArticleFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'viewer.articles'
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

        if (edges.length <= 0) {
          return <EmptyArticles />
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
                  <ArticleDigest.Feed article={node} />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        )
      }}
    </Query>
  )
}
