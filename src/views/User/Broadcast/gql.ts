import gql from 'graphql-tag'

import { ThreadComment } from '~/components'

export const USER_BROADCAST = gql`
  query UserBroadcast($userName: String!) {
    user(input: { userName: $userName }) {
      id
      displayName
      ownCircles {
        id
      }
    }
  }
`

export const BROADCAST_PUBLIC = gql`
  query UserBroadcastPublic($id: ID!, $after: String) {
    node(input: { id: $id }) {
      ... on Circle {
        id
        name
        owner {
          id
        }
        isMember
        broadcast(input: { first: 10, after: $after }) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            node {
              ...ThreadCommentCommentPublic
              ...ThreadCommentCommentPrivate
            }
          }
        }
      }
    }
  }
  ${ThreadComment.fragments.comment.public}
  ${ThreadComment.fragments.comment.private}
`

export const BROADCAST_PRIVATE = gql`
  query UserBroadcastPrivate($id: ID!, $ids: [ID!]!) {
    node(input: { id: $id }) {
      ... on Circle {
        id
        owner {
          id
        }
        isMember
      }
    }
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...ThreadCommentCommentPrivate
      }
    }
  }
  ${ThreadComment.fragments.comment.private}
`
