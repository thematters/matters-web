import { CircleDigest, Translate, UserDigest } from '~/components'

import FeedComment from '../FollowingFeedComment'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserBroadcastCircleActivity as Activity } from './__generated__/UserBroadcastCircleActivity'

const UserBroadcastCircleActivity = ({
  actor,
  nodeComment: node,
  targetCircle: target,
  createdAt,
}: Activity) => (
  <FeedComment
    header={
      <FeedHead>
        <UserDigest.Plain user={actor} />
        <span>
          <Translate zh_hant="廣播於" zh_hans="广播于" en="broadcasted on" />
        </span>
        <CircleDigest.Plain circle={target} />
      </FeedHead>
    }
    comment={node}
    date={createdAt}
  />
)

UserBroadcastCircleActivity.fragments = fragments

export default UserBroadcastCircleActivity
