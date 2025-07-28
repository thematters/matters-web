import gql from 'graphql-tag'

import { ArticleDigestDropdown } from '~/components/ArticleDigest'

const fragments = {
  articleConnections: gql`
    fragment ArticleConnections on Article {
      id
      connections(input: { after: $after, first: $first })
        @connection(key: "articleConnections") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        totalCount
        edges {
          cursor
          node {
            id
            title
            ...ArticleDigestDropdownArticle
          }
        }
      }
    }
    ${ArticleDigestDropdown.fragments.article}
  `,
}

export default fragments
