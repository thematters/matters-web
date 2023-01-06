import { CircleDigest, Translate, UserDigest } from '~/components'
import { UserBroadcastCircleActivityFragment } from '~/gql/graphql'

import UnfollowCircleActionButton from '../DropdownActions/UnfollowCircle'
import FeedComment from '../FollowingFeedComment'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

const UserBroadcastCircleActivity = ({
  actor,
  nodeComment: node,
  targetCircle: target,
  createdAt,
}: UserBroadcastCircleActivityFragment) => (
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
    actions={<UnfollowCircleActionButton circle={target} />}
  />
)

UserBroadcastCircleActivity.fragments = fragments

export default UserBroadcastCircleActivity
