import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components/ArticleDigest/Feed'
import { CollectionDigestFeed } from '~/components/CollectionDigest/Feed'

export const fragments = {
  collection: gql`
    fragment CollectionArticlesCollection on Collection {
      id
      updatedAt
      pinned
      articleList: articles(
        input: { first: $first, after: $after, reversed: $reversed }
      ) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
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

export const COLLECTION_ARTICLES_PUBLIC = gql`
  query CollectionArticlesPublic(
    $id: ID!
    $first: first_Int_min_0!
    $after: String
    $reversed: Boolean
  ) {
    node(input: { id: $id }) {
      ... on Collection {
        ...CollectionArticlesCollection
      }
    }
  }
  ${fragments.collection}
`

export const COLLECTION_ARTICLES_PRIVATE = gql`
  query CollectionArticlesPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
`
