import { Translate, UserDigest } from '~/components'

import UnfollowUserActionButton from '../DropdownActions/UnfollowUser'
import FeedCircle from '../FollowingFeedCircle'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserCreateCircleActivity as Activity } from './__generated__/UserCreateCircleActivity'

const UserCreateCircleActivity = ({
  actor,
  nodeCircle: node,
  createdAt,
}: Activity) => (
  <FeedCircle
    header={
      <FeedHead>
        <UserDigest.Plain user={actor} />
        <span>
          <Translate zh_hant="創建" zh_hans="创建" en="created" />
        </span>
      </FeedHead>
    }
    circle={node}
    date={createdAt}
    actions={<UnfollowUserActionButton user={actor} />}
  />
)

UserCreateCircleActivity.fragments = fragments

export default UserCreateCircleActivity
