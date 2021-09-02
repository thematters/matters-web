import gql from 'graphql-tag'

export const CIRCLE_LANDING = gql`
  query CircleLanding($name: String!) {
    circle(input: { name: $name }) {
      id
      owner {
        id
        userName
      }
    }
  }
`
