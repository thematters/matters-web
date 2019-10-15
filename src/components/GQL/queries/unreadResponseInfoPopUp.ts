import gql from 'graphql-tag'

export default gql`
  query UnreadResponseInfoPopUp {
    viewer {
      id
      status {
        unreadResponseInfoPopUp
      }
    }
  }
`
