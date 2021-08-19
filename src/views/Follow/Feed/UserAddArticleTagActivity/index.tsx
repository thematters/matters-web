import { useContext } from 'react'

import {
  ArticleDigestFeed,
  CardExposureTracker,
  IconUnfollow24,
  Tag,
  Translate,
  ViewerContext,
} from '~/components'

import { analytics } from '~/common/utils'

import UnfollowTagActionButton from '../DropdownActions/UnfollowTag'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserAddArticleTagActivity as Activity } from './__generated__/UserAddArticleTagActivity'

const UserAddArticleTagActivity = ({
  nodeArticle: node,
  targetTag: target,
  createdAt,
  location,
  __typename,
}: Activity & { location: number }) => {
  const viewer = useContext(ViewerContext)

  return (
    <>
      <ArticleDigestFeed
        header={
          <FeedHead>
            <span>
              <Translate
                zh_hant="追蹤標籤有新作品"
                zh_hans="追踪标签有新作品"
                en="selected by"
              />
            </span>
            <Tag tag={target} type="plain" />
          </FeedHead>
        }
        hasFollow
        article={node}
        date={createdAt}
        morePublicActions={<UnfollowTagActionButton tag={target} />}
        icon={
          <IconUnfollow24 style={{ width: '1.125rem', height: '1.125rem' }} />
        }
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
      <CardExposureTracker
        location={location}
        feedType="following"
        contentType={__typename}
        id={node.id}
      />
    </>
  )
}

UserAddArticleTagActivity.fragments = fragments

export default UserAddArticleTagActivity
