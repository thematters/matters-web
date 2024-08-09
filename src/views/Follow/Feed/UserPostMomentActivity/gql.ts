import gql from 'graphql-tag'

import { MomentDigestFeed } from '~/components/MomentDigest/Feed'

export const fragments = gql`
  fragment UserPostMomentActivity on UserPostMomentActivity {
    actor {
      id
    }
    createdAt
    nodeMoment: node {
      ...MomentDigestFeedMomentPublic
      ...MomentDigestFeedMomentPrivate
    }
    more {
      ...MomentDigestFeedMomentPublic
      ...MomentDigestFeedMomentPrivate
    }
  }
  ${MomentDigestFeed.fragments.moment.public}
  ${MomentDigestFeed.fragments.moment.private}
`
