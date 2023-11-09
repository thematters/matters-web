import { analytics } from '~/common/utils'
import { Translate, UserDigest } from '~/components'
import { UserCreateCircleActivityFragment } from '~/gql/graphql'

import FeedCircle from '../FollowingFeedCircle'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

const UserCreateCircleActivity = ({
  actor,
  nodeCircle: node,
  createdAt,
  location,
  __typename,
}: UserCreateCircleActivityFragment & { location: number }) => {
  return (
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
      onClick={() => {
        analytics.trackEvent('click_feed', {
          type: 'following',
          contentType: __typename!,
          location,
          id: node.id,
        })
      }}
    />
  )
}

UserCreateCircleActivity.fragments = fragments

export default UserCreateCircleActivity
