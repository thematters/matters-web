import gql from 'graphql-tag'

export const ANNOUNCEMENTS_PUBLIC = gql`
  query AnnouncementsPublic {
    official {
      announcements(input: {}) {
        id
        cover
        link
        type
        visible
        createdAt
      }
    }
  }
`
