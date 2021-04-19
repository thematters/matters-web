import { gql } from '@apollo/client'

export default gql`
  query UnreadFolloweeArticles {
    viewer {
      id
      status {
        unreadFolloweeArticles
      }
    }
  }
`
