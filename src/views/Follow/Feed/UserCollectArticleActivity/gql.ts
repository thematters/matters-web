import gql from 'graphql-tag'

import { ArticleDigestFeed, UserDigest } from '~/components'

import UnfollowUser from '../DropdownActions/UnfollowUser'

export const fragments = gql`
  fragment UserCollectArticleActivity on UserCollectArticleActivity {
    actor {
      ...UserDigestPlainUser
      ...UnfollowActionButtonUserPrivate
    }
    createdAt
    nodeArticle: node {
      ...ArticleDigestFeedArticlePublic
      ...ArticleDigestFeedArticlePrivate
    }
    targetArticle: target {
      ...ArticleDigestFeedArticlePublic
      ...ArticleDigestFeedArticlePrivate
    }
  }
  ${UserDigest.Plain.fragments.user}
  ${UnfollowUser.fragments.user.private}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`
