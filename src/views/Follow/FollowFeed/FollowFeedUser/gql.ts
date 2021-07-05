import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const fragments = {
  user: {
    public: gql`
      fragment FollowFeedUserPublic on User {
        id
        ...UserDigestRichUserPublic
      }
      ${UserDigest.Rich.fragments.user.public}
    `,
    private: gql`
      fragment FollowFeedUserPrivate on User {
        id
        ...UserDigestRichUserPrivate
      }
      ${UserDigest.Rich.fragments.user.private}
    `,
  },
}
