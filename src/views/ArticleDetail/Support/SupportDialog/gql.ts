import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export const fragments = {
  recipient: gql`
    fragment UserDonationRecipient on User {
      id
      liker {
        likerId
        civicLiker
      }
      info {
        ethAddress
      }
      ...UserDigestMiniUser
    }
    ${UserDigest.Mini.fragments.user}
  `,
}
