import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { ArticleDigest } from '~/components/ArticleDigest'
import { Error } from '~/components/Error'
import { InfiniteScroll } from '~/components/Interaction'
import { Translate } from '~/components/Language'
import { LoadMore } from '~/components/LoadMore'
import { PageHeader } from '~/components/PageHeader'
import { Placeholder } from '~/components/Placeholder'
import { Responsive } from '~/components/Responsive'
import { Spinner } from '~/components/Spinner'

import { mergeConnections } from '~/common/utils'

import { FeedArticleConnection } from './__generated__/FeedArticleConnection'
import SortBy from './SortBy'

const feedFragment = gql`
  fragment FeedArticleConnection on ArticleConnection {
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
  ${ArticleDigest.Feed.fragments.article}
`

const queries: { [key: string]: any } = {
  hottest: gql`
    query HottestFeed(
      $cursor: String
      $hasArticleDigestActionAuthor: Boolean = false
      $hasArticleDigestActionBookmark: Boolean = true
      $hasArticleDigestActionTopicScore: Boolean = false
    ) {
      viewer {
        id
        recommendation {
          feed: hottest(input: { first: 10, after: $cursor }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `,
  newest: gql`
    query NewestFeed(
      $cursor: String
      $hasArticleDigestActionAuthor: Boolean = false
      $hasArticleDigestActionBookmark: Boolean = true
      $hasArticleDigestActionTopicScore: Boolean = false
    ) {
      viewer {
        id
        recommendation {
          feed: newest(input: { first: 10, after: $cursor }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `
}

export default () => {
  const [sortBy, setSortBy] = useState('hottest')

  return (
    <>
      <Query query={queries[sortBy]} notifyOnNetworkStatusChange>
        {({
          data,
          loading,
          error,
          fetchMore
        }: QueryResult & { data: FeedArticleConnection }) => {
          const connectionPath = 'viewer.recommendation.feed'
          const connection = _get(data, connectionPath, {})
          if (loading && !connection) {
            return <Placeholder.ArticleDigestList />
          }

          if (error) {
            return <Error error={error} />
          }

          const { edges, pageInfo } = connection
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
              <PageHeader
                pageTitle={
                  sortBy === 'hottest' ? (
                    <Translate zh_hant="熱門文章" zh_hans="热门文章 " />
                  ) : (
                    <Translate zh_hant="最新文章" zh_hans="最新文章 " />
                  )
                }
              >
                <SortBy sortBy={sortBy} setSortBy={setSortBy} />
              </PageHeader>

              <Responsive.MediumUp>
                {(match: boolean) => (
                  <>
                    <InfiniteScroll
                      hasNextPage={match && pageInfo.hasNextPage}
                      loadMore={loadMore}
                    >
                      <ul>
                        {edges.map(
                          ({ node, cursor }: { node: any; cursor: any }) => (
                            <li key={cursor}>
                              <ArticleDigest.Feed
                                article={node}
                                hasDateTime
                                hasBookmark
                              />
                            </li>
                          )
                        )}
                      </ul>
                    </InfiniteScroll>
                    {!match && pageInfo.hasNextPage && loading && <Spinner />}
                    {!match && pageInfo.hasNextPage && !loading && (
                      <LoadMore onClick={loadMore} />
                    )}
                  </>
                )}
              </Responsive.MediumUp>
            </>
          )
        }}
      </Query>
    </>
  )
}
