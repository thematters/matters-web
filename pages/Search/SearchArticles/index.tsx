import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  InfiniteScroll,
  PageHeader,
  Spinner,
  Translate
} from '~/components'
import ViewAll from '../ViewAll'

import { mergeConnections } from '~/common/utils'
import { SeachArticles } from './__generated__/SeachArticles'

const SEARCH_ARTICLES = gql`
  query SeachArticles($key: String!, $first: Int!, $cursor: String) {
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
  aggregate
}: {
  q: string
  aggregate: boolean
}) => {
  return (
    <>
      <PageHeader
        is="h2"
        pageTitle={
          <Translate translations={{ zh_hant: '文章', zh_hans: '文章' }} />
        }
      >
        {aggregate && <ViewAll q={q} type="article" />}
      </PageHeader>

      <section>
        <Query
          query={SEARCH_ARTICLES}
          variables={{ key: q, first: aggregate ? 5 : 10 }}
        >
          {({
            data,
            loading,
            error,
            fetchMore
          }: QueryResult & { data: SeachArticles }) => {
            if (loading) {
              return <Spinner />
            }

            if (error) {
              return <span>{JSON.stringify(error)}</span> // TODO
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

            return (
              <InfiniteScroll
                hasNextPage={!aggregate && pageInfo.hasNextPage}
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
      </section>
    </>
  )
}

export default SearchArticles
