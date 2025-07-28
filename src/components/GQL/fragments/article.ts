import gql from 'graphql-tag'

import { ArticleDigestDropdown } from '~/components/ArticleDigest'

const fragments = {
  articleCollection: gql`
    fragment ArticleCollection on Article {
      id
      collection(input: { after: $after, first: $first })
        @connection(key: "articleCollection") {
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
