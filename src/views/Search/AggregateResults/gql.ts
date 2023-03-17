import gql from 'graphql-tag'

import { ArticleDigestFeed, TagDigest, UserDigest } from '~/components'

export const SEARCH_AGGREGATE_ARTICLES_PUBLIC = gql`
  query SearchAggregateArticlesPublic(
    $key: String!
    $first: first_Int_min_0 = 30
    $after: String
    $version: SearchAPIVersion = v20230301
    $coefficients: String
  ) {
    search(
      input: {
        type: Article
        first: $first
        version: $version
        key: $key
        after: $after
        coefficients: $coefficients
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
    $first: first_Int_min_0 = 30
    $after: String
    $version: SearchAPIVersion = v20230301
    $coefficients: String
  ) {
    search(
      input: {
        type: Tag
        version: $version
        first: $first
        key: $key
        after: $after
        coefficients: $coefficients
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
    $first: first_Int_min_0 = 30
    $after: String
    $version: SearchAPIVersion = v20230301
    $coefficients: String
  ) {
    search(
      input: {
        type: User
        version: $version
        first: $first
        key: $key
        after: $after
        coefficients: $coefficients
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
