import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'

import {
  ArticleDigestFeed,
  EmptyArticle,
  InfiniteScroll,
  Layout,
  Spinner,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { mergeConnections } from '~/common/utils'

import { RecommendationArticles } from './__generated__/RecommendationArticles'

const query = gql`
  query RecommendationArticles($after: String) {
    viewer {
      id
      recommendation {
        recommendArticles(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              ...ArticleDigestFeedArticlePublic
              ...ArticleDigestFeedArticlePrivate
            }
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

const Feed = () => {
  const { data, error, loading, fetchMore, networkStatus, refetch } = useQuery<
    RecommendationArticles
  >(query, {
    notifyOnNetworkStatusChange: true,
  })

  const connectionPath = 'viewer.recommendation.recommendArticles'
  const result = data?.viewer?.recommendation.recommendArticles
  const { edges, pageInfo } = result || {}
  const isNewLoading = networkStatus === NetworkStatus.loading

  if (loading && (!result || isNewLoading)) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle />
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={() =>
        fetchMore({
          variables: {
            after: pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) =>
            mergeConnections({
              oldData: previousResult,
              newData: fetchMoreResult,
              path: connectionPath,
              dedupe: true,
            }),
        })
      }
      pullToRefresh={refetch}
    >
      <ul>
        {edges.map(({ node, cursor }, i) => (
          <li key={cursor}>
            <ArticleDigestFeed article={node} />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}

export default () => (
  <Layout.Main>
    <Feed />
  </Layout.Main>
)
