import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

import { IcymiCuratedFeed } from './IcymiCuratedFeed'

const feedFragment = gql`
  fragment FeedArticleConnection on ArticleConnection {
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
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

export const FEED_ARTICLES_PUBLIC = {
  hottest: gql`
    query HottestFeedPublic($after: String) {
      viewer {
        id
        recommendation {
          feed: hottest(input: { first: 20, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `,
  newest: gql`
    query NewestFeedPublic($after: String) {
      viewer {
        id
        recommendation {
          feed: newest(input: { first: 20, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `,
  icymi: gql`
    query IcymiFeedPublic($after: String) {
      viewer {
        id
        recommendation {
          ...IcymiCuratedFeedRecommendation
          feed: icymi(input: { first: 20, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
    ${IcymiCuratedFeed.fragments}
  `,
}

export const FEED_ARTICLES_PRIVATE = gql`
  query FeedArticlesPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
`
