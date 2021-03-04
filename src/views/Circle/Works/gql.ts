import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

import SubscriptionBanner from '../SubscriptionBanner'

export const CIRCLE_WORKS_PUBLIC = gql`
  query CircleWorksPublic($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      articles: works(input: { first: 3, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...ArticleDigestFeedArticlePublic
            ...ArticleDigestFeedArticlePrivate
          }
        }
      }
      ...SubscriptionBannerCirclePublic
      ...SubscriptionBannerCirclePrivate
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
  ${SubscriptionBanner.fragments.circle.public}
  ${SubscriptionBanner.fragments.circle.private}
`

export const CIRCLE_WORKS_PRIVATE = gql`
  query CircleWorksPrivate($name: String!, $ids: [ID!]!) {
    circle(input: { name: $name }) {
      id
      ...SubscriptionBannerCirclePrivate
    }
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
  ${SubscriptionBanner.fragments.circle.private}
`
