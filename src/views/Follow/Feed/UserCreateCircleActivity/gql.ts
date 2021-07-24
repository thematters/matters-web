import gql from 'graphql-tag'

import { UserDigest } from '~/components'

import UnfollowUser from '../DropdownActions/UnfollowUser'
import FollowingFeedCircle from '../FollowingFeedCircle'

export const fragments = gql`
  fragment UserCreateCircleActivity on UserCreateCircleActivity {
    actor {
      ...UserDigestPlainUser
      ...UnfollowActionButtonUserPrivate
    }
    createdAt
    nodeCircle: node {
      ...FollowingFeedCircle
    }
  }
  ${UserDigest.Plain.fragments.user}
  ${UnfollowUser.fragments.user.private}
  ${FollowingFeedCircle.fragments.circle}
`
