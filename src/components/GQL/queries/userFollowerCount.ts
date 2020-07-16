import { gql } from '@apollo/client'

export default gql`
  query UserFollowerCount($userName: String!) {
    user(input: { userName: $userName }) {
      id
      followers(input: { first: 0 }) {
        totalCount
      }
    }
  }
`
