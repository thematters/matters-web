import gql from 'graphql-tag'

export default gql`
  query ClientPreference {
    clientPreference @client {
      id
      feedSortType
      viewMode
      readCivicLikerDialog
      wall
      push {
        enabled
        supported
      }
      routeHistory
      followFeedType
    }
  }
`
