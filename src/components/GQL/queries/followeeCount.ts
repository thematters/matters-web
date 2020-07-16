import { gql } from '@apollo/client'

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
