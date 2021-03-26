import gql from 'graphql-tag'

export const fragments = {
  user: gql`
    fragment EditProfileDialogUserPublic on User {
      id
      avatar
      displayName
      info {
        profileCover
        description
      }
      liker {
        civicLiker
      }
    }
  `,
}
