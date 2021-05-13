import gql from 'graphql-tag'

export default gql`
  query ClientPreference {
    clientPreference @client {
      id
      feedSortType
      followFeedType
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
      circleBanner
      language
    }
  }
`
