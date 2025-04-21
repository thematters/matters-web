import { analytics } from '~/common/utils'
import { ArticleDigestFeed, CardExposureTracker } from '~/components'
import { UserPublishArticleActivityFragment } from '~/gql/graphql'

import { fragments } from './gql'

const UserPublishArticleActivity = ({
  actor,
  nodeArticle: node,
  createdAt,
  location,
  __typename,
}: UserPublishArticleActivityFragment & { location: number }) => (
  <>
    <ArticleDigestFeed
      onClick={() => {
        analytics.trackEvent('click_feed', {
          type: 'following',
          contentType: __typename!,
          location,
          id: node.id,
        })
      }}
      article={node}
      hasBookmark={false}
    />
    <CardExposureTracker
      id={node.id}
      location={location}
      feedType="following"
      contentType={__typename!}
    />
  </>
)

UserPublishArticleActivity.fragments = fragments

export default UserPublishArticleActivity
