import gql from 'graphql-tag'

import { ArticleDigestTitle } from '~/components/ArticleDigest'
import { UserDigest } from '~/components/UserDigest'

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
            ...ArticleDigestTitleArticle
            author {
              id
              ...UserDigestMiniUser
            }
          }
        }
      }
    }
    ${ArticleDigestTitle.fragments.article}
    ${UserDigest.Mini.fragments.user}
  `,
}

export default fragments
