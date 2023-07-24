import gql from 'graphql-tag'

export const fragments = {
  user: gql`
    fragment TabsUser on User {
      id
      status {
        articleCount
      }
      tabsCollections: collections(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}
