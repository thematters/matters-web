import { gql } from '@apollo/client'

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
