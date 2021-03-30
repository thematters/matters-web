import gql from 'graphql-tag'

export default gql`
  query FetchRecord {
    fetchRecord @client {
      id
      sidebarTags
      feedTags
      sidebarAuthors
      feedAuthors
    }
  }
`
