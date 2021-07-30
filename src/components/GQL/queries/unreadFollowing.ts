import gql from 'graphql-tag'

export default gql`
  query UnreadFollowing {
    viewer {
      id
      status {
        unreadFollowing
      }
    }
  }
`
