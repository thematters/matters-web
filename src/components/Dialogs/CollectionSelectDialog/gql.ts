import gql from 'graphql-tag'

export const fragments = {
  user: {
    public: gql`
      fragment CollectionSelectUserPublic on User {
        id
        collections(input: { first: 200 }) {
          totalCount
          edges {
            node {
              id
              title
              articles(input: { first: 200 }) {
                totalCount
                edges {
                  node {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
}

export const COLLECTION_SELECT_USER_PUBLIC = gql`
  query CollectionSelectUserPublic($userName: String!) {
    user(input: { userName: $userName }) {
      ...CollectionSelectUserPublic
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
