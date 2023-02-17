import gql from 'graphql-tag'

export const fragments = {
  user: gql`
    fragment AnalyticsUser on User {
      id
      userName
      info {
        email
      }
    }
  `,
}
