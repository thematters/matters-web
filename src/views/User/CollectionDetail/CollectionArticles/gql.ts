import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components/ArticleDigest/Feed'
import { CollectionDigestFeed } from '~/components/CollectionDigest/Feed'

export const fragments = {
  collection: gql`
    fragment CollectionArticlesCollection on Collection {
      id
      updatedAt
      pinned
      articleList: articles(input: { first: 100 }) {
        totalCount
        edges {
          cursor
          node {
            ...ArticleDigestFeedArticlePublic
            ...ArticleDigestFeedArticlePrivate
          }
        }
      }
      ...CollectionDigestFeedCollection
    }
    ${ArticleDigestFeed.fragments.article.public}
    ${ArticleDigestFeed.fragments.article.private}
    ${CollectionDigestFeed.fragments.collection}
  `,
}
