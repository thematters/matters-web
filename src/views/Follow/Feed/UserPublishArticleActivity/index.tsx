import { analytics } from '~/common/utils'
import {
  ArticleDigestConcise,
  CardExposureTracker,
  CircleDigest,
} from '~/components'
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
      footerCircle={
        node.access.circle && <CircleDigest.Plain circle={node.access.circle} />
      }
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
