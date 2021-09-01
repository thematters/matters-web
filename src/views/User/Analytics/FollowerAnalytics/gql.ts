import gql from 'graphql-tag'

export const CIRCLE_FOLLOWER_ANALYTICS = gql`
  query CircleFollowerAnalytics($userName: String!) {
    user(input: { userName: $userName }) {
      id
      ownCircles {
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
  }
`
