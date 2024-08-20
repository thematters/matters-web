import gql from 'graphql-tag'

import { ArticleTag } from '~/components/Tag'

import { ArticleDigestDropdown, UserDigest } from './internal'

export const SELECT_SEARCH = gql`
  query SelectSearch(
    $key: String!
    $type: SearchTypes!
    $filter: SearchFilter
    $after: String
    $first: first_Int_min_0
    $exclude: SearchExclude
    $includeAuthorTags: Boolean = false
  ) {
    search(
      input: {
        key: $key
        type: $type
        filter: $filter
        after: $after
        first: $first
        exclude: $exclude
        includeAuthorTags: $includeAuthorTags
        quicksearch: true
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
          id
          ... on User {
            ...UserDigestMiniUser
          }
          ... on Article {
            ...ArticleDigestDropdownArticle
          }
          ... on Tag {
            ...DigestTag
          }
        }
      }
    }
  }
  ${UserDigest.Mini.fragments.user}
  ${ArticleDigestDropdown.fragments.article}
  ${ArticleTag.fragments.tag}
`

export const LIST_VIEWER_ARTICLES = gql`
  query ListViewerArticles($after: String) {
    viewer {
      id
      articles(input: { first: 10, after: $after }) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            ...ArticleDigestDropdownArticle
          }
        }
      }
    }
  }
  ${ArticleDigestDropdown.fragments.article}
`

export const ARTICLE_URL_QUERY = gql`
  query ArticleUrlQuery($shortHash: String!) {
    article(input: { shortHash: $shortHash }) {
      ...ArticleDigestDropdownArticle
    }
  }
  ${ArticleDigestDropdown.fragments.article}
`
