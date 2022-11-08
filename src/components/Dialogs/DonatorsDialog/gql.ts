import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export const ARTICLE_DONATORS = gql`
  query ArticleDonators($id: ID!, $after: String) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        donations: transactionsReceivedBy(
          input: { first: 10, purpose: donation, after: $after }
        ) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ... on User {
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
