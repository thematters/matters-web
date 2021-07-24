import { Translate, UserDigest } from '~/components'

import UnfollowUserActionButton from '../DropdownActions/UnfollowUser'
import FeedHead from '../FollowingFeedHead'
import FeedUser from '../FollowingFeedUser'
import { fragments } from './gql'

import { UserFollowUserActivity as Activity } from './__generated__/UserFollowUserActivity'

const UserFollowUserActivity = ({
  actor,
  nodeUser: node,
  createdAt,
}: Activity) => (
  <FeedUser
    header={
      <FeedHead>
        <UserDigest.Plain user={actor} />
        <span>
          <Translate zh_hant="追蹤" zh_hans="追踪" en="followed" />
        </span>
      </FeedHead>
    }
    user={node}
    date={createdAt}
    actions={<UnfollowUserActionButton user={actor} />}
  />
)

UserFollowUserActivity.fragments = fragments

export default UserFollowUserActivity
