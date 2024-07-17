import gql from 'graphql-tag'

import { MomentDigestDetail } from '~/components/MomentDigest'
import LikeButton from '~/components/MomentDigest/FooterActions/LikeButton'

export const MOMENT_DETAIL = gql`
  query MomentDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Moment {
        id
        ...MomentDigestDetailMomentPublic
        ...MomentDigestFooterActionsLikeButtonMomentPublic
        ...MomentDigestFooterActionsLikeButtonMomentPrivate
      }
    }
  }
  ${MomentDigestDetail.fragments.moment.public}
  ${LikeButton.fragments.moment.public}
  ${LikeButton.fragments.moment.private}
`
