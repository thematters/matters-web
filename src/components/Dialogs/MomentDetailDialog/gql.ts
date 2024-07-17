import gql from 'graphql-tag'

import { MomentDigestDetail } from '~/components/MomentDigest'
import LikeButton from '~/components/MomentDigest/FooterActions/LikeButton'

export const MOMENT_DETAIL_PUBLIC = gql`
  query MomentDetailPublic($id: ID!) {
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

export const MOMENT_DETAIL_PRIVATE = gql`
  query MomentDetailPrivate($id: ID!) {
    node(input: { id: $id }) {
      ... on Moment {
        id
        ...MomentDigestFooterActionsLikeButtonMomentPrivate
      }
    }
  }
  ${LikeButton.fragments.moment.private}
`
