import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export const ARTICLE_DONATORS = gql`
  query ArticleDonators($id: ID!, $after: String) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        donations(input: { first: 10, after: $after }) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              sender {
                id
                ...UserDigestRichUserPublic
                ...UserDigestRichUserPrivate
              }
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`
