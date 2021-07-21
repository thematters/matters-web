import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const fragments = {
  user: {
    public: gql`
      fragment FollowingFeedUserPublic on User {
        id
        ...UserDigestRichUserPublic
      }
      ${UserDigest.Rich.fragments.user.public}
    `,
    private: gql`
      fragment FollowingFeedUserPrivate on User {
        id
        ...UserDigestRichUserPrivate
      }
      ${UserDigest.Rich.fragments.user.private}
    `,
  },
}
