import gql from 'graphql-tag'

import { Avatar, ThreadComment } from '~/components'

export const USER_DISCUSSION = gql`
  query UserDiscussion($userName: String!) {
    user(input: { userName: $userName }) {
      id
      displayName
      ownCircles {
        id
      }
    }
  }
`

export const DISCUSSION_PUBLIC = gql`
  query UserDiscussionPublic($id: ID!) {
    node(input: { id: $id }) {
      ... on Circle {
        id
        owner {
          id
          isBlocking
        }
        prices {
          amount
        }
        members(input: { first: 4 }) {
          totalCount
          edges {
            cursor
            node {
              user {
                id
                ...AvatarUser
              }
            }
          }
        }

        # use alias to prevent overwriting <UserProfile>'s
        circleIsMember: isMember @connection(key: "userDiscussionIsMember")
        discussionCount
        discussionThreadCount
      }
    }
  }
  ${Avatar.fragments.user}
`

export const DISCUSSION_PRIVATE = gql`
  query UserDiscussionPrivate($id: ID!) {
    node(input: { id: $id }) {
      ... on Circle {
        id
        owner {
          id
          isBlocking
        }
        # use alias to prevent overwriting <UserProfile>'s
        circleIsMember: isMember @connection(key: "userDiscussionIsMember")
      }
    }
  }
`

export const DISCUSSION_COMMENTS = gql`
  query UserDiscussionComments($id: ID!, $after: String) {
    node(input: { id: $id }) {
      ... on Circle {
        id
        discussion(input: { first: 10, after: $after }) {
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
