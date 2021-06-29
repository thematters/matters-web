import gql from 'graphql-tag'

import { CircleAvatar } from '~/components/CircleAvatar'
import UserDigestMini from '~/components/UserDigest/Mini'

export const fragments = {
  circle: gql`
    fragment DigestFeedCircle on Circle {
      id
      name
      displayName
      description
      createdAt
      owner {
        ...UserDigestMiniUser
      }
      ...AvatarCircle
    }
    ${UserDigestMini.fragments.user}
    ${CircleAvatar.fragments.circle}
  `,
}
