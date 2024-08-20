import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import Assets from '../Assets'

export const fragments = {
  moment: gql`
    fragment MomentDigestDetailMoment on Moment {
      id
      createdAt
      shortHash
      state
      content
      author {
        id
        userName
        ...UserDigestMiniUser
      }

      ...MomentDigestAssetsMoment
    }
    ${UserDigest.Mini.fragments.user}
    ${Assets.fragments.moment}
  `,
}
