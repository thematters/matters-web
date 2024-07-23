import gql from 'graphql-tag'

import MomentCommentForm from '~/components/Forms/MomentCommentForm'
import { MomentDigestDetail } from '~/components/MomentDigest'
import LikeButton from '~/components/MomentDigest/FooterActions/LikeButton'

import Comments from './Comments'

export const MOMENT_DETAIL = gql`
  query MomentDetail($shortHash: String!) {
    moment(input: { shortHash: $shortHash }) {
      id
      ...MomentCommentFormMoment
      ...MomentDigestDetailMoment
      ...MomentDigestFooterActionsLikeButtonMomentPublic
      ...MomentDigestFooterActionsLikeButtonMomentPrivate
      ...MomentDigestDetailCommentsMoment
    }
  }
  ${MomentCommentForm.fragments.moment}
  ${MomentDigestDetail.fragments.moment}
  ${LikeButton.fragments.moment.public}
  ${LikeButton.fragments.moment.private}
  ${Comments.fragments.moment}
`
