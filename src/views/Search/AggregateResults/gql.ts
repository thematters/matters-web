import gql from 'graphql-tag'

import { ArticleDigestFeed, TagDigest, UserDigest } from '~/components'

export const SEARCH_AGGREGATE_ARTICLES_PUBLIC = gql`
  query SearchAggregateArticlesPublic(
    $key: String!
    $after: String
    $version: SearchAPIVersion = v20221212
  ) {
    search(
      input: {
        type: Article
        first: 30
        version: $version
        key: $key
        after: $after
      }
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
          ... on Article {
            ...ArticleDigestFeedArticlePublic
            ...ArticleDigestFeedArticlePrivate
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

export const SEARCH_AGGREGATE_TAGS_PUBLIC = gql`
  query SearchAggregateTagsPublic(
    $key: String!
    $after: String
    $version: SearchAPIVersion = v20221212
  ) {
    search(
      input: {
        type: Tag
        version: $version
        first: 30
        key: $key
        after: $after
      }
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Tag {
            ...TagDigestConciseTag
          }
        }
      }
    }
  }
  ${TagDigest.Concise.fragments.tag}
`

export const SEARCH_AGGREGATE_USERS_PUBLIC = gql`
  query SearchAggregateUsersPublic(
    $key: String!
    $after: String
    $version: SearchAPIVersion = v20221212
  ) {
    search(
      input: {
        type: User
        version: $version
        first: 30
        key: $key
        after: $after
      }
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestConciseUser
          }
        }
      }
    }
  }
  ${UserDigest.Concise.fragments.user}
`
