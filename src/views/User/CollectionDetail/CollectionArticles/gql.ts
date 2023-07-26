import gql from 'graphql-tag'

import { ArticleDigestFeed, CollectionDigest } from '~/components'

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
    ${CollectionDigest.Feed.fragments.collection}
  `,
}
