import gql from 'graphql-tag'

export default gql`
  query ClientPreference($id: ID!) {
    clientPreference(input: { id: $id }) @client {
      id
      feedSortType
      readCivicLikerModal
      wall
    }
  }
`
