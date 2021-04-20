import { gql } from '@apollo/client'

import { UserDigest } from '~/components/UserDigest'

export const ARTICLE_DONATORS = gql`
  query ArticleDonators($mediaHash: String, $after: String) {
    article(input: { mediaHash: $mediaHash }) {
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
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`
