import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'

export const fragments = {
  user: gql`
    fragment UserDigestConciseUser on User {
      id
      userName
      displayName
      status {
        state
      }
      ...AvatarUser
      ...AvatarUserLogbook
    }
    ${Avatar.fragments.user}
    ${Avatar.fragments.logbook}
  `,
}
