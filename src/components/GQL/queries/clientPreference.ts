import gql from 'graphql-tag'

export default gql`
  query ClientPreference {
    clientPreference @client {
      id
      readCivicLikerDialog
      wall
      routeHistory
      onboardingTasks {
        enabled
      }
      circleBanner
      announcement
    }
  }
`
