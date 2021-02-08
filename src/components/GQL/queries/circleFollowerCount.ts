import gql from 'graphql-tag'

export default gql`
  query CircleFollowerCount($name: String!) {
    circle(input: { name: $name }) {
      id
      followers(input: { first: 0 }) {
        totalCount
      }
    }
  }
`
