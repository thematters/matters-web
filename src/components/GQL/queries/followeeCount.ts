import gql from 'graphql-tag'

export default gql`
  query ViewerFolloweeCount {
    viewer {
      id
      followees(input: { first: 0 }) {
        totalCount
      }
    }
  }
`
