import { gql } from '@apollo/client'

import { CircleAvatar } from '~/components/CircleAvatar'
import UserDigestMini from '~/components/UserDigest/Mini'

import Footer from './Footer'

export const fragments = {
  circle: {
    public: gql`
      fragment DigestRichCirclePublic on Circle {
        id
        name
        displayName
        description
        owner {
          ...UserDigestMiniUser
        }
        ...AvatarCircle
        ...FooterCirclePublic
      }
      ${UserDigestMini.fragments.user}
      ${CircleAvatar.fragments.circle}
      ${Footer.fragments.circle.public}
    `,
    private: gql`
      fragment DigestRichCirclePrivate on Circle {
        id
        ...FooterCirclePrivate
      }
      ${Footer.fragments.circle.private}
    `,
  },
}
