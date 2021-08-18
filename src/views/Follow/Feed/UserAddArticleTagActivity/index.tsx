import {
  ArticleDigestFeed,
  CardExposureTracker,
  IconUnfollow24,
  Tag,
  Translate,
} from '~/components'

import UnfollowTagActionButton from '../DropdownActions/UnfollowTag'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserAddArticleTagActivity as Activity } from './__generated__/UserAddArticleTagActivity'

const UserAddArticleTagActivity = ({
  nodeArticle: node,
  targetTag: target,
  createdAt,
  location,
}: Activity & { location: number }) => (
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
    />
    <CardExposureTracker
      location={location}
      feedType="following"
      contentType="UserAddArticleTagActivity"
      articleId={node.id}
    />
  </>
)

UserAddArticleTagActivity.fragments = fragments

export default UserAddArticleTagActivity
