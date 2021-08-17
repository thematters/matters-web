import gql from 'graphql-tag'

export const CIRCLE_FOLLOWER_ANALYTICS = gql`
  query CircleFollowerAnalytics($name: String!) {
    circle(input: { name: $name }) {
      id
      analytics {
        follower {
          history {
            value
            date
          }
          current
          followerPercentage
        }
      }
    }
  }
`
