import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

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
      viewer @connection(key: "viewerFeedHottest") {
        id
        recommendation {
          feed: hottest(input: { first: 10, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `,
  newest: gql`
    query NewestFeedPublic($after: String) {
      viewer @connection(key: "viewerFeedNewest") {
        id
        recommendation {
          feed: newest(input: { first: 10, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `,
  icymi: gql`
    query IcymiFeedPublic($after: String) {
      viewer @connection(key: "viewerFeedIcymi") {
        id
        recommendation {
          feed: icymi(input: { first: 10, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `,
  topics: gql`
    query TopicsFeedPublic($after: String) {
      viewer @connection(key: "viewerFeedTopics") {
        id
        recommendation {
          feed: topics(input: { first: 10, after: $after }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
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
