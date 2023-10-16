import gql from 'graphql-tag'

import { ArticleDigestFeed, CircleDigest, UserDigest } from '~/components'

import UnfollowUser from '../DropdownActions/UnfollowUser'

export const fragments = gql`
  fragment UserPublishArticleActivity on UserPublishArticleActivity {
    actor {
      ...UserDigestPlainUser
      ...UnfollowActionButtonUserPrivate
    }
    createdAt
    nodeArticle: node {
      access {
        circle {
          ...DigestPlainCircle
        }
      }
      ...ArticleDigestFeedArticlePublic
      ...ArticleDigestFeedArticlePrivate
    }
  }
  ${UserDigest.Plain.fragments.user}
  ${CircleDigest.Plain.fragments.circle}
  ${UnfollowUser.fragments.user.private}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`
