import gql from 'graphql-tag'

export const CIRCLE_BANNER = gql`
  query CircleBanner {
    viewer {
      id
      ownCircles {
        id
        name
      }
    }
  }
`
