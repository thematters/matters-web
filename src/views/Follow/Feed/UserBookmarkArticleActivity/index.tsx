import { ArticleDigestFeed, Translate, UserDigest } from '~/components'

import UnfollowUserActionButton from '../DropdownActions/UnfollowUser'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserBookmarkArticleActivity as Activity } from './__generated__/UserBookmarkArticleActivity'

const UserBookmarkArticleActivity = ({
  actor,
  nodeArticle: node,
  createdAt,
}: Activity) => (
  <ArticleDigestFeed
    header={
      <FeedHead>
        <UserDigest.Plain user={actor} />
        <span>
          <Translate zh_hant="收藏" zh_hans="收藏" en="bookmarked" />
        </span>
      </FeedHead>
    }
    hasFollow
    article={node}
    date={createdAt}
    morePublicActions={<UnfollowUserActionButton user={actor} />}
  />
)

UserBookmarkArticleActivity.fragments = fragments

export default UserBookmarkArticleActivity
