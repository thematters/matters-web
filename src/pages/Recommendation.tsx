import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'

import { FeedDigest, InfiniteScroll, Spinner } from '~/components'
import EmptyArticle from '~/components/Empty/EmptyArticle'
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
              ...FeedDigestArticle
            }
          }
        }
      }
    }
  }
  ${FeedDigest.fragments.article}
`

const Feed = () => {
  const { data, error, loading, fetchMore, networkStatus } = useQuery<
    RecommendationArticles
  >(query, {
    notifyOnNetworkStatusChange: true
  })

  const connectionPath = 'viewer.recommendation.feed'
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
    <>
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={() =>
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
        }
      >
        <ul>
          {edges.map(({ node, cursor }, i) => (
            <li key={cursor}>
              <FeedDigest article={node} />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </>
  )
}

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <Feed />
    </article>
  </main>
)
