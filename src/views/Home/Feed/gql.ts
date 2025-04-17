import gql from 'graphql-tag'

import { ArticleDigestCurated, ArticleDigestFeed } from '~/components'

import { ChannelHeader } from './ChannelFeed/ChannelHeader'
import { IcymiCuratedFeed } from './IcymiCuratedFeed'

const articleFragments = gql`
  ${ArticleDigestCurated.fragments.article}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

const articleNodeFragment = gql`
  fragment ArticleNodeFragment on Article {
    ...ArticleDigestCuratedArticle
    ...ArticleDigestFeedArticlePublic
    ...ArticleDigestFeedArticlePrivate
  }
  ${articleFragments}
`

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
        ...ArticleNodeFragment
      }
    }
  }
  ${articleNodeFragment}
`

const channelArticleConnectionFragment = gql`
  fragment ChannelArticleConnectionFragment on ChannelArticleConnection {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
    edges {
      cursor
      pinned
      node {
        ...ArticleNodeFragment
      }
    }
  }
  ${articleNodeFragment}
`

export const FEED_ARTICLES_PUBLIC = {
  hottest: gql`
    query HottestFeedPublic($after: String) {
      viewer @connection(key: "viewerFeedHottest") {
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
      viewer @connection(key: "viewerFeedNewest") {
        id
        recommendation {
          feed: newest(
            input: { first: 20, after: $after, excludeChannelArticles: true }
          ) {
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

export const FEED_ARTICLES_PUBLIC_CHANNEL = gql`
  query FeedArticlesPublicChannel($shortHash: String!, $after: String) {
    channel(input: { shortHash: $shortHash }) {
      id
      ... on TopicChannel {
        ...ChannelHeader
        feed: articles(input: { first: 20, after: $after }) {
          ...ChannelArticleConnectionFragment
        }
      }
    }
  }
  ${ChannelHeader.fragments.channel}
  ${channelArticleConnectionFragment}
`

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
