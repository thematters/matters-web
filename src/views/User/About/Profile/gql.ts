import gql from 'graphql-tag'

import { UserDigest } from '~/components'

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
      ...UserDigestMiniUser
    }
    ${UserDigest.Mini.fragments.user}
  `,
}
