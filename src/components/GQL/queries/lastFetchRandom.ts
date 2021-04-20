import { gql } from '@apollo/client'

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
