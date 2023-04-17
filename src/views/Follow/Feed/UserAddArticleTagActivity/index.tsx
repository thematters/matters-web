import { analytics } from '~/common/utils'
import { ArticleDigestConcise, CardExposureTracker, Tag } from '~/components'
import { UserAddArticleTagActivityFragment } from '~/gql/graphql'

import { fragments } from './gql'

const UserAddArticleTagActivity = ({
  nodeArticle: node,
  targetTag: target,
  createdAt,
  location,
  __typename,
}: UserAddArticleTagActivityFragment & { location: number }) => (
  <>
    <ArticleDigestConcise
      article={node}
      date={createdAt}
      footerTag={<Tag tag={target} type="plain" iconProps={{ size: 'sm' }} />}
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
