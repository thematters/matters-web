import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Error,
  InfiniteScroll,
  PageHeader,
  Placeholder,
  Translate
} from '~/components'

import { mergeConnections } from '~/common/utils'

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

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'search'
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

        if (!edges || edges.length <= 0) {
          return (
            <EmptySearch
              inSidebar={false}
              description={
                <Translate
                  zh_hant="沒有找到你搜尋的內容。"
                  zh_hans="没有找到你搜索的内容。"
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
              pageTitle={<Translate zh_hant="文章" zh_hans="文章" />}
            >
              {isAggregate && pageInfo.hasNextPage && (
                <ViewAll q={q} type="article" />
              )}
            </PageHeader>
            <ul>
              {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                <li key={cursor}>
                  <ArticleDigest.Feed article={node} hasDateTime hasBookmark />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        )
      }}
    </Query>
  )
}

export default SearchArticles
