import gql from 'graphql-tag'

export const QUERY_USER_NAME = gql`
  query QueryUserName($userName: String!) {
    user(input: { userName: $userName }) {
      id
    }
  }
`

export const SET_USER_NAME = gql`
  mutation SetUserName($userName: String!) {
    setUserName(input: { userName: $userName }) {
      id
      userName
    }
  }
`
