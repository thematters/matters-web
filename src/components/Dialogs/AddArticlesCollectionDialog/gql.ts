import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components/ArticleDigest/Feed'

export const fragments = {
  user: gql`
    fragment UserArticlesUser on User {
      id
      articles(input: { first: 20, after: $after }) {
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
            title
            state
            createdAt
          }
        }
      }
    }
  `,
}

export const ADD_ARTICLES_COLLECTION_USER = gql`
  query AddArticlesCollectionUser($userName: String, $after: String) {
    user(input: { userName: $userName }) {
      ...UserArticlesUser
    }
  }
  ${fragments.user}
`

export const USER_ARTICLES_SEARCH = gql`
  query UserArticlesSearch($authorId: ID!, $key: String!, $after: String) {
    search(
      input: {
        key: $key
        type: Article
        first: 20
        after: $after
        filter: { authorId: $authorId }
        quicksearch: true
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
            id
            title
            state
            createdAt
          }
        }
      }
    }
  }
`

export const ADD_ARTICLES_COLLECTION = gql`
  mutation AddArticlesCollection(
    $input: AddCollectionsArticlesInput!
    $first: first_Int_min_0
  ) {
    addCollectionsArticles(input: $input) {
      id
      title
      articles(input: { first: $first }) {
        totalCount
        edges {
          cursor
          node {
            ...ArticleDigestFeedArticlePublic
            ...ArticleDigestFeedArticlePrivate
            id
            title
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`
