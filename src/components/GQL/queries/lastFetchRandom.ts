import gql from 'graphql-tag'

export default gql`
  query LastFetchRandom {
    lastFetchRandom @client {
      id
      sidebarTags
      feedTags
      sidebarAuthors
      feedAuthors
    }
  }
`
