import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { mergeConnections } from '~/common/utils'
import {
  ArticleDigest,
  Button,
  InfiniteScroll,
  Placeholder,
  Responsive,
  Spinner,
  Title,
  Translate
} from '~/components'
import SortBy from './SortBy'

import { HomeFeed } from './__generated__/HomeFeed'
import styles from './styles.css'

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
    query HottestFeed($cursor: String) {
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
    query NewestFeed($cursor: String) {
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
      <Query query={queries[sortBy]}>
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
              <header>
                <Title type="page">
                  {
                    ({
                      hottest: (
                        <Translate
                          translations={{
                            zh_hant: '熱門文章',
                            zh_hans: '热门文章 '
                          }}
                        />
                      ),
                      newest: (
                        <Translate
                          translations={{
                            zh_hant: '最新文章',
                            zh_hans: '最新文章 '
                          }}
                        />
                      )
                    } as { [key: string]: any })[sortBy]
                  }
                </Title>
                <SortBy sortBy={sortBy} setSortBy={setSortBy} />
              </header>

              <hr />

              <ul>
                <Responsive.SmallUp>
                  {(match: boolean) => (
                    <>
                      <InfiniteScroll
                        hasNextPage={match && pageInfo.hasNextPage}
                        loadMore={loadMore}
                        loading={loading}
                        loader={<Spinner />}
                      >
                        {edges.map(
                          ({ node, cursor }: { node: any; cursor: any }) => (
                            <li key={cursor}>
                              <ArticleDigest.Feed article={node} />
                            </li>
                          )
                        )}
                      </InfiniteScroll>
                      {!match && pageInfo.hasNextPage && (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: 24,
                            paddingBottom: 48,
                            alignItems: 'center'
                          }}
                        >
                          <Button
                            bgColor="green-lighter"
                            outlineColor="green"
                            size="default"
                            style={{ with: 131 }}
                            onClick={() => loadMore()}
                          >
                            <Translate
                              translations={{
                                zh_hans: '查看更多',
                                zh_hant: '查看更多'
                              }}
                            />
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </Responsive.SmallUp>
              </ul>
            </>
          )
        }}
      </Query>
      <style jsx>{styles}</style>
    </>
  )
}
