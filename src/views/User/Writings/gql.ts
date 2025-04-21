import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components/ArticleDigest/Feed'
import { MomentDigestFeed } from '~/components/MomentDigest/Feed'

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
            ...MomentDigestFeedMomentPublic
            ...MomentDigestFeedMomentPrivate
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
  ${MomentDigestFeed.fragments.moment.public}
  ${MomentDigestFeed.fragments.moment.private}
  ${PinBoard.fragments.user}
`

// without `Public` suffix, query as a logged-in user
export const VIEWER_WRITINGS = gql`
  query ViewerWritings($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
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
        ...MomentDigestFeedMomentPrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
  ${MomentDigestFeed.fragments.moment.private}
`

export const USER_MOMENTS_REACTIVE_DATA = gql`
  query UserMomentsReactiveData($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Moment {
        likeCount
        commentCount
      }
    }
  }
`
