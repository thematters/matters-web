import gql from 'graphql-tag'

import { ArticleDigestSidebar } from '~/components/ArticleDigest/Sidebar'

export const RELATED_DONATIONS = gql`
  query RelatedDonations(
    $senderUserName: String!
    $recipientUserName: String!
    $targetId: ID!
    $first: first_Int_min_0
    $random: random_Int_min_0_max_49!
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

export const QUERY_USER_BY_ADDRESS = gql`
  query QueryUserByAddress($ethAddress: String!) {
    user(input: { ethAddress: $ethAddress }) {
      id
    }
  }
`
