import gql from 'graphql-tag'

import ContentDigest from './ContentDigest'

export const CIRCLE_CONTENT_ANALYTICS = {
  public: gql`
    query CircleContentAnalyticsPublic($userName: String!) {
      user(input: { userName: $userName }) {
        id
        ownCircles {
          id
          analytics {
            content {
              public {
                node {
                  id
                  ...CircleContentAnalyticsArticle
                }
                readCount
              }
            }
          }
        }
      }
    }
    ${ContentDigest.fragments.article}
  `,
  paywall: gql`
    query CircleContentAnalyticsPaywall($userName: String!) {
      user(input: { userName: $userName }) {
        id
        ownCircles {
          id
          analytics {
            content {
              paywall {
                node {
                  id
                  ...CircleContentAnalyticsArticle
                }
                readCount
              }
            }
          }
        }
      }
    }
    ${ContentDigest.fragments.article}
  `,
}
