import gql from 'graphql-tag'

// circular dependencies？ 👇
// import { ArticleDigestFeed } from '~/components'
import { ArticleDigestFeed } from '../../ArticleDigest/Feed'

export const fragments = {
  user: {
    public: gql`
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
  },
  collection: gql`
    fragment CollectionArticlesCollection on Collection {
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
    ${ArticleDigestFeed.fragments.article.public}
    ${ArticleDigestFeed.fragments.article.private}
  `,
}

export const ADD_ARTICLES_COLLECTION_USER_PUBLIC = gql`
  query AddArticlesCollectionUserPublic($userName: String) {
    user(input: { userName: $userName }) {
      ...UserArticlesUser
    }
  }
  ${fragments.user.public}
`

export const ADD_ARTICLES_COLLECTION = gql`
  mutation AddArticlesCollection(
    $input: AddCollectionsArticlesInput!
    $first: Int
  ) {
    addCollectionsArticles(input: $input) {
      id
      title
      ...CollectionArticlesCollection
    }
  }
  ${fragments.collection}
`
