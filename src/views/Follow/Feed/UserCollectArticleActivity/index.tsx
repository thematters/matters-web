import {
  ArticleDigestFeed,
  ArticleDigestTitle,
  Translate,
  UserDigest,
} from '~/components'

import UnfollowUserActionButton from '../DropdownActions/UnfollowUser'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserCollectArticleActivity as Activity } from './__generated__/UserCollectArticleActivity'

const UserCollectArticleActivity = ({
  actor,
  nodeArticle: node,
  targetArticle: target,
  createdAt,
}: Activity) => (
  <ArticleDigestFeed
    header={
      <FeedHead>
        <UserDigest.Plain user={actor} />
        <span>
          <Translate zh_hant="關聯了作品" zh_hans="关联了作品" en="collected" />
        </span>
        <ArticleDigestTitle
          article={target}
          textSize="sm-s"
          textWeight="normal"
          lineClamp
          is="h5"
        />
      </FeedHead>
    }
    hasFollow
    article={node}
    date={createdAt}
    morePublicActions={<UnfollowUserActionButton user={actor} />}
  />
)

UserCollectArticleActivity.fragments = fragments

export default UserCollectArticleActivity
