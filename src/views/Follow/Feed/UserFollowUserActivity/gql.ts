import gql from 'graphql-tag'

import { UserDigest } from '~/components'

import UnfollowUser from '../DropdownActions/UnfollowUser'
import FollowingFeedUser from '../FollowingFeedUser'

export const fragments = gql`
  fragment UserFollowUserActivity on UserFollowUserActivity {
    actor {
      ...UserDigestPlainUser
      ...UnfollowActionButtonUserPrivate
    }
    createdAt
    nodeUser: node {
      ...UserDigestRichUserPublic
      ...UserDigestRichUserPrivate
    }
  }
  ${UserDigest.Plain.fragments.user}
  ${UnfollowUser.fragments.user.private}
  ${FollowingFeedUser.fragments.user.public}
  ${FollowingFeedUser.fragments.user.private}
`
