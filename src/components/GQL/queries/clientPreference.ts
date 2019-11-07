import gql from 'graphql-tag'

export default gql`
  query ClientPreference {
    clientPreference @client {
      id
      feedSortType
      wall
      push {
        enabled
        supported
      }
    }
  }
`
