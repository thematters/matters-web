import gql from 'graphql-tag'

import { ArticleDigestFeed, ArticleTag, UserDigest } from '~/components'

import UnfollowTag from '../DropdownActions/UnfollowTag'

export const fragments = gql`
  fragment UserAddArticleTagActivity on UserAddArticleTagActivity {
    actor {
      ...UserDigestPlainUser
    }
    createdAt
    nodeArticle: node {
      ...ArticleDigestFeedArticlePublic
      ...ArticleDigestFeedArticlePrivate
    }
    targetTag: target {
      ...DigestTag
      ...UnfollowActionButtonTagPrivate
    }
  }
  ${UserDigest.Plain.fragments.user}
  ${ArticleTag.fragments.tag}
  ${UnfollowTag.fragments.tag.private}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`
