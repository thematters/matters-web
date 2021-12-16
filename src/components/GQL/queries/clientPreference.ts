import gql from 'graphql-tag'

export default gql`
  query ClientPreference {
    clientPreference @client {
      id
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
      announcement
      language
    }
  }
`
