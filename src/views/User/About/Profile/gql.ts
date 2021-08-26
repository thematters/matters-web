import gql from 'graphql-tag'

import { Avatar } from '~/components'

export const fragments = {
  user: gql`
    fragment UserAboutProfileUser on User {
      id
      userName
      displayName
      liker {
        civicLiker
      }
      info {
        badges {
          type
        }
        description
        profileCover
      }
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `,
}
