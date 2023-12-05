import dynamic from 'next/dynamic'

import { analytics } from '~/common/utils'
import { ArticleDigestFeed, CardExposureTracker } from '~/components'
import { UserPublishArticleActivityFragment } from '~/gql/graphql'

import { fragments } from './gql'

const DynamicArticleDigestFeed = dynamic(
  () => import('~/components/ArticleDigest/Feed'),
  { ssr: false, loading: ArticleDigestFeed.Placeholder }
)

const UserPublishArticleActivity = ({
  actor,
  nodeArticle: node,
  createdAt,
  location,
  __typename,
}: UserPublishArticleActivityFragment & { location: number }) => (
  <>
    <DynamicArticleDigestFeed
      onClick={() => {
        analytics.trackEvent('click_feed', {
          type: 'following',
          contentType: __typename!,
          location,
          id: node.id,
        })
      }}
      article={node}
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
