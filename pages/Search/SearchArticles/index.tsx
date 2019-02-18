import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { ArticleDigest, Spinner } from '~/components'

import { SeachArticles } from './__generated__/SeachArticles'

const SEARCH_ARTICLES = gql`
  query SeachArticles($key: String!) {
    search(input: { key: $key, type: Article, first: 10 }) {
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

const SearchArticles = ({ q }: { q: string | string[] }) => {
  const key = q instanceof Array ? q.join(',') : q

  return (
    <section>
      <Query query={SEARCH_ARTICLES} variables={{ key }}>
        {({ data, loading, error }: QueryResult & { data: SeachArticles }) => {
          if (loading) {
            return <Spinner />
          }

          if (error) {
            return <span>{JSON.stringify(error)}</span> // TODO
          }

          return (
            <ul>
              {data.search.edges.map(
                ({ node, cursor }: { node: any; cursor: any }) => (
                  <li key={cursor}>
                    <ArticleDigest.Feed article={node} />
                  </li>
                )
              )}
            </ul>
          )
        }}
      </Query>
    </section>
  )
}

export default SearchArticles
