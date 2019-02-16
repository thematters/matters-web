import gql from 'graphql-tag'
import _ from 'lodash'
import { useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { mergeConnections } from '~/common/utils'
import {
  ArticleDigest,
  InfiniteScroll,
  Placeholder,
  Spinner,
  Title
} from '~/components'
import SortDropdown from './SortDropdown'

import { HomeFeed } from './__generated__/HomeFeed'
import styles from './styles.css'

const HOME_FEED = gql`
  query HomeFeed($cursor: String) {
    viewer {
      id
      recommendation {
        feed: hottest(input: { first: 10, after: $cursor }) {
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
  const [sortBy, setSortBy] = useState('hottest')

  return (
    <>
      <Query query={HOME_FEED}>
        {({
          data,
          loading,
          error,
          fetchMore
        }: QueryResult & { data: HomeFeed }) => {
          if (loading) {
            return <Placeholder.ArticleDigestList />
          }

          if (error) {
            return <span>{JSON.stringify(error)}</span> // TODO
          }

          const connectionPath = 'viewer.recommendation.feed'

          const { edges, pageInfo } = _.get(data, connectionPath)

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
              <header>
                <Title type="page">热门文章</Title>
                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
              </header>

              <hr />

              <ul>
                <InfiniteScroll
                  hasNextPage={pageInfo.hasNextPage}
                  loadMore={loadMore}
                  loading={loading}
                  loader={<Spinner />}
                >
                  {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                    <li key={cursor}>
                      <ArticleDigest.Feed article={node} />
                    </li>
                  ))}
                </InfiniteScroll>
              </ul>
            </>
          )
        }}
      </Query>
      <style jsx>{styles}</style>
    </>
  )
}
