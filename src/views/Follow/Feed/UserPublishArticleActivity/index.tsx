import { analytics } from '~/common/utils'
import { ArticleDigestConcise, CardExposureTracker } from '~/components'
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
    <ArticleDigestConcise
      onClick={() => {
        analytics.trackEvent('click_feed', {
          type: 'following',
          contentType: __typename!,
          location,
          id: node.id,
        })
      }}
      article={node}
      date={createdAt}
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
