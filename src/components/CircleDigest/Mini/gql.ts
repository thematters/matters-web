import gql from 'graphql-tag'

import UserDigestMini from '~/components/UserDigest/Mini'

import Counts from '../Counts'

export const fragments = {
  circle: gql`
    fragment DigestMiniCircle on Circle {
      id
      name
      displayName
      description
      owner {
        ...UserDigestMiniUser
      }
      ...CountsCircle
    }
    ${UserDigestMini.fragments.user}
    ${Counts.fragments.circle}
  `,
}
