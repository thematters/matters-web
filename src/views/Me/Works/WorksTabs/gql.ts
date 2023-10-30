import gql from 'graphql-tag'

export const ME_WORKS_TABS = gql`
  query MeWorksTabs {
    viewer {
      id
      drafts(input: { first: 0 }) @connection(key: "viewerDrafts") {
        totalCount
      }
    }
  }
`