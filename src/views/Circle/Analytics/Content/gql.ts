import gql from 'graphql-tag'

import ContentDigest from './ContentDigest'

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
                ...CircleContentAnalyticsArticle
              }
              readCount
            }
          }
        }
      }
    }
    ${ContentDigest.fragments.article}
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
                ...CircleContentAnalyticsArticle
              }
              readCount
            }
          }
        }
      }
    }
    ${ContentDigest.fragments.article}
  `,
}
