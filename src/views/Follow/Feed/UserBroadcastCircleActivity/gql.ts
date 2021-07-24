import gql from 'graphql-tag'

import { UserDigest } from '~/components'

import FollowingFeedCircle from '../FollowingFeedCircle'
import FollowingFeedComment from '../FollowingFeedComment'

export const fragments = gql`
  fragment UserBroadcastCircleActivity on UserBroadcastCircleActivity {
    actor {
      ...UserDigestPlainUser
    }
    createdAt
    nodeComment: node {
      ...FollowingFeedCommentPublic
      ...FollowingFeedCommentPrivate
    }
    targetCircle: target {
      ...FollowingFeedCircle
    }
  }
  ${UserDigest.Plain.fragments.user}
  ${FollowingFeedComment.fragments.comment.public}
  ${FollowingFeedComment.fragments.comment.private}
  ${FollowingFeedCircle.fragments.circle}
`
