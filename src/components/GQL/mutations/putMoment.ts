import gql from 'graphql-tag'

import { MomentDigest } from '~/components/MomentDigest'

export const PUT_MOMENT = gql`
  mutation PutMoment($input: PutMomentInput!) {
    putMoment(input: $input) {
      id
      momentState: state
      ...MomentDigestMomentPublic
      ...MomentDigestMomentPrivate
    }
  }
  ${MomentDigest.fragments.moment.public}
  ${MomentDigest.fragments.moment.private}
`
