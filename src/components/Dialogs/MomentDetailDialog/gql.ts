import gql from 'graphql-tag'

import { MomentDigestDetail } from '~/components/MomentDigest'

export const MOMENT_DETAIL = gql`
  query MomentDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Moment {
        id
        liked
        likeCount
        ...MomentDigestDetailMomentPublic
      }
    }
  }
  ${MomentDigestDetail.fragments.moment.public}
`
