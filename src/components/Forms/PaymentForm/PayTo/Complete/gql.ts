import gql from 'graphql-tag'

export const QUERY_USER_BY_ADDRESS = gql`
  query QueryUserByAddress($ethAddress: String!) {
    user(input: { ethAddress: $ethAddress }) {
      id
    }
  }
`
