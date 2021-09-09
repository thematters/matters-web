import gql from 'graphql-tag'

export const USER_LANDING = gql`
  query UserLanding($userName: String!) {
    user(input: { userName: $userName }) {
      id
      userName
      displayName
      info {
        description
        profileCover
      }
      status {
        state
      }
      articles(input: { first: 0 }) {
        totalCount
      }
      topics {
        id
      }
    }
  }
`
