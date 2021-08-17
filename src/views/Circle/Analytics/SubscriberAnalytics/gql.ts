import gql from 'graphql-tag'

export const CIRCLE_SUBSCRIBER_ANALYTICS = gql`
  query CircleSubscriberAnalytics($name: String!) {
    circle(input: { name: $name }) {
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
`
