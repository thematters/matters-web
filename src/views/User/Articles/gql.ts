import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components/ArticleDigest/Feed'

import UserTabs from '../UserTabs'
import PinBoard from './PinBoard'

const fragments = gql`
  fragment ArticlesUser on User {
    id
    userName
    displayName
    avatar
    info {
      description
      profileCover
    }
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
          createdAt
          wordCount
          ...ArticleDigestFeedArticlePublic
          ...ArticleDigestFeedArticlePrivate
        }
      }
    }
    status {
      state
    }
    ...PinnedWorksUser
    ...TabsUser
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
  ${PinBoard.fragments.user}
  ${UserTabs.fragments.user}
`

// without `Public` suffix, query as a logged-in user
export const VIEWER_ARTICLES = gql`
  query ViewerArticles($userName: String!, $after: String) {
    user(input: { userName: $userName }) @connection(key: "viewerArticles") {
      ...ArticlesUser
    }
  }
  ${fragments}
`

// with `Public` suffix, query as an anonymous user
export const USER_ARTICLES_PUBLIC = gql`
  query UserArticlesPublic($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      ...ArticlesUser
    }
  }
  ${fragments}
`

export const USER_ARTICLES_PRIVATE = gql`
  query UserArticlesPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
`
