import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import Assets from './Assets'
import FooterActions from './FooterActions'

export const fragments = {
  moment: {
    public: gql`
      fragment MomentDigestMomentPublic on Moment {
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
        ...MomentDigestFooterActionsMomentPublic
      }
      ${UserDigest.Mini.fragments.user}
      ${Assets.fragments.moment}
      ${FooterActions.fragments.moment.public}
    `,
    private: gql`
      fragment MomentDigestMomentPrivate on Moment {
        id
        ...MomentDigestFooterActionsMomentPrivate
      }
      ${FooterActions.fragments.moment.private}
    `,
  },
}
