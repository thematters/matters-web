import gql from 'graphql-tag'

import { ArticleDigestSidebar } from '~/components/ArticleDigest/Sidebar'

export const RELATED_DONATIONS = gql`
  query RelatedDonations(
    $senderUserName: String!
    $recipientUserName: String!
    $targetId: ID!
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
        relatedDonationArticles(input: { first: 3, random: $random }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
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
