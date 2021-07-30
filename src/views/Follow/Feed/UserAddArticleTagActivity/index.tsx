import { ArticleDigestFeed, Tag, Translate } from '~/components'

import UnfollowTagActionButton from '../DropdownActions/UnfollowTag'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserAddArticleTagActivity as Activity } from './__generated__/UserAddArticleTagActivity'

const UserAddArticleTagActivity = ({
  nodeArticle: node,
  targetTag: target,
  createdAt,
}: Activity) => (
  <ArticleDigestFeed
    header={
      <FeedHead>
        <span>
          <Translate
            zh_hant="添加精選於"
            zh_hans="添加精选于"
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
  />
)

UserAddArticleTagActivity.fragments = fragments

export default UserAddArticleTagActivity
