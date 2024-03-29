import gql from 'graphql-tag'

import { ArticleDigestFeed, Tag, UserDigest } from '~/components'

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
  ${Tag.fragments.tag}
  ${UnfollowTag.fragments.tag.private}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`
