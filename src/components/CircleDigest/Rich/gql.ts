import gql from 'graphql-tag'

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
        ...FooterCirclePublic
      }
      ${UserDigestMini.fragments.user}
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
