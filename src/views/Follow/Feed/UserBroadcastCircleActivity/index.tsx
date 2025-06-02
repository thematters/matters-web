import { CircleDigest, Translate } from '~/components'
import { UserBroadcastCircleActivityFragment } from '~/gql/graphql'

import FeedComment from '../FollowingFeedComment'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

const UserBroadcastCircleActivity = ({
  nodeComment: node,
  targetCircle: target,
  createdAt,
}: UserBroadcastCircleActivityFragment) => (
  <FeedComment
    header={
      <FeedHead>
        <CircleDigest.Plain circle={target} />
        <span>
          <Translate
            zh_hant="新廣播："
            zh_hans="新广播："
            en="new broadcast:"
          />
        </span>
      </FeedHead>
    }
    comment={node}
    date={createdAt}
  />
)

UserBroadcastCircleActivity.fragments = fragments

export default UserBroadcastCircleActivity
