import gql from 'graphql-tag'

export const CIRCLE_CONTENT_ANALYTICS = {
  public: gql`
    query CircleContentAnalyticsPublic($name: String!) {
      circle(input: { name: $name }) {
        id
        analytics {
          content {
            public {
              node {
                id
              }
              readCount
            }
          }
        }
      }
    }
  `,
  paywall: gql`
    query CircleContentAnalyticsPaywall($name: String!) {
      circle(input: { name: $name }) {
        id
        analytics {
          content {
            paywall {
              node {
                id
              }
              readCount
            }
          }
        }
      }
    }
  `,
}
