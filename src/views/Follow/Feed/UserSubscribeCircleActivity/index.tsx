import { Translate, UserDigest } from '~/components'

import UnfollowUserActionButton from '../DropdownActions/UnfollowUser'
import FeedCircle from '../FollowingFeedCircle'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserSubscribeCircleActivity as Activity } from './__generated__/UserSubscribeCircleActivity'

const UserSubscribeCircleActivity = ({
  actor,
  nodeCircle: node,
  createdAt,
}: Activity) => (
  <FeedCircle
    header={
      <FeedHead>
        <UserDigest.Plain user={actor} />
        <span>
          <Translate zh_hant="訂閱" zh_hans="订阅" en="subscribed" />
        </span>
      </FeedHead>
    }
    circle={node}
    date={createdAt}
    actions={<UnfollowUserActionButton user={actor} />}
  />
)

UserSubscribeCircleActivity.fragments = fragments

export default UserSubscribeCircleActivity
