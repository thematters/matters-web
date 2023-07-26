import gql from 'graphql-tag'

// circular dependencies？ 👇
// import { ArticleDigestFeed } from '~/components'
import { ArticleDigestFeed } from '../../ArticleDigest/Feed'

export const fragments = {
  user: gql`
    fragment UserArticlesUser on User {
      id
      articles(input: { first: 500 }) {
        totalCount
        edges {
          cursor
          node {
            id
            title
            state
          }
        }
      }
    }
  `,
}

export const ADD_ARTICLES_COLLECTION_USER = gql`
  query AddArticlesCollectionUser($userName: String) {
    user(input: { userName: $userName }) {
      ...UserArticlesUser
    }
  }
  ${fragments.user}
`

export const ADD_ARTICLES_COLLECTION = gql`
  mutation AddArticlesCollection(
    $input: AddCollectionsArticlesInput!
    $first: Int
  ) {
    addCollectionsArticles(input: $input) {
      id
      title
      articles(input: { first: $first }) {
        totalCount
        edges {
          cursor
          node {
            ...ArticleDigestFeedArticlePublic
            ...ArticleDigestFeedArticlePrivate
            id
            title
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`
