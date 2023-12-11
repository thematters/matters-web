import dynamic from 'next/dynamic'

import { analytics } from '~/common/utils'
import { ArticleDigestFeed, CardExposureTracker, Tag } from '~/components'
import { UserAddArticleTagActivityFragment } from '~/gql/graphql'

import { fragments } from './gql'

const DynamicArticleDigestFeed = dynamic(
  () => import('~/components/ArticleDigest/Feed'),
  { ssr: false, loading: ArticleDigestFeed.Placeholder }
)

const UserAddArticleTagActivity = ({
  nodeArticle: node,
  targetTag: target,
  location,
  __typename,
}: UserAddArticleTagActivityFragment & { location: number }) => (
  <>
    <DynamicArticleDigestFeed
      article={node}
      tag={<Tag tag={target} type="plain" iconProps={{ size: 'sm' }} />}
      onClick={() => {
        analytics.trackEvent('click_feed', {
          type: 'following',
          contentType: __typename!,
          location,
          id: node.id,
        })
      }}
    />
    <CardExposureTracker
      location={location}
      feedType="following"
      contentType={__typename!}
      id={node.id}
    />
  </>
)

UserAddArticleTagActivity.fragments = fragments

export default UserAddArticleTagActivity
