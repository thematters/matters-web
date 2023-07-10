import gql from 'graphql-tag'

export const fragments = {
  user: {
    public: gql`
      fragment AddCollectionsArticleUserPublic on User {
        id
        collections(input: { first: 200 }) {
          totalCount
          edges {
            node {
              id
              title
              articles(input: { first: 10 }) {
                totalCount
                edges {
                  node {
                    id
                  }
                }
              }
              contains(input: { id: $id })
            }
          }
        }
      }
    `,
  },
}

export const ADD_COLLECTIONS_ARTICLE_USER_PUBLIC = gql`
  query AddCollectionsArticleUserPublic($userName: String!, $id: ID!) {
    user(input: { userName: $userName }) {
      ...AddCollectionsArticleUserPublic
    }
  }
  ${fragments.user.public}
`

export const ADD_COLLECTIONS_ARTICLES = gql`
  mutation AddCollectionsArticles($input: AddCollectionsArticlesInput!) {
    addCollectionsArticles(input: $input) {
      id
      title
    }
  }
`
