import gql from 'graphql-tag'

export const VIEWER_BLOCKED_USERS = gql`
  query ViewerBlockedUsers {
    viewer {
      id
      blockList(input: { first: 0 }) {
        totalCount
      }
    }
  }
`
