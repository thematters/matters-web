import gql from 'graphql-tag'

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
