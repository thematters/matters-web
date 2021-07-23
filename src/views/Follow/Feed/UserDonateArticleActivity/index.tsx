import { ArticleDigestFeed, Translate, UserDigest } from '~/components'

import UnfollowUserActionButton from '../DropdownActions/UnfollowUser'
import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { UserDonateArticleActivity as Activity } from './__generated__/UserDonateArticleActivity'

const UserDonateArticleActivity = ({
  actor,
  nodeArticle: node,
  createdAt,
}: Activity) => (
  <ArticleDigestFeed
    header={
      <FeedHead>
        <UserDigest.Plain user={actor} />
        <span>
          <Translate zh_hant="支持" zh_hans="支持" en="donated" />
        </span>
      </FeedHead>
    }
    hasFollow
    article={node}
    date={createdAt}
    morePublicActions={<UnfollowUserActionButton user={actor} />}
  />
)

UserDonateArticleActivity.fragments = fragments

export default UserDonateArticleActivity
