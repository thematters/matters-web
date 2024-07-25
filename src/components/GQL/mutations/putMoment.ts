import gql from 'graphql-tag'

import { MomentDigestFeed } from '~/components/MomentDigest/Feed'

export const PUT_MOMENT = gql`
  mutation PutMoment($input: PutMomentInput!) {
    putMoment(input: $input) {
      id
      momentState: state
      ...MomentDigestFeedMomentPublic
      ...MomentDigestFeedMomentPrivate
    }
  }
  ${MomentDigestFeed.fragments.moment.public}
  ${MomentDigestFeed.fragments.moment.private}
`
