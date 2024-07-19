import gql from 'graphql-tag'

import { CommentFeed } from '~/components/Comment/Feed'
import MomentCommentForm from '~/components/Forms/MomentCommentForm'
import { MomentDigestDetail } from '~/components/MomentDigest'
import LikeButton from '~/components/MomentDigest/FooterActions/LikeButton'

export const MOMENT_DETAIL = gql`
  query MomentDetail($shortHash: String!) {
    moment(input: { shortHash: $shortHash }) {
      id
      ...MomentCommentFormMoment
      ...MomentDigestDetailMomentPublic
      ...MomentDigestFooterActionsLikeButtonMomentPublic
      ...MomentDigestFooterActionsLikeButtonMomentPrivate
      comments(input: { sort: oldest, first: null }) {
        edges {
          cursor
          node {
            ...CommentFeedCommentPublic
            ...CommentFeedCommentPrivate
          }
        }
      }
    }
  }
  ${MomentCommentForm.fragments.moment}
  ${MomentDigestDetail.fragments.moment.public}
  ${LikeButton.fragments.moment.public}
  ${LikeButton.fragments.moment.private}
  ${CommentFeed.fragments.comment.public}
  ${CommentFeed.fragments.comment.private}
`
