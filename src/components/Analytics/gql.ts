import gql from 'graphql-tag'

export const analyticsUserFragment = gql`
  fragment AnalyticsUser on User {
    id
    userName
    info {
      email
    }
  }
`
