import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

import { ArticleDigestCurated } from './ArticleDigestCurated'
import { ChannelHeader } from './ChannelFeed/ChannelHeader'
import { IcymiCuratedFeed } from './IcymiCuratedFeed'

const articleNodeFragment = gql`
  fragment ArticleNodeFragment on Article {
    ...ArticleDigestCuratedArticle
    ...ArticleDigestFeedArticlePublic
    ...ArticleDigestFeedArticlePrivate
  }
  ${ArticleDigestCurated.fragments.article}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
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
  newest: gql`
    query NewestFeedPublic($after: String) {
      viewer {
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
  hottest: gql`
    query HottestFeedPublic($after: String) {
      viewer {
        id
        recommendation {
          feed: hottest(input: { first: 20, after: $after, newAlgo: true }) {
            ...FeedArticleConnection
          }
        }
      }
    }
    ${feedFragment}
  `,
}

export const FEED_ARTICLES_PUBLIC_CHANNEL = gql`
  query FeedArticlesPublicChannel($shortHash: String!, $after: String) {
    channel(input: { shortHash: $shortHash }) {
      id
      ... on TopicChannel {
        ...TopicChannelHeader
        articles(input: { first: 20, after: $after }) {
          ...ChannelArticleConnectionFragment
        }
      }
      ... on CurationChannel {
        ...CurationChannelHeader
        articles(input: { first: 20, after: $after }) {
          ...ChannelArticleConnectionFragment
        }
      }
    }
  }
  ${ChannelHeader.fragments.topicChannel}
  ${ChannelHeader.fragments.curationChannel}
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
