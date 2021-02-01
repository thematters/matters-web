import gql from 'graphql-tag'

export const VIEWER_CIRLCE_STATE = gql`
  query ViewerCircleState($name: String!) {
    circle(input: { name: $name }) {
      id
      isMember
    }
  }
`
