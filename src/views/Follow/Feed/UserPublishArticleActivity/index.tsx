import {
  ArticleDigestFeed,
  CardExposureTracker,
  CircleDigest,
  IconUnfollow24,
  Translate,
  UserDigest,
} from '~/components'

import { analytics } from '~/common/utils'

import UnfollowUserActionButton from '../DropdownActions/UnfollowUser'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserPublishArticleActivity as Activity } from './__generated__/UserPublishArticleActivity'

const UserPublishArticleActivity = ({
  actor,
  nodeArticle: node,
  createdAt,
  location,
  __typename,
}: Activity & { location: number }) => (
  <>
    <ArticleDigestFeed
      header={
        <FeedHead>
          <UserDigest.Plain user={actor} />
          <span>
            {node.access.circle ? (
              <Translate zh_hant="發布於" zh_hans="发布于" en="published" />
            ) : (
              <Translate zh_hant="發布" zh_hans="发布" en="published" />
            )}
          </span>
          {node.access.circle && (
            <CircleDigest.Plain circle={node.access.circle} />
          )}
        </FeedHead>
      }
      onClick={() => {
        analytics.trackEvent('click_feed', {
          type: 'following',
          contentType: __typename,
          location,
          id: node.id,
        })
      }}
      article={node}
      date={createdAt}
      morePublicActions={<UnfollowUserActionButton user={actor} />}
      icon={
        <IconUnfollow24 style={{ width: '1.125rem', height: '1.125rem' }} />
      }
    />
    <CardExposureTracker
      id={node.id}
      location={location}
      feedType="following"
      contentType={__typename}
    />
  </>
)

UserPublishArticleActivity.fragments = fragments

export default UserPublishArticleActivity
