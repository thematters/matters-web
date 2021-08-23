import gql from 'graphql-tag'

export const VISIBLE_ANNOUNCEMENTS = gql`
  query VisibleAnnouncements($input: AnnouncementsInput!) {
    viewer {
      id
    }
    official {
      announcements(input: $input) {
        id
        title
        cover
        content
        link
        type
        visible
        createdAt
      }
    }
  }
`
