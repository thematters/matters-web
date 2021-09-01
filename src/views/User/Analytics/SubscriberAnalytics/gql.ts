import gql from 'graphql-tag'

export const CIRCLE_SUBSCRIBER_ANALYTICS = gql`
  query CircleSubscriberAnalytics($userName: String!) {
    user(input: { userName: $userName }) {
      id
      ownCircles {
        id
        analytics {
          subscriber {
            subscriberHistory {
              value
              date
            }
            inviteeHistory {
              value
              date
            }
            currentSubscriber
            currentInvitee
          }
        }
      }
    }
  }
`
