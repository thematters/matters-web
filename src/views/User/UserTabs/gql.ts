import gql from 'graphql-tag'

export const USER_TABS_PUBLIC = gql`
  query UserTabsPublic($userName: String!) {
    user(input: { userName: $userName }) {
      id
      subscribedCircles(input: { first: 0 }) {
        totalCount
      }
    }
  }
`
