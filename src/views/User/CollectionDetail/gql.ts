import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

export const fragment = gql`
  fragment CollectionDetail on Collection {
    id
    title
    title
    description
    cover
    updatedAt
    pinned
    author {
      id
      userName
    }
    articles(input: { first: 100 }) {
      totalCount
      edges {
        cursor
        node {
          ...ArticleDigestFeedArticlePublic
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
`

export const COLLECTION_DETAIL = gql`
  query CollectionDetail($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Collection {
        ...CollectionDetail
      }
    }
  }
  ${fragment}
`
