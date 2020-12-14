import gql from 'graphql-tag'

export default gql`
  query ClientPreference {
    clientPreference @client {
      id
      feedSortType
      followFeedType
      viewMode
      readCivicLikerDialog
      wall
      push {
        enabled
        supported
      }
      routeHistory
      onboardingTasks {
        enabled
      }
    }
  }
`
