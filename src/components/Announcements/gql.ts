import gql from 'graphql-tag'

export const VISIBLE_ANNOUNCEMENTS = gql`
  query VisibleAnnouncements($input: AnnouncementsInput!) {
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
        translations {
          language
          title
          cover
          content
          link
        }
      }
    }
  }
`
