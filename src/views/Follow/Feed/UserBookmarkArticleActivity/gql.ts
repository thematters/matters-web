import gql from 'graphql-tag'

import { ArticleDigestFeed, UserDigest } from '~/components'

import UnfollowUser from '../DropdownActions/UnfollowUser'

export const fragments = gql`
  fragment UserBookmarkArticleActivity on UserBookmarkArticleActivity {
    actor {
      ...UserDigestPlainUser
      ...UnfollowActionButtonUserPrivate
    }
    createdAt
    nodeArticle: node {
      ...ArticleDigestFeedArticlePublic
      ...ArticleDigestFeedArticlePrivate
    }
  }
  ${UserDigest.Plain.fragments.user}
  ${UnfollowUser.fragments.user.private}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`
