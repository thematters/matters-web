import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components/ArticleDigest/Feed'
import { MomentDigest } from '~/components/MomentDigest'

import PinBoard from './PinBoard'

const fragments = gql`
  fragment WritingsUser on User {
    id
    userName
    displayName
    avatar
    info {
      description
      profileCover
    }
    writings(input: { first: 20, after: $after }) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          __typename
          ... on Article {
            id
            createdAt
            wordCount
            artileState: state
            ...ArticleDigestFeedArticlePublic
            ...ArticleDigestFeedArticlePrivate
          }
          ... on Moment {
            id
            momentState: state
            ...MomentDigestMomentPublic
            ...MomentDigestMomentPrivate
          }
        }
      }
    }
    status {
      state
    }
    ...PinnedWorksUser
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
  ${MomentDigest.fragments.moment.public}
  ${MomentDigest.fragments.moment.private}
  ${PinBoard.fragments.user}
`

// without `Public` suffix, query as a logged-in user
export const VIEWER_WRITINGS = gql`
  query ViewerWritings($userName: String!, $after: String) {
    user(input: { userName: $userName }) @connection(key: "viewerWritings") {
      ...WritingsUser
    }
  }
  ${fragments}
`

// with `Public` suffix, query as an anonymous user
export const USER_WRITINGS_PUBLIC = gql`
  query UserWritingsPublic($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      ...WritingsUser
    }
  }
  ${fragments}
`

export const USER_WRITINGS_PRIVATE = gql`
  query UserWritingsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
      ... on Moment {
        ...MomentDigestMomentPrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
  ${MomentDigest.fragments.moment.private}
`
