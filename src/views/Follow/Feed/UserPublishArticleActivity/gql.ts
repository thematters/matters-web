import gql from 'graphql-tag'

import { ArticleDigestConcise, CircleDigest, UserDigest } from '~/components'

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
      ...ArticleDigestConciseArticlePublic
      ...ArticleDigestConciseArticlePrivate
    }
  }
  ${UserDigest.Plain.fragments.user}
  ${CircleDigest.Plain.fragments.circle}
  ${UnfollowUser.fragments.user.private}
  ${ArticleDigestConcise.fragments.article.public}
  ${ArticleDigestConcise.fragments.article.private}
`
