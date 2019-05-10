import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  InfiniteScroll,
  PageHeader,
  Placeholder,
  Translate
} from '~/components'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import EmptySearch from '../EmptySearch'
import ViewAll from '../ViewAll'
import { SeachArticles } from './__generated__/SeachArticles'

const SEARCH_ARTICLES = gql`
  query SeachArticles(
    $key: String!
    $first: Int!
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    search(input: { key: $key, type: Article, first: $first, after: $cursor }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Article {
            ...FeedDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

const SearchArticles = ({
  q,
  isAggregate
}: {
  q: string
  isAggregate: boolean
}) => {
  return (
    <Query
      query={SEARCH_ARTICLES}
      variables={{ key: q, first: isAggregate ? 5 : 10 }}
    >
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: SeachArticles }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        const connectionPath = 'search'
        const { edges, pageInfo } = _get(data, connectionPath, {})
        const loadMore = () => {
          analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
            type: FEED_TYPE.SEARCH_ARTICLE,
            location: edges.length,
            entrance: q
          })
          return fetchMore({
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
        }

        if (!edges || edges.length <= 0) {
          return (
            <EmptySearch
              inSidebar={false}
              description={
                <Translate
                  zh_hant={TEXT.zh_hant.emptySearchResults}
                  zh_hans={TEXT.zh_hans.emptySearchResults}
                />
              }
            />
          )
        }

        return (
          <InfiniteScroll
            hasNextPage={!isAggregate && pageInfo.hasNextPage}
            loadMore={loadMore}
          >
            <PageHeader
              is="h2"
              pageTitle={
                <Translate
                  zh_hant={TEXT.zh_hant.article}
                  zh_hans={TEXT.zh_hans.article}
                />
              }
            >
              {isAggregate && pageInfo.hasNextPage && (
                <ViewAll q={q} type="article" />
              )}
            </PageHeader>
            <ul>
              {edges.map(
                ({ node, cursor }: { node: any; cursor: any }, i: number) => (
                  <li
                    key={cursor}
                    onClick={() =>
                      analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                        type: FEED_TYPE.SEARCH_ARTICLE,
                        location: i,
                        entrance: q
                      })
                    }
                  >
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
        )
      }}
    </Query>
  )
}

export default SearchArticles
