import { useContext } from 'react'

import { Translate, UserDigest, ViewerContext } from '~/components'

import { analytics } from '~/common/utils'

import UnfollowUserActionButton from '../DropdownActions/UnfollowUser'
import FeedCircle from '../FollowingFeedCircle'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserCreateCircleActivity as Activity } from './__generated__/UserCreateCircleActivity'

const UserCreateCircleActivity = ({
  actor,
  nodeCircle: node,
  createdAt,
  location,
  __typename,
}: Activity & { location: number }) => {
  const viewer = useContext(ViewerContext)

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
      actions={<UnfollowUserActionButton user={actor} />}
      onClick={() => {
        analytics.trackEvent('click_feed', {
          type: 'following',
          contentType: __typename,
          location,
          id: node.id,
          userId: viewer.id,
        })
      }}
    />
  )
}

UserCreateCircleActivity.fragments = fragments

export default UserCreateCircleActivity
