import gql from 'graphql-tag'

import { ArticleDigestFeed, Tag } from '~/components'

export const fragments = gql`
  fragment RecommendArticleActivity on Article {
    ...ArticleDigestFeedArticlePublic
    ...ArticleDigestFeedArticlePrivate
    tags {
      ...DigestTag
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
  ${Tag.fragments.tag}
`
