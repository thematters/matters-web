import gql from 'graphql-tag'

import { ArticleDigestSidebar } from '~/components/ArticleDigest/Sidebar'

export const RELATED_DONATIONS = gql`
  query RelatedDonations(
    $senderUserName: String!
    $recipientUserName: String!
    $targetId: ID!
    $first: Int!
    $random: NonNegativeInt!
  ) {
    sender: user(input: { userName: $senderUserName }) {
      id
      status {
        donatedArticleCount
      }
    }
    recipient: user(input: { userName: $recipientUserName }) {
      id
      status {
        receivedDonationCount
      }
    }
    node(input: { id: $targetId }) {
      id
      ... on Article {
        relatedDonationArticles(input: { first: $first, random: $random }) {
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
              ...ArticleDigestSidebarArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigestSidebar.fragments.article}
`
