import gql from 'graphql-tag'

export const fragments = {
  user: gql`
    fragment TabsUser on User {
      id
      tabsArticles: articles(input: { first: 0 }) {
        totalCount
      }
      tabsCollections: collections(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}
