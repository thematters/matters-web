import gql from 'graphql-tag'

import { ArticleDigestTitle, Tag, UserDigest } from '~/components'

export const SEARCH_AGGREGATE_ARTICLES_PUBLIC = gql`
  query SearchAggregateArticlesPublic($key: String!) {
    search(input: { key: $key, type: Article, first: 4, record: true }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Article {
            ...ArticleDigestTitleArticle
          }
        }
      }
    }
  }
  ${ArticleDigestTitle.fragments.article}
`

export const SEARCH_AGGREGATE_TAGS_PUBLIC = gql`
  query SearchAggregateTagsPublic($key: String!) {
    search(input: { key: $key, type: Tag, first: 3, record: true }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Tag {
            ...DigestTag
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

export const SEARCH_AGGREGATE_USERS_PUBLIC = gql`
  query SearchAggregateUsersPublic($key: String!) {
    search(input: { key: $key, type: User, first: 3, record: true }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestMiniUser
          }
        }
      }
    }
  }
  ${UserDigest.Mini.fragments.user}
`
