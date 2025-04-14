import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

export const CAMPAIGN_ARTICLES_PUBLIC = gql`
  query CampaignArticlesPublic(
    $shortHash: String!
    $after: String
    $filter: CampaignArticlesFilter
  ) {
    campaign(input: { shortHash: $shortHash }) {
      id
      ... on WritingChallenge {
        id
        isManager
        articles(input: { first: 20, after: $after, filter: $filter }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            featured
            announcement
            node {
              id
              campaigns {
                campaign {
                  id
                  shortHash
                }
                stage {
                  id
                  nameZhHant: name(input: { language: zh_hant })
                  nameZhHans: name(input: { language: zh_hans })
                  nameEn: name(input: { language: en })
                }
              }
              ...ArticleDigestFeedArticlePublic
              ...ArticleDigestFeedArticlePrivate
            }
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

export const CAMPAIGN_ARTICLES_PRIVATE = gql`
  query CampaignArticlesPrivate($shortHash: String!, $ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
    }
    campaign(input: { shortHash: $shortHash }) {
      id
      ... on WritingChallenge {
        id
        isManager
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
`
